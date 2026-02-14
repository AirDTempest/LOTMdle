import { initializeApp } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-app.js";
import { 
  getFirestore, collection, addDoc, getDocs, query, orderBy, limit, where, updateDoc 
} from "https://www.gstatic.com/firebasejs/9.23.0/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyDRyz_hN9Lq1fACxpg92UhzYD1EN0ZGDKo",
  authDomain: "lotmdle.firebaseapp.com",
  projectId: "lotmdle",
  storageBucket: "lotmdle.firebasestorage.app",
  messagingSenderId: "540788390130",
  appId: "1:540788390130:web:c345c340123cbf8580786b",
  measurementId: "G-L8TV140QGB"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);


function getModeConfig(mode) {
  if (mode === "daily") {
    return { collName: "LeaderboardDaily", fieldName: "MaxWinstreakDaily" };
  }
  if (mode === "infinite") {
    return { collName: "LeaderboardInf", fieldName: "MaxWinstreakInf" };
  }
  if (mode === "daily_quote") {
    return { collName: "LeaderboardQuotesDaily", fieldName: "MaxWinstreakQuotesDaily" };
  }
  if (mode === "inf_quote") {
    return { collName: "LeaderboardQuotesInf", fieldName: "MaxWinstreakQuotesInf" };
  }
  return { collName: "LeaderboardDaily", fieldName: "MaxWinstreakDaily" };
}

export async function submitScore(playerName, currentStreak, mode) {
  const { collName, fieldName } = getModeConfig(mode);

  const q = query(collection(db, collName), where("name", "==", playerName));
  const snapshot = await getDocs(q);

  if (!snapshot.empty) {
    const docRef = snapshot.docs[0].ref;
    const docData = snapshot.docs[0].data();
    const oldScore = docData[fieldName] || 0;

    if (currentStreak > oldScore) {
      await updateDoc(docRef, { [fieldName]: currentStreak, date: new Date() });
    }
  } else {
    await addDoc(collection(db, collName), {
      name: playerName,
      [fieldName]: currentStreak,
      date: new Date()
    });
  }
}

export async function loadLeaderboard(mode) {
  const list = document.getElementById("leaderboard-list");
  if (!list) return;

  const { collName, fieldName } = getModeConfig(mode);

  list.innerHTML = `<div class="lb-loading">Loading...</div>`;

  try {
    const q = query(
      collection(db, collName),
      orderBy(fieldName, "desc"),
      limit(50)
    );

    const snapshot = await getDocs(q);

    if (snapshot.empty) {
      list.innerHTML = `<div class="lb-empty">No scores yet.</div>`;
      return;
    }

    list.innerHTML = "";
    let rank = 1;

    snapshot.forEach((doc) => {
      const data = doc.data();
      const score = data[fieldName] || 0;

      const row = document.createElement("div");
      row.className = "lb-row";
      row.innerHTML = `
        <div class="lb-rank">${rank}</div>
        <div class="lb-name">${data.name || "Unknown"}</div>
        <div class="lb-score">${score}</div>
      `;

      list.appendChild(row);
      rank++;
    });
  } catch (err) {
    console.error(err);
    list.innerHTML = `<div class="lb-error">Error loading leaderboard.</div>`;
  }
}
