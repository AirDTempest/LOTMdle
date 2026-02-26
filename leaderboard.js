import { initializeApp } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-app.js";
import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
  onAuthStateChanged,
  getRedirectResult,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
} from "https://www.gstatic.com/firebasejs/9.23.0/firebase-auth.js";
import {
  getFirestore,
  collectionGroup,
  doc,
  setDoc,
  getDoc,
  getDocs,
  query,
  where,
  orderBy,
  limit,
  serverTimestamp,
  runTransaction,
} from "https://www.gstatic.com/firebasejs/9.23.0/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyDRyz_hN9Lq1fACxpg92UhzYD1EN0ZGDKo",
  authDomain: "lotmdle.firebaseapp.com",
  projectId: "lotmdle",
  storageBucket: "lotmdle.firebasestorage.app",
  messagingSenderId: "540788390130",
  appId: "1:540788390130:web:c345c340123cbf8580786b",
  measurementId: "G-L8TV140QGB",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
export const auth = getAuth(app);


const USERS_COLL = "users";
const STATS_SUBCOLL = "stats";
const STATS_DOC = "main";

function userStatsRef(uid) {
  return doc(db, USERS_COLL, uid, STATS_SUBCOLL, STATS_DOC);
}


function normalizeNick(nick) {
  const n = (nick ?? "").toString().trim().slice(0, 15);
  return n.length ? n : "Player";
}

function statsPrefixFromMode(mode) {
  if (mode === "daily") return "classicDaily";
  if (mode === "dailyquote") return "quoteDaily";
  if (mode === "dailypathwayemotes") return "pathwayDaily";
  return null; 
}

function defaultsForAllStats(uid = null, nick = "Player") {
  const make = (p) => ({
    [`${p}Games`]: 0,
    [`${p}Wins`]: 0,
    [`${p}Losses`]: 0,
    [`${p}CurrentStreak`]: 0,
    [`${p}MaxStreak`]: 0,
    [`${p}LastPlayed`]: null,
  });

  return {
    type: "main",
    uid: uid ?? null,
    nick,
    ...make("classicDaily"),
    ...make("quoteDaily"),
    ...make("pathwayDaily"),
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  };
}

export async function ensureUserStatsDoc(uid) {
  const ref = userStatsRef(uid);
  const snap = await getDoc(ref);
  if (snap.exists()) return;

  const u = auth.currentUser;
  const nick = normalizeNick(u?.displayName || u?.email || "Player");
  await setDoc(ref, defaultsForAllStats(uid, nick), { merge: true });
}


export async function submitDailyResultLoggedIn({ mode, didWin, playedKey, currentStreakAfter } = {}) {
  const user = auth.currentUser;
  if (!user) throw new Error("Not logged in");

  const prefix = statsPrefixFromMode(mode);
  if (!prefix) throw new Error("Unsupported mode for profile stats: " + mode);

  if (!playedKey || typeof playedKey !== "string") {
    throw new Error("playedKey required, e.g. '2026-02-26'");
  }

  const ref = userStatsRef(user.uid);

  await runTransaction(db, async (tx) => {
    const snap = await tx.get(ref);

    let data = snap.exists() ? (snap.data() || {}) : null;
    if (!data) {
      tx.set(ref, defaultsForAllStats(user.uid, normalizeNick(user.displayName || user.email || "Player")), { merge: true });
      data = {};
    }

    const lastPlayed = data?.[`${prefix}LastPlayed`] ?? null;
    if (lastPlayed === playedKey) return;

    const prevCur = Number(data?.[`${prefix}CurrentStreak`] ?? 0);
    const prevMax = Number(data?.[`${prefix}MaxStreak`] ?? 0);
    const prevGames = Number(data?.[`${prefix}Games`] ?? 0);
    const prevWins = Number(data?.[`${prefix}Wins`] ?? 0);
    const prevLosses = Number(data?.[`${prefix}Losses`] ?? 0);

    const nextGames = prevGames + 1;
    const nextWins = prevWins + (didWin ? 1 : 0);
    const nextLosses = prevLosses + (didWin ? 0 : 1);

    let nextCur;
    if (typeof currentStreakAfter === "number" && Number.isFinite(currentStreakAfter)) {
      nextCur = Math.max(0, Math.floor(currentStreakAfter));
    } else {
      nextCur = didWin ? (prevCur + 1) : 0;
    }

    const nextMax = Math.max(prevMax, nextCur);

    tx.set(
      ref,
      {
        type: "main",
        uid: user.uid,
        nick: normalizeNick(user.displayName || user.email || "Player"),
        updatedAt: serverTimestamp(),

        [`${prefix}Games`]: nextGames,
        [`${prefix}Wins`]: nextWins,
        [`${prefix}Losses`]: nextLosses,
        [`${prefix}CurrentStreak`]: nextCur,
        [`${prefix}MaxStreak`]: nextMax,
        [`${prefix}LastPlayed`]: playedKey,
      },
      { merge: true }
    );
  });
}


export async function login(email, password) {
  const cred = await signInWithEmailAndPassword(auth, email, password);
  try { await ensureUserStatsDoc(cred.user.uid); } catch (e) { console.warn(e); }
  return cred.user;
}

export async function register(email, password, nick) {
  const cred = await createUserWithEmailAndPassword(auth, email, password);
  const safeNick = normalizeNick(nick);
  await updateProfile(cred.user, { displayName: safeNick });

  try {
    await ensureUserStatsDoc(cred.user.uid);
    await setDoc(
      userStatsRef(cred.user.uid),
      { type: "main", uid: cred.user.uid, nick: safeNick, updatedAt: serverTimestamp() },
      { merge: true }
    );
  } catch (e) {
    console.warn(e);
  }

  return cred.user;
}

export async function loginGoogle() {
  const provider = new GoogleAuthProvider();
  const result = await signInWithPopup(auth, provider);

  try {
    await ensureUserStatsDoc(result.user.uid);
    await setDoc(
      userStatsRef(result.user.uid),
      {
        type: "main",
        uid: result.user.uid,
        nick: normalizeNick(result.user.displayName || result.user.email || "Player"),
        updatedAt: serverTimestamp()
      },
      { merge: true }
    );
  } catch (e) {
    console.warn(e);
  }

  return result.user;
}

export async function finishGoogleRedirectIfAny() {
  const provider = new GoogleAuthProvider();
  try {
    await getRedirectResult(auth, provider);
  } catch (e) {
    console.error("Redirect finish failed", e);
  }
}

export async function logout() {
  await signOut(auth);
}

export function onUserChanged(cb) {
  return onAuthStateChanged(auth, cb);
}


export async function submitScoreLoggedIn(currentStreak, mode) {
  const user = auth.currentUser;
  if (!user) throw new Error("Not logged in");

  const prefix = statsPrefixFromMode(mode);
  if (!prefix) throw new Error("Unsupported mode: " + mode);

  const ref = userStatsRef(user.uid);

  await runTransaction(db, async (tx) => {
    const snap = await tx.get(ref);
    const data = snap.exists() ? (snap.data() || {}) : {};

    const prevMax = Number(data?.[`${prefix}MaxStreak`] ?? 0);
    const next = Math.max(prevMax, Number(currentStreak ?? 0));

    tx.set(ref, {
      type: "main",
      uid: user.uid,
      nick: normalizeNick(user.displayName || user.email || "Player"),
      updatedAt: serverTimestamp(),
      [`${prefix}MaxStreak`]: next,
    }, { merge: true });
  });
}


function maxFieldFromMode(mode) {
  const prefix = statsPrefixFromMode(mode);
  if (!prefix) return null;
  return `${prefix}MaxStreak`;
}

export async function loadLeaderboardLoggedIn(mode) {
  const list = document.getElementById("leaderboard-list");
  if (!list) return;

  

  const fieldName = maxFieldFromMode(mode);
  if (!fieldName) {
    list.innerHTML = `<div class="lb-error">Unsupported mode.</div>`;
    return;
  }

  list.innerHTML = `<div class="lb-loading">Loading...</div>`;

  try {
    const q = query(
      collectionGroup(db, "stats"),
      where("type", "==", "main"),
      orderBy(fieldName, "desc"),
      limit(50)
    );

    const snapshot = await getDocs(q);

    list.innerHTML = "";

    let rank = 1;
    snapshot.forEach((docSnap) => {
      const data = docSnap.data() || {};
      const score = Number(data?.[fieldName] ?? 0);

      const nickRaw = (data?.nick ?? "").toString().trim();
      if (!nickRaw) return;
      if (nickRaw.toLowerCase() === "unknown") return;

      const row = document.createElement("div");
      row.className = "lb-row";

      const r = document.createElement("div");
      r.className = "lb-rank";
      r.textContent = String(rank);

      const n = document.createElement("div");
      n.className = "lb-name";
      n.textContent = nickRaw;

      const s = document.createElement("div");
      s.className = "lb-score";
      s.textContent = String(score);

      row.appendChild(r);
      row.appendChild(n);
      row.appendChild(s);
      list.appendChild(row);

      rank++;
    });

    if (rank === 1) {
      const empty = document.createElement("div");
      empty.className = "lb-empty";
      empty.textContent = "No scores yet.";
      list.appendChild(empty);
    }
  } catch (err) {
    console.error(err);
    list.innerHTML = `<div class="lb-error">Error loading leaderboard.</div>`;
  }
}


export async function loadUserStats(uid) {
  try { await ensureUserStatsDoc(uid); } catch (e) { console.warn(e); }

  const ref = userStatsRef(uid);
  const snap = await getDoc(ref);
  const data = snap.exists() ? (snap.data() || {}) : {};

  const safeNum = (v) => (Number.isFinite(Number(v)) ? Number(v) : 0);

  const makeBlock = (p) => {
    const games = safeNum(data?.[`${p}Games`]);
    const wins = safeNum(data?.[`${p}Wins`]);
    const losses = safeNum(data?.[`${p}Losses`]);
    const cur = safeNum(data?.[`${p}CurrentStreak`]);
    const max = safeNum(data?.[`${p}MaxStreak`]);
    const winrate = games > 0 ? Math.round((wins / games) * 100) : 0;
    return { games, wins, losses, cur, max, winrate };
  };

  const c = makeBlock("classicDaily");
  const q = makeBlock("quoteDaily");
  const p = makeBlock("pathwayDaily");

  return {
    uid,
    nick: data?.nick ?? "Player",

    // Classic daily
    classicDailyGames: c.games,
    classicDailyWins: c.wins,
    classicDailyLosses: c.losses,
    classicDailyCurrentStreak: c.cur,
    classicDailyMaxStreak: c.max,
    classicDailyWinrate: c.winrate,

    // Quote daily
    quoteDailyGames: q.games,
    quoteDailyWins: q.wins,
    quoteDailyLosses: q.losses,
    quoteDailyCurrentStreak: q.cur,
    quoteDailyMaxStreak: q.max,
    quoteDailyWinrate: q.winrate,

    // Pathway daily
    pathwayDailyGames: p.games,
    pathwayDailyWins: p.wins,
    pathwayDailyLosses: p.losses,
    pathwayDailyCurrentStreak: p.cur,
    pathwayDailyMaxStreak: p.max,
    pathwayDailyWinrate: p.winrate,
  };
}


export const signIn = login;
export const signInGoogle = loginGoogle;
export const signUp = register;
export const signUpGoogle = register;
export async function logoutGoogle() { return logout(); }
