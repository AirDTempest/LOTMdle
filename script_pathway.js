// imports
import { submitScore, loadLeaderboard } from "./leaderboard.js";
import { initTheme } from "./theme.js";

// data
const pathways = [
  { name: "Fool", emotes: ["🃏","🌫️","🕯️","🕵️","🎭","🪞","🗝️","🕰️","🧩","🪶"] },
  { name: "Door", emotes: ["🚪","🗝️","🧳","🌌","🌀","📍","🧭","🧿","🛰️","🧱"] },
  { name: "Error", emotes: ["🧐","🪙","🌀","🎭","🕳️","🪞","🔁","🧩","🕰️","🃏"] },
  { name: "Visionary", emotes: ["👁️","🧠","💭","🎬","🪄","🪞","🧩","📖","🎭","🕯️"] },
  { name: "Tyrant", emotes: ["⚡","🌊","🌪️","⛈️","🔱","🛳️","🌩️","💥","🪨","🌀"] },
  { name: "Sun", emotes: ["☀️","✨","🔥","🙏","🕯️","🛡️","🌅","📜","🪽","💛"] },
  { name: "Darkness", emotes: ["🌙","🕯️","😴","🕳️","🌑","🛏️","🦉","🖤","🌫️","🔕"] },
  { name: "Death", emotes: ["⚰️","🦴","🕸️","🪦","💀","🕯️","🗝️","🪶","🧟","🌫️"] },
  { name: "Red Priest", emotes: ["🩸","⚔️","🔥","🎺","🪖","🏹","💥","🧨","🪓","🏴"] },
  { name: "Demoness", emotes: ["💄","🕷️","🌹","😈","🩸","🪞","🧪","🖤","🎭","🪡"] },
  { name: "Black Emperor", emotes: ["👑","⚖️","🖋️","🏛️","📜","🧿","🪙","🕳️","🧱","🗝️"] },
  { name: "Hermit", emotes: ["📚","🔮","🧪","🧩","🧠","🕯️","📜","🧿","🗝️","🪶"] },
  { name: "Paragon", emotes: ["⚙️","🔧","🧠","🏭","🧪","📐","🪛","🔩","🛰️","🔋"] },
  { name: "Moon", emotes: ["🌙","🩸","🧸","🧛","🦇","🕯️","🥀","🖤","🪞","🍷"] },
  { name: "Mother", emotes: ["🌱","🧬","🌍","🤱","🍃","🌸","🐝","🍄","🫀","🧪"] },
  { name: "Chained", emotes: ["⛓️","🕳️","🐺","🩸","🔒","🖤","🪝","🕯️","🌫️","🧿"] },
  { name: "Hanged Man", emotes: ["🪢","🪝","🩸","🎪","🕯️","🖤","🫀","🧿","🌫️","🩻"] },
  { name: "Twilight Giant", emotes: ["🗡️","🛡️","🗿","🌄","🏔️","⚔️","🪨","🦴","🌅","👣"] },
  { name: "White Tower", emotes: ["🏰","📖","👓","🔦","📚","🧠","🕯️","📜","🧩","🪶"] },
  { name: "Justiciar", emotes: ["⚖️","📜","👮‍♂️","🔒","🏛️","🖋️","🧿","🧱","🪙","🕯️"] },
  { name: "Wheel of Fortune", emotes: ["🎡","🍀","🐍","⏳","🧿","🔁","🪙","🌀","🕰️","🎲"] },
];


//OVERLAYS
const howBtn = document.getElementById("howBtn");
const howOverlay = document.getElementById("howOverlay");
const howCloseBtn = document.getElementById("howCloseBtn");
if (howBtn && howOverlay) howBtn.onclick = () => howOverlay.classList.remove("hidden");
if (howCloseBtn && howOverlay) howCloseBtn.onclick = () => howOverlay.classList.add("hidden");
if (howOverlay) howOverlay.onclick = (e) => { if (e.target === howOverlay) howOverlay.classList.add("hidden"); };

const feedbackBtn = document.getElementById("feedbackBtn");
const feedbackOverlay = document.getElementById("feedbackOverlay");
const feedbackCloseBtn = document.getElementById("feedbackCloseBtn");
if (feedbackBtn && feedbackOverlay) feedbackBtn.onclick = () => feedbackOverlay.classList.remove("hidden");
if (feedbackCloseBtn && feedbackOverlay) feedbackCloseBtn.onclick = () => feedbackOverlay.classList.add("hidden");
if (feedbackOverlay) feedbackOverlay.onclick = (e) => { if (e.target === feedbackOverlay) feedbackOverlay.classList.add("hidden"); };

const patchBtn = document.getElementById("patchBtn");
const patchOverlay = document.getElementById("patchOverlay");
const patchCloseBtn = document.getElementById("patchCloseBtn");
if (patchBtn && patchOverlay) patchBtn.onclick = () => patchOverlay.classList.remove("hidden");
if (patchCloseBtn && patchOverlay) patchCloseBtn.onclick = () => patchOverlay.classList.add("hidden");
if (patchOverlay) patchOverlay.onclick = (e) => { if (e.target === patchOverlay) patchOverlay.classList.add("hidden"); };


// daily
function todayKey() {
  const d = new Date();
  const yyyy = d.getFullYear();
  const mm = String(d.getMonth() + 1).padStart(2, "0");
  const dd = String(d.getDate()).padStart(2, "0");
  return `${yyyy}-${mm}-${dd}`;
}

function dailyDoneKey() {
  return `lotmdle_pathway_daily_done_${todayKey()}`;
}

function isDailyDone() {
  return localStorage.getItem(dailyDoneKey()) === "1";
}

function setDailyDone() {
  localStorage.setItem(dailyDoneKey(), "1");
}

function dailyIndex(key, size) {
  let h = 0;
  for (let i = 0; i < key.length; i++) h = (h * 31 + key.charCodeAt(i)) >>> 0;
  return h % size;
}

// rng
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
    a = (a + 0x6D2B79F5) | 0;
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

function shuffle(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

// infinite save
function infSaveKey() {
  return "lotmdle_pathway_inf_save_v1";
}

function saveInfiniteState() {
  if (mode !== "infinite") return;
  if (!currentPuzzle) return;

  const rows = Array.from(grid?.children || []);
  const guesses = rows.map((row) => {
    const cell = row.querySelector(".cell");
    return {
      text: cell?.textContent || "",
      cls: cell?.className || "cell",
    };
  });

  const payload = {
    puzzleName: currentPuzzle.name,
    attempts,
    gameOver,
    usedNames: Array.from(usedNames),
    revealedEmotes,
    remainingEmotes,
    guesses,
  };

  localStorage.setItem(infSaveKey(), JSON.stringify(payload));
}

function clearInfiniteState() {
  localStorage.removeItem(infSaveKey());
}

function loadInfiniteState() {
  const raw = localStorage.getItem(infSaveKey());
  if (!raw) return null;
  try { return JSON.parse(raw); } catch { return null; }
}

// elements
let mode = localStorage.getItem("lotmdle_pathway_mode") || "daily";

const grid = document.getElementById("grid");
const list = document.getElementById("list");
const searchInput = document.getElementById("searchInput");
const guessBtn = document.getElementById("guessBtn");
const statusText = document.getElementById("statusText");
const attemptsText = document.getElementById("attemptsText");
const emotesText = document.getElementById("emotesText");

const dailyBtn = document.getElementById("dailyBtn");
const infiniteBtn = document.getElementById("infiniteBtn");

const endOverlay = document.getElementById("endOverlay");
const endTitle = document.getElementById("endTitle");
const endDesc = document.getElementById("endDesc");
const playAgainBtn = document.getElementById("playAgainBtn");
const closeOverlayBtn = document.getElementById("closeOverlayBtn");

// state
const maxAttempts = 7;

let attempts = 0;
let gameOver = false;
let usedNames = new Set();
let currentSuggestions = [];

let currentPuzzle = null;
let revealedEmotes = [];
let remainingEmotes = [];

// puzzle
function pickPuzzle() {
  if (!pathways || pathways.length === 0) return { name: "Error", emotes: ["❌"] };
  if (mode === "daily") return pathways[dailyIndex(todayKey(), pathways.length)];
  return pathways[Math.floor(Math.random() * pathways.length)];
}

// emotes
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
  if (mode === "daily") remainingEmotes = seededShuffle(base, `${todayKey()}|${currentPuzzle.name}`);
  else remainingEmotes = shuffle(base);
}

// dropdown
function openList() {
  if (list) list.classList.remove("hidden");
}

function closeList() {
  if (list) list.classList.add("hidden");
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

function updateSuggestions() {
  if (!list || !searchInput) return;

  const q = searchInput.value.trim().toLowerCase();
  if (!q) {
    closeList();
    return;
  }

  currentSuggestions = pathways
    .filter((p) => p.name.toLowerCase().includes(q))
    .slice(0, 30);

  renderList(currentSuggestions);
  if (currentSuggestions.length > 0) openList();
  else closeList();
}

// mode
function syncModeUI() {
  if (dailyBtn) dailyBtn.classList.toggle("is-active", mode === "daily");
  if (infiniteBtn) infiniteBtn.classList.toggle("is-active", mode !== "daily");
}

function startInfinite({ forceNew = false } = {}) {
  hideEndScreen();

  if (!forceNew) {
    const s = loadInfiniteState();
    if (s && s.puzzleName) {
      const p = pathways.find((x) => x.name === s.puzzleName);
      if (p) {
        currentPuzzle = p;
        attempts = typeof s.attempts === "number" ? s.attempts : 0;
        gameOver = !!s.gameOver;
        usedNames = new Set(Array.isArray(s.usedNames) ? s.usedNames : []);
        revealedEmotes = Array.isArray(s.revealedEmotes) ? s.revealedEmotes : [];
        remainingEmotes = Array.isArray(s.remainingEmotes) ? s.remainingEmotes : [];
        currentSuggestions = [];

        if (grid) {
          grid.innerHTML = "";
          const guesses = Array.isArray(s.guesses) ? s.guesses : [];
          guesses.forEach((g) => {
            const row = document.createElement("div");
            row.className = "row";
            row.style.gridTemplateColumns = "1fr";
            const cell = document.createElement("div");
            cell.className = g.cls || "cell wrong";
            cell.textContent = g.text || "";
            row.appendChild(cell);
            grid.appendChild(row);
          });
        }

        renderEmotes();
        if (attemptsText) attemptsText.textContent = `Attempts: ${attempts} / ${maxAttempts}`;
        if (statusText) statusText.textContent = gameOver ? "Game finished." : "Which Pathway is this?";
        if (searchInput) searchInput.value = "";
        closeList();
        return;
      }
    }
  }

  attempts = 0;
  gameOver = false;
  usedNames = new Set();
  currentSuggestions = [];

  currentPuzzle = pathways[Math.floor(Math.random() * pathways.length)];
  setupEmotesForCurrentPuzzle();

  if (grid) grid.innerHTML = "";
  if (statusText) statusText.textContent = "Which Pathway is this?";
  if (attemptsText) attemptsText.textContent = `Attempts: 0 / ${maxAttempts}`;
  if (searchInput) searchInput.value = "";
  closeList();

  revealOneMoreEmote();
  saveInfiniteState();
}

function setMode(newMode) {
  if (mode === newMode) return;

  mode = newMode;
  localStorage.setItem("lotmdle_pathway_mode", mode);
  syncModeUI();

  if (mode === "infinite") startInfinite({ forceNew: false });
  else resetDaily();
}

// overlay
function hideEndScreen() {
  if (endOverlay) endOverlay.classList.add("hidden");
}

function updateStreak(won) {
  const streakKey = mode === "daily" ? "lotmdle_pathway_daily_streak" : "lotmdle_pathway_inf_streak";
  let current = parseInt(localStorage.getItem(streakKey)) || 0;

  if (won) {
    current++;
    localStorage.setItem(streakKey, current);

    let playerName = localStorage.getItem("lotmdle_player_name");
    const finalMode = mode === "daily" ? "daily_pathway" : "inf_pathway";

    if (!playerName) {
      setTimeout(() => {
        playerName = prompt("Gratulacje! Podaj swój nick do rankingu:");
        if (playerName) {
          if (playerName.length > 15) playerName = playerName.substring(0, 15);
          localStorage.setItem("lotmdle_player_name", playerName);
          submitScore(playerName, current, finalMode);
        }
      }, 300);
    } else {
      submitScore(playerName, current, finalMode);
    }
  } else {
    localStorage.setItem(streakKey, 0);
  }
}

function showEndScreen(won) {
  if (endTitle) endTitle.textContent = won ? "You got it!" : "Not quite!";
  if (endDesc) endDesc.textContent = `Pathway: ${currentPuzzle.name}`;
  if (endOverlay) endOverlay.classList.remove("hidden");

  revealAllEmotes();
  updateStreak(won);

  if (mode === "daily") {
    setDailyDone();
    if (playAgainBtn) {
      playAgainBtn.disabled = true;
      playAgainBtn.textContent = "Come back tomorrow";
    }
  } else {
    clearInfiniteState();
    if (playAgainBtn) {
      playAgainBtn.disabled = false;
      playAgainBtn.textContent = "Play again";
    }
  }

  const triesEl = document.getElementById("owTries");
  const maxEl = document.getElementById("owMax");
  const modeEl = document.getElementById("owMode");
  if (triesEl) triesEl.textContent = String(attempts);
  if (maxEl) maxEl.textContent = String(maxAttempts);
  if (modeEl) modeEl.textContent = mode === "daily" ? "DAILY PATHWAY" : "∞ PATHWAY";

  const shareEl = document.getElementById("owShare");
  if (shareEl) shareEl.innerHTML = "";
}

// daily game
function resetDaily() {
  hideEndScreen();

  currentPuzzle = pathways[dailyIndex(todayKey(), pathways.length)];
  attempts = 0;
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

  gameOver = false;
  if (statusText) statusText.textContent = "Which Pathway is this?";
  if (attemptsText) attemptsText.textContent = `Attempts: 0 / ${maxAttempts}`;
  revealOneMoreEmote();
}

// guess
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

  const correct = name === currentPuzzle.name;

  if (correct) {
    cell.classList.add("correct");
    if (statusText) statusText.textContent = `Correct! It was ${currentPuzzle.name}.`;
    row.appendChild(cell);
    if (grid) grid.appendChild(row);
    gameOver = true;
    if (mode === "infinite") saveInfiniteState();
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

  if (!gameOver && attempts >= maxAttempts) {
    if (statusText) statusText.textContent = `Game Over. It was ${currentPuzzle.name}.`;
    gameOver = true;
    if (mode === "infinite") saveInfiniteState();
    showEndScreen(false);
    return;
  }

  if (mode === "infinite") saveInfiniteState();
}

// events
if (dailyBtn) dailyBtn.onclick = () => setMode("daily");
if (infiniteBtn) infiniteBtn.onclick = () => setMode("infinite");

if (playAgainBtn) {
  playAgainBtn.onclick = () => {
    if (mode === "infinite") startInfinite({ forceNew: true });
    else resetDaily();
  };
}

if (closeOverlayBtn) closeOverlayBtn.onclick = hideEndScreen;

document.addEventListener("pointerdown", (e) => {
  if (!list || !searchInput) return;
  if (e.target !== searchInput && !list.contains(e.target)) closeList();
});

if (searchInput) {
  searchInput.addEventListener("focus", updateSuggestions);
  searchInput.addEventListener("input", updateSuggestions);
  searchInput.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
      const q = searchInput.value.trim().toLowerCase();
      const exact = pathways.find((p) => p.name.toLowerCase() === q);
      const pick = exact || currentSuggestions[0];
      if (pick) {
        makeGuess(pick.name);
        searchInput.value = "";
        closeList();
      }
    }
  });
}

if (guessBtn) {
  guessBtn.onclick = () => {
    if (!searchInput) return;
    const q = searchInput.value.trim().toLowerCase();
    const exact = pathways.find((p) => p.name.toLowerCase() === q);
    const pick = exact || currentSuggestions[0];
    if (pick) {
      makeGuess(pick.name);
      searchInput.value = "";
      closeList();
    }
  };
}

// start
initTheme();
syncModeUI();
if (mode === "infinite") startInfinite({ forceNew: false });
else resetDaily();

