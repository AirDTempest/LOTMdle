// script_pathway.js 
import { auth, submitScoreLoggedIn, loadLeaderboardLoggedIn, submitDailyResultLoggedIn } from "./leaderboard.js";
import { initTheme } from "./theme.js";

const pathways = [
  { name: "Fool", emotes: ["🃏", "🌫️", "🕯️", "🕵️", "🎭", "🪞", "🗝️", "🕰️", "🧩", "🪶"] },
  { name: "Door", emotes: ["🚪", "🗝️", "🧳", "🌌", "🌀", "📍", "🧭", "🧿", "🛰️", "🧱"] },
  { name: "Error", emotes: ["🧐", "🪙", "🌀", "🎭", "🕳️", "🪞", "🔁", "🧩", "🕰️", "🃏"] },
  { name: "Visionary", emotes: ["👁️", "🧠", "💭", "🎬", "🪄", "🪞", "🧩", "📖", "🎭", "🕯️"] },
  { name: "Tyrant", emotes: ["⚡", "🌊", "🌪️", "⛈️", "🔱", "🛳️", "🌩️", "💥", "🪨", "🌀"] },
  { name: "Sun", emotes: ["☀️", "✨", "🔥", "🙏", "🕯️", "🛡️", "🌅", "📜", "🪽", "💛"] },
  { name: "Darkness", emotes: ["🌙", "🕯️", "😴", "🕳️", "🌑", "🛏️", "🦉", "🖤", "🌫️", "🔕"] },
  { name: "Death", emotes: ["⚰️", "🦴", "🕸️", "🪦", "💀", "🕯️", "🗝️", "🪶", "🧟", "🌫️"] },
  { name: "Red Priest", emotes: ["🩸", "⚔️", "🔥", "🎺", "🪖", "🏹", "💥", "🧨", "🪓", "🏴"] },
  { name: "Demoness", emotes: ["💄", "🕷️", "🌹", "😈", "🩸", "🪞", "🧪", "🖤", "🎭", "🪡"] },
  { name: "Black Emperor", emotes: ["👑", "⚖️", "🖋️", "🏛️", "📜", "🧿", "🪙", "🕳️", "🧱", "🗝️"] },
  { name: "Hermit", emotes: ["📚", "🔮", "🧪", "🧩", "🧠", "🕯️", "📜", "🧿", "🗝️", "🪶"] },
  { name: "Paragon", emotes: ["⚙️", "🔧", "🧠", "🏭", "🧪", "📐", "🪛", "🔩", "🛰️", "🔋"] },
  { name: "Moon", emotes: ["🌙", "🩸", "🧸", "🧛", "🦇", "🕯️", "🥀", "🖤", "🪞", "🍷"] },
  { name: "Mother", emotes: ["🌱", "🧬", "🌍", "🤱", "🍃", "🌸", "🐝", "🍄", "🫀", "🧪"] },
  { name: "Chained", emotes: ["⛓️", "🕳️", "🐺", "🩸", "🔒", "🖤", "🪝", "🕯️", "🌫️", "🧿"] },
  { name: "Hanged Man", emotes: ["🪢", "🪝", "🩸", "🎪", "🕯️", "🖤", "🫀", "🧿", "🌫️", "🩻"] },
  { name: "Twilight Giant", emotes: ["🗡️", "🛡️", "🗿", "🌄", "🏔️", "⚔️", "🪨", "🦴", "🌅", "👣"] },
  { name: "White Tower", emotes: ["🏰", "📖", "👓", "🔦", "📚", "🧠", "🕯️", "📜", "🧩", "🪶"] },
  { name: "Justiciar", emotes: ["⚖️", "📜", "👮♂️", "🔒", "🏛️", "🖋️", "🧿", "🧱", "🪙", "🕯️"] },
  { name: "Wheel of Fortune", emotes: ["🎡", "🍀", "🐍", "⏳", "🧿", "🔁", "🪙", "🌀", "🕰️", "🎲"] },
];

const lbBtn = document.getElementById("leaderboardBtn");
const lbOverlay = document.getElementById("leaderboardOverlay");
const lbCloseBtn = document.getElementById("closeLeaderboard");
const lbDailyBtn = document.getElementById("lbDailyBtn");

const howBtn = document.getElementById("howBtn");
const howOverlay = document.getElementById("howOverlay");
const howCloseBtn = document.getElementById("howCloseBtn");

const feedbackBtn = document.getElementById("feedbackBtn");
const feedbackOverlay = document.getElementById("feedbackOverlay");
const feedbackCloseBtn = document.getElementById("feedbackCloseBtn");

const patchBtn = document.getElementById("patchBtn");
const patchOverlay = document.getElementById("patchOverlay");
const patchCloseBtn = document.getElementById("patchCloseBtn");

const grid = document.getElementById("grid");
const list = document.getElementById("list");
const searchInput = document.getElementById("searchInput");
const guessBtn = document.getElementById("guessBtn"); 

const statusText = document.getElementById("statusText");
const attemptsText = document.getElementById("attemptsText");
const emotesText = document.getElementById("emotesText");

const endOverlay = document.getElementById("endOverlay");
const endTitle = document.getElementById("endTitle");
const endDesc = document.getElementById("endDesc");
const playAgainBtn = document.getElementById("playAgainBtn");
const closeOverlayBtn = document.getElementById("closeOverlayBtn");

const maxAttempts = 7;
let attempts = 0;
let gameOver = false;
let usedNames = new Set();
let currentSuggestions = [];

let currentPuzzle = null;
let revealedEmotes = [];
let remainingEmotes = [];

function updateSuggestions() {
  if (!list || !searchInput) return;
  const q = searchInput.value.trim().toLowerCase();
  
  if (!q) {
    closeList();
    return;
  }

  let matched = characters.filter(c => c.name.toLowerCase().includes(q));

  matched.sort((a, b) => {
    const aStarts = a.name.toLowerCase().startsWith(q);
    const bStarts = b.name.toLowerCase().startsWith(q);
    
    if (aStarts && !bStarts) return -1;
    if (!aStarts && bStarts) return 1;
    return 0;
  });

  currentSuggestions = matched.slice(0, 30);
  renderList(currentSuggestions);
  
  if (currentSuggestions.length > 0) openList(); 
  else closeList();
}
function todayKey() {
  const d = new Date();
  const yyyy = d.getFullYear();
  const mm = String(d.getMonth() + 1).padStart(2, "0");
  const dd = String(d.getDate()).padStart(2, "0");
  return `${yyyy}-${mm}-${dd}`;
}

function dailyDoneKey() { return `lotmdle_pathway_daily_done_${todayKey()}`; }
function isDailyDone() { return localStorage.getItem(dailyDoneKey()) === "1"; }
function setDailyDone() { localStorage.setItem(dailyDoneKey(), "1"); }

function dailyIndex(key, size) {
  let h = 0;
  for (let i = 0; i < key.length; i++) h = (h * 31 + key.charCodeAt(i)) >>> 0;
  return h % size;
}

function hash32(str) {
  let h = 2166136261;
  for (let i = 0; i < str.length; i++) {
    h ^= str.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return h >>> 0;
}

function mulberry32(seed) {
  let a = seed >>> 0;
  return function () {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t ^= t + Math.imul(t ^ (t >>> 7), 61 | t);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function seededShuffle(arr, seedStr) {
  const a = [...arr];
  const rand = mulberry32(hash32(seedStr));
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(rand() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function pickPuzzle() {
  if (!pathways || pathways.length === 0) return { name: "Error", emotes: ["❌"] };
  return pathways[dailyIndex(todayKey(), pathways.length)];
}

function renderEmotes() {
  if (!emotesText) return;
  emotesText.textContent = revealedEmotes.join(" ");
}

function revealOneMoreEmote() {
  if (remainingEmotes.length === 0) return false;
  const next = remainingEmotes.shift();
  revealedEmotes.push(next);
  renderEmotes();
  return true;
}

function revealAllEmotes() {
  while (revealOneMoreEmote()) {}
}

function setupEmotesForCurrentPuzzle() {
  const base = (currentPuzzle?.emotes || []).filter(Boolean);
  revealedEmotes = [];
  remainingEmotes = seededShuffle(base, `${todayKey()}|${currentPuzzle?.name || ""}`);
}

function openList() { if (list) list.classList.remove("hidden"); }
function closeList() { if (list) list.classList.add("hidden"); }

function streakKeyPathwayDaily() {
  const uid = auth?.currentUser?.uid || "guest";
  return `lotmdle_pathway_dailystreak_${uid}`;
}

function renderList(items) {
  if (!list) return;
  list.innerHTML = "";
  items.forEach((p) => {
    const div = document.createElement("div");
    div.className = "list-item";
    div.textContent = p.name;
    if (usedNames.has(p.name) || gameOver) {
      div.classList.add("used");
      div.onclick = null;
    } else {
      div.onclick = () => {
        if (usedNames.has(p.name) || gameOver) return;
        makeGuess(p.name);
        if (searchInput) searchInput.value = "";
        currentSuggestions = [];
        closeList();
      };
    }
    list.appendChild(div);
  });
}

async function updateStreak(won) {
  const streakKey = streakKeyPathwayDaily();
  let current = parseInt(localStorage.getItem(streakKey) || "0", 10);
  if (won) {
    current++;
    localStorage.setItem(streakKey, String(current));
  } else {
    localStorage.setItem(streakKey, "0");
  }
}

function hideEndScreen() {
  clearInterval(window.__lotmdleNextDailyTimerPathway);
  if (endOverlay) endOverlay.classList.add("hidden");
}

function renderShareTiles(won) {
  const shareEl = document.getElementById("owShare");
  if (!shareEl) return;
  shareEl.innerHTML = "";
  const total = Math.min(maxAttempts, 7);
  for (let i = 0; i < total; i++) {
    const t = document.createElement("div");
    t.className = "ow-tile";
    if (i < attempts) {
      if (won && i === attempts - 1) t.classList.add("correct");
      else t.classList.add("wrong");
    } else {
      t.classList.add("wrong");
      t.style.opacity = "0.35";
    }
    shareEl.appendChild(t);
  }
}

function showEndScreen(won) {
  if (endTitle) endTitle.textContent = won ? "You got it!" : "Not quite!";
  if (endDesc) endDesc.textContent = `Pathway: ${currentPuzzle?.name ?? "???"}`;
  if (endOverlay) endOverlay.classList.remove("hidden");

  revealAllEmotes();
  renderShareTiles(won);
  updateStreak(won).catch(console.warn);

  const u = auth?.currentUser;
  if (u) {
    const current = parseInt(localStorage.getItem(streakKeyPathwayDaily()) || "0", 10);
    if (typeof submitDailyResultLoggedIn === "function") {
      submitDailyResultLoggedIn({
        mode: "dailypathway",
        didWin: !!won,
        playedKey: todayKey(),
        currentStreakAfter: won ? current : 0,
      }).catch(console.warn);
    }
  }

  const triesEl = document.getElementById("owTries");
  const maxEl = document.getElementById("owMax");
  const modeEl = document.getElementById("owMode");

  if (triesEl) triesEl.textContent = String(attempts);
  if (maxEl) maxEl.textContent = String(maxAttempts);
  if (modeEl) modeEl.textContent = "DAILY";

  setDailyDone();
  if (playAgainBtn) {
    playAgainBtn.disabled = true;
    playAgainBtn.textContent = "Come back tomorrow";
  }

  const keyForOffsetDays = (offset) => {
    const d = new Date();
    d.setDate(d.getDate() + offset);
    const yyyy = d.getFullYear();
    const mm = String(d.getMonth() + 1).padStart(2, "0");
    const dd = String(d.getDate()).padStart(2, "0");
    return `${yyyy}-${mm}-${dd}`;
  };

  const pickDailyPuzzleForKey = (key) => {
    if (!pathways || !pathways.length) return null;
    const idx = dailyIndex(key, pathways.length);
    return pathways[idx];
  };

  const msToHMS = (ms) => {
    const s = Math.max(0, Math.floor(ms / 1000));
    const h = String(Math.floor(s / 3600)).padStart(2, "0");
    const m = String(Math.floor((s % 3600) / 60)).padStart(2, "0");
    const ss = String(s % 60).padStart(2, "0");
    return `${h}:${m}:${ss}`;
  };

  const msToNextLocalMidnight = () => {
    const now = new Date();
    const next = new Date(now);
    next.setHours(24, 0, 0, 0);
    return next - now;
  };

  const badge = document.getElementById("owBadge");
  if (badge) {
    badge.textContent = won ? "WIN" : "LOSE";
    badge.classList.toggle("win", !!won);
    badge.classList.toggle("lose", !won);
  }

  const ydEl = document.getElementById("yesterdayDaily");
  if (ydEl) {
    const yKey = keyForOffsetDays(-1);
    const yP = pickDailyPuzzleForKey(yKey);
    ydEl.textContent = yP?.name ?? "—";
  }

  const nextEl = document.getElementById("nextDailyIn");
  if (nextEl) {
    nextEl.textContent = msToHMS(msToNextLocalMidnight());
    clearInterval(window.__lotmdleNextDailyTimerPathway);
    window.__lotmdleNextDailyTimerPathway = setInterval(() => {
      nextEl.textContent = msToHMS(msToNextLocalMidnight());
    }, 1000);
  }

  const endXBtn = document.getElementById("endXBtn");
  if (endXBtn) {
    endXBtn.onclick = () => {
      clearInterval(window.__lotmdleNextDailyTimerPathway);
      if (endOverlay) endOverlay.classList.add("hidden");
    };
  }

  const toast = document.getElementById("owToast");
  const copyBtn = document.getElementById("copyResultBtn");
  const openLbBtn = document.getElementById("openLbBtn");

  const pageUrl = (location && location.origin ? location.origin : "") + (location && location.pathname ? location.pathname : "");
  const shareText = `LOTMDLE PATHWAY DAILY: ` +
    `${won ? "WIN" : "LOSE"} (${attempts}/${maxAttempts})\n` +
    `Pathway: ${currentPuzzle?.name ?? "???"}\n` +
    `Yesterday daily: ${ydEl?.textContent ?? "—"}\n` + pageUrl;

  const showToast = (msg) => {
    if (!toast) return;
    toast.textContent = msg;
    toast.classList.remove("hidden");
    clearTimeout(window.__lotmdleToastTPathway);
    window.__lotmdleToastTPathway = setTimeout(() => toast.classList.add("hidden"), 1200);
  };

  if (copyBtn) {
    copyBtn.onclick = async () => {
      try {
        await navigator.clipboard.writeText(shareText);
        showToast("Copied!");
      } catch {
        alert(shareText);
      }
    };
  }

  if (openLbBtn) {
    openLbBtn.onclick = () => {
      const lb = document.getElementById("leaderboardBtn");
      if (lb) lb.click();
    };
  }
}

function resetDaily() {
  hideEndScreen();

  currentPuzzle = pickPuzzle();
  attempts = 0;
  gameOver = false;
  usedNames = new Set();
  currentSuggestions = [];

  setupEmotesForCurrentPuzzle();

  if (grid) grid.innerHTML = "";
  if (searchInput) searchInput.value = "";
  closeList();

  if (isDailyDone()) {
    gameOver = true;
    if (statusText) statusText.textContent = "Daily completed. Come back tomorrow.";
    if (attemptsText) attemptsText.textContent = `Attempts: 0 / ${maxAttempts}`;
    revealAllEmotes();
    return;
  }

  if (statusText) statusText.textContent = "Which Pathway is this?";
  if (attemptsText) attemptsText.textContent = `Attempts: 0 / ${maxAttempts}`;
  revealOneMoreEmote();
}

function makeGuess(name) {
  if (gameOver || attempts >= maxAttempts) return;
  if (usedNames.has(name)) return;

  usedNames.add(name);

  const row = document.createElement("div");
  row.className = "row";
  row.style.gridTemplateColumns = "1fr";

  const cell = document.createElement("div");
  cell.className = "cell";
  cell.textContent = name;

  const correct = name === currentPuzzle?.name;

  if (correct) {
    cell.classList.add("correct");
    if (statusText) statusText.textContent = `Correct! It was ${currentPuzzle.name}.`;

    row.appendChild(cell);
    if (grid) grid.appendChild(row);

    gameOver = true;
    showEndScreen(true);
    return;
  }

  cell.classList.add("wrong");
  if (statusText) statusText.textContent = "Wrong pathway...";

  row.appendChild(cell);
  if (grid) grid.appendChild(row);

  attempts++;
  if (attemptsText) attemptsText.textContent = `Attempts: ${attempts} / ${maxAttempts}`;

  revealOneMoreEmote();

  if (attempts >= maxAttempts) {
    if (statusText) statusText.textContent = `Game Over. It was ${currentPuzzle?.name || "???"}.`;
    gameOver = true;
    showEndScreen(false);
    return;
  }
}

function openLb() {
  if (!lbOverlay) return;
  lbOverlay.classList.remove("hidden");
  lbDailyBtn?.classList.add("is-active");
  if (typeof loadLeaderboardLoggedIn === "function") loadLeaderboardLoggedIn("dailypathway");
}

if (lbBtn) lbBtn.addEventListener("click", openLb);
if (lbCloseBtn && lbOverlay) lbCloseBtn.addEventListener("click", () => lbOverlay.classList.add("hidden"));
if (lbOverlay) {
  lbOverlay.addEventListener("click", (e) => {
    if (e.target === lbOverlay) lbOverlay.classList.add("hidden");
  });
}
if (lbDailyBtn) {
  lbDailyBtn.addEventListener("click", () => {
    lbDailyBtn.classList.add("is-active");
  if (typeof loadLeaderboardLoggedIn === "function") loadLeaderboardLoggedIn("dailypathway");
  });
}

if (howBtn && howOverlay) howBtn.onclick = () => howOverlay.classList.remove("hidden");
if (howCloseBtn && howOverlay) howCloseBtn.onclick = () => howOverlay.classList.add("hidden");
if (howOverlay) howOverlay.onclick = (e) => {
  if (e.target === howOverlay) howOverlay.classList.add("hidden");
};

if (feedbackBtn && feedbackOverlay) feedbackBtn.onclick = () => feedbackOverlay.classList.remove("hidden");
if (feedbackCloseBtn && feedbackOverlay) feedbackCloseBtn.onclick = () => feedbackOverlay.classList.add("hidden");
if (feedbackOverlay) feedbackOverlay.onclick = (e) => {
  if (e.target === feedbackOverlay) feedbackOverlay.classList.add("hidden");
};

if (patchBtn && patchOverlay) patchBtn.onclick = () => patchOverlay.classList.remove("hidden");
if (patchCloseBtn && patchOverlay) patchCloseBtn.onclick = () => patchOverlay.classList.add("hidden");
if (patchOverlay) patchOverlay.onclick = (e) => {
  if (e.target === patchOverlay) patchOverlay.classList.add("hidden");
};

if (playAgainBtn) {
  playAgainBtn.onclick = () => {
    resetDaily();
  };
}

if (closeOverlayBtn) closeOverlayBtn.onclick = () => {
  hideEndScreen();
};

if (endOverlay) {
  endOverlay.addEventListener("click", (e) => {
    if (e.target !== endOverlay) return;
    hideEndScreen();
  });
}

document.addEventListener("pointerdown", (e) => {
  if (!list || !searchInput) return;
  if (e.target !== searchInput && !list.contains(e.target)) closeList();
});

if (searchInput) {
  searchInput.addEventListener("focus", updateSuggestions);
  searchInput.addEventListener("input", updateSuggestions);

  searchInput.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      e.preventDefault();
      closeList();
      searchInput.blur();
      return;
    }

    if (e.key === "Enter") {
      e.preventDefault();
      const q = searchInput.value.trim().toLowerCase();
      if (!q) return;

      const exact = pathways.find((p) => p.name.toLowerCase() === q);
      const pick = exact || currentSuggestions[0];
      if (!pick) return;

      makeGuess(pick.name);
      searchInput.value = "";
      closeList();
    }
  });
}

if (guessBtn) {
  guessBtn.onclick = () => {
    if (!searchInput) return;
    const q = searchInput.value.trim().toLowerCase();
    const exact = pathways.find((p) => p.name.toLowerCase() === q);
    const pick = exact || currentSuggestions[0];
    if (!pick) return;

    makeGuess(pick.name);
    searchInput.value = "";
    closeList();
  };
}

if (typeof initTheme === "function") initTheme();
resetDaily();