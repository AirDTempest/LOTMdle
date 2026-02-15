import { submitScore, loadLeaderboard } from './leaderboard.js';

const characters = [
    { name: "Adam", age: "3rd Epoch", gender: "Male", pathway: "Visionary", sequence: 0, factions: ["Twilight Hermit Order", "Psychology Alchemists", "King of Angels"], firstChapter: 448 },
    { name: "Alger Wilson", age: "5th Epoch", gender: "Male", pathway: "Tyrant", sequence: 4, factions: ["Tarot Club", "Church of the Fool"], firstChapter: 5 },
    { name: "Alista Tudor", age: "4th Epoch", gender: "Male", pathway: "Black Emperor", sequence: 0, factions: ["Demoness Sect"], firstChapter: 9 },
    { name: "Alzuhod", age: "2nd Epoch", gender: "Male", pathway: "Visionary", sequence: 1, factions: ["None"], firstChapter: 238 },
    { name: "Amon", age: "3rd Epoch", gender: "Male", pathway: "Error", sequence: 2, factions: ["King of Angels"], firstChapter: 60 },
    { name: "Anderson Hood", age: "5th Epoch", gender: "Male", pathway: "Red Priest", sequence: 4, factions: ["Treasure Hunter"], firstChapter: 649 },
    { name: "Antigonus", age: "2nd Epoch", gender: "Male", pathway: "Fool", sequence: 2, factions: ["Solomon Empire"], firstChapter: 1381 },
    { name: "Arianna", age: "5th Epoch", gender: "Female", pathway: "Darkness", sequence: 2, factions: ["None"], firstChapter: 950 },
    { name: "Audrey Hall", age: "5th Epoch", gender: "Female", pathway: "Visionary", sequence: 3, factions: ["Tarot Club", "Psychology Alchemists"], firstChapter: 5 },
    { name: "Azik Eggers", age: "4th Epoch", gender: "Male", pathway: "Death", sequence: 2, factions: ["Church of the Fool"], firstChapter: 9 },
    { name: "Bernadette Gustav", age: "5th Epoch", gender: "Female", pathway: "Hermit", sequence: 2, factions: ["Emerald City"], firstChapter: 321 },
    { name: "Bethel Abraham", age: "4th Epoch", gender: "Male", pathway: "Door", sequence: 1, factions: ["Abraham Family", "King of Angels"], firstChapter: 216 },
    { name: "Cattleya", age: "5th Epoch", gender: "Female", pathway: "Hermit", sequence: 3, factions: ["Tarot Club", "Moses Ascetic Order"], firstChapter: 294 },
    { name: "Chained God", age: "4th Epoch", gender: "Male", pathway: "Chained", sequence: 1, factions: ["Rose Redemption"], firstChapter: 180 },
    { name: "Colin Iliad", age: "5th Epoch", gender: "Male", pathway: "Twilight Giant", sequence: 3, factions: ["City of Silver"], firstChapter: 219 },
    { name: "Cohinem", age: "2nd Epoch", gender: "Female", pathway: "Tyrant", sequence: 2, factions: ["Elves"], firstChapter: 549 },
    { name: "Daly Simone", age: "5th Epoch", gender: "Female", pathway: "Death", sequence: 5, factions: ["Nighthawks", "Red Gloves"], firstChapter: 17 },
    { name: "Danitz Dubois", age: "5th Epoch", gender: "Male", pathway: "Red Priest", sequence: 6, factions: ["Treasure Hunter", "Church of the Fool"], firstChapter: 499 },
    { name: "Derrick Berg", age: "5th Epoch", gender: "Male", pathway: "Sun", sequence: 4, factions: ["Tarot Club", "City of Silver", "Church of the Fool"], firstChapter: 95 },
    { name: "Dorian Gray Abraham", age: "5th Epoch", gender: "Male", pathway: "Door", sequence: 7, factions: ["Abraham Family"], firstChapter: 404 },
    { name: "Dunn Smith", age: "5th Epoch", gender: "Male", pathway: "Darkness", sequence: 7, factions: ["Nighthawks"], firstChapter: 12 },
    { name: "Emlyn White", age: "5th Epoch", gender: "Male", pathway: "Moon", sequence: 4, factions: ["Tarot Club", "Sanguines"], firstChapter: 315 },
    { name: "Eternal Blazing Sun", age: "3rd Epoch", gender: "Male", pathway: "Sun", sequence: 0, factions: ["Rose Redemption"], firstChapter: 3 },
    { name: "Evernight Goddess", age: "2nd Epoch", gender: "Female", pathway: "Darkness", sequence: 0, factions: ["Rose Redemption", "Church of Evernight Goddess", "Transmigrator"], firstChapter: 3 },
    { name: "Flegrea", age: "2nd Epoch", gender: "Male", pathway: "Darkness", sequence: 0, factions: ["None"], firstChapter: 32 },
    { name: "Fors Wall", age: "5th Epoch", gender: "Female", pathway: "Door", sequence: 4, factions: ["Tarot Club", "Church of the Fool", "Abraham Family"], firstChapter: 107 },
    { name: "Frank Lee", age: "5th Epoch", gender: "Male", pathway: "Druid", sequence: 5, factions: ["None"], firstChapter: 638 },
    { name: "Frye", age: "5th Epoch", gender: "Male", pathway: "Death", sequence: 7, factions: ["Nighthawks"], firstChapter: 45 },
    { name: "God of Combat", age: "2nd Epoch", gender: "Male", pathway: "Twilight Giant", sequence: 0, factions: ["Rose Redemption"], firstChapter: 3 },
    { name: "God of Knowledge and Wisdom", age: "2nd Epoch", gender: "Male", pathway: "Paragon", sequence: 0, factions: ["Moses Ascetic Order"], firstChapter: 3 },
    { name: "Hidden Sage", age: "5th Epoch", gender: "Male", pathway: "Hermit", sequence: 0, factions: ["Moses Ascetic Order"], firstChapter: 164 },
    { name: "Hermes", age: "2nd Epoch", gender: "Male", pathway: "Visionary", sequence: 2, factions: ["Psychology Alchemists", "Twilight Hermit Order"], firstChapter: 484 },
    { name: "Ince Zangwill", age: "5th Epoch", gender: "Male", pathway: "Darkness", sequence: 4, factions: ["None"], firstChapter: 19 },
    { name: "Katarina Pelle", age: "4th Epoch", gender: "Female", pathway: "Demoness", sequence: 3, factions: ["Demoness Sect"], firstChapter: 199 },
    { name: "Klein Moretti", age: "5th Epoch", gender: "Male", pathway: "Fool", sequence: 0, factions: ["Tarot Club", "Transmigrator", "Church of the Fool", "Nighthawks"], firstChapter: 1 },
    { name: "Lenevus", age: "5th Epoch", gender: "Male", pathway: "Error", sequence: 8, factions: ["Aurora Order"], firstChapter: 62 },
    { name: "Leonard Mitchell", age: "5th Epoch", gender: "Male", pathway: "Darkness", sequence: 4, factions: ["Tarot Club", "Red Gloves", "Nighthawks"], firstChapter: 10 },
    { name: "Lilith", age: "2nd Epoch", gender: "Female", pathway: "Mother", sequence: 0, factions: ["Sanguines"], firstChapter: 3 },
    { name: "Lord of Storms", age: "3rd Epoch", gender: "Male", pathway: "Tyrant", sequence: 0, factions: ["Rose Redemption"], firstChapter: 3 },
    { name: "Lovia Tiffany", age: "5th Epoch", gender: "Female", pathway: "Hanged Man", sequence: 4, factions: ["City of Silver"], firstChapter: 202 },
    { name: "Maric", age: "5th Epoch", gender: "Male", pathway: "Chained", sequence: 4, factions: ["Church of the Fool", "Rose School"], firstChapter: 233 },
    { name: "Medici", age: "3rd Epoch", gender: "Male", pathway: "Red Priest", sequence: 1, factions: ["King of Angels", "Rose Redemption"], firstChapter: 486 },
    { name: "Mobet Zoroast", age: "4th Epoch", gender: "Male", pathway: "Error", sequence: 5, factions: ["Groselle's Travels", "Elves"], firstChapter: 697 },
    { name: "Old Neil", age: "5th Epoch", gender: "Male", pathway: "Hermit", sequence: 9, factions: ["Nighthawks"], firstChapter: 25 },
    { name: "Ouroboros", age: "3rd Epoch", gender: "Male", pathway: "Wheel of Fortune", sequence: 1, factions: ["King of Angels", "Aurora Order", "Rose Redemption"], firstChapter: 466 },
    { name: "Pallez Zoroast", age: "4th Epoch", gender: "Male", pathway: "Error", sequence: 2, factions: ["Church of the Fool"], firstChapter: 609 },
    { name: "Reinette Tinekerr", age: "4th Epoch", gender: "Female", pathway: "Chained", sequence: 2, factions: ["Church of the Fool", "Rose School"], firstChapter: 547 },
    { name: "Roselle Gustav", age: "5th Epoch", gender: "Male", pathway: "Black Emperor", sequence: 0, factions: ["Transmigrator", "Twilight Hermit Order"], firstChapter: 4 },
    { name: "Sasir", age: "3rd Epoch", gender: "Male", pathway: "Hanged Man", sequence: 1, factions: ["King of Angels", "Rose Redemption"], firstChapter: 666 },
    { name: "Siatas", age: "2nd Epoch", gender: "Female", pathway: "Tyrant", sequence: 5, factions: ["Groselle's Travels", "Elves"], firstChapter: 696 },
    { name: "Snowman", age: "3rd Epoch", gender: "Male", pathway: "Sun", sequence: 5, factions: ["Groselle's Travels"], firstChapter: 697 },
    { name: "Sharron", age: "5th Epoch", gender: "Female", pathway: "Chained", sequence: 4, factions: ["Church of the Fool", "Rose School"], firstChapter: 246 },
    { name: "Soniathrym", age: "2nd Epoch", gender: "Male", pathway: "Tyrant", sequence: 0, factions: ["Elves"], firstChapter: 313 },
    { name: "Suah", age: "4th Epoch", gender: "Male", pathway: "Chained", sequence: 1, factions: ["Church of the Fool", "Rose School"], firstChapter: 729 },
    { name: "Susie", age: "5th Epoch", gender: "Female", pathway: "Visionary", sequence: 5, factions: ["None"], firstChapter: 36 },
    { name: "Trissy", age: "5th Epoch", gender: "Female", pathway: "Demoness", sequence: 4, factions: ["Demoness Sect"], firstChapter: 56 },
    { name: "Will Auceptin", age: "5th Epoch", gender: "Male", pathway: "Wheel of Fortune", sequence: 1, factions: ["Church of the Fool"], firstChapter: 326 },
    { name: "Xio Derecha", age: "5th Epoch", gender: "Female", pathway: "Justiciar", sequence: 4, factions: ["Tarot Club"], firstChapter: 107 },
    { name: "Zaratul", age: "4th Epoch", gender: "Male", pathway: "Fool", sequence: 2, factions: ["Secret Order"], firstChapter: 59 }
];


const pathwayGroups = [
  ["Seer", "Marauder", "Apprentice"],
  ["Spectator", "Bard", "Sailor"],
  ["Reader", "Secret Supplicant", "Sleepless", "Corpse Collector", "Warrior"],
  ["Assassin", "Hunter", "Monster"],
  ["Planter", "Apothecary"],
  ["Criminal", "Prisoner"],
  ["Lawyer", "Arbiter"],
];

//DAILY
function todayKey() {
  const d = new Date();
  const yyyy = d.getFullYear();
  const mm = String(d.getMonth() + 1).padStart(2, "0");
  const dd = String(d.getDate()).padStart(2, "0");
  return `${yyyy}-${mm}-${dd}`;
}
function dailyDoneKey() {
  return `lotmdleclassicdailydone_${todayKey()}`;
}
function isDailyDone() {
  return localStorage.getItem(dailyDoneKey()) === "1";
}
function setDailyDone() {
  localStorage.setItem(dailyDoneKey(), "1");
}
function dailyIndex(key, size) {
  let h = 0;
  for (let i = 0; i < key.length; i++) h = (h * 31 + key.charCodeAt(i)) | 0;
  return Math.abs(h) % size;
}

//DAILYSAVE
function dailySaveKey() {
  return `lotmdleclassic_dailysave_v1_${todayKey()}`;
}
function saveDailyState() {
  if (mode !== "daily") return;
  if (!answer) return;
  if (isDailyDone()) return;

  const rows = Array.from(grid?.children || []);
  const guesses = rows.map((row) => {
    const cells = Array.from(row.querySelectorAll(".cell"));
    return cells.map((cell) => ({
      text: cell?.textContent ?? "",
      cls: cell?.className ?? "cell",
    }));
  });

  const payload = {
    answerName: answer.name,
    attempts,
    gameOver,
    usedNames: Array.from(usedNames),
    guesses,
  };

  localStorage.setItem(dailySaveKey(), JSON.stringify(payload));
}
function clearDailyState() {
  localStorage.removeItem(dailySaveKey());
}
function loadDailyState() {
  const raw = localStorage.getItem(dailySaveKey());
  if (!raw) return null;
  try {
    return JSON.parse(raw);
  } catch {
    return null;
  }
}


//INFSAVE
function infSaveKey() {
  return "lotmdleclassic_infsave_v1";
}
function saveInfiniteState() {
  if (mode !== "infinite") return;
  if (!answer) return;

  const rows = Array.from(grid?.children || []);
  const guesses = rows.map((row) => {
    const cells = Array.from(row.querySelectorAll(".cell"));
    return cells.map((cell) => ({
      text: cell?.textContent ?? "",
      cls: cell?.className ?? "cell",
    }));
  });

  const payload = {
    answerName: answer.name,
    attempts,
    gameOver,
    usedNames: Array.from(usedNames),
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
  try {
    return JSON.parse(raw);
  } catch {
    return null;
  }
}

//ELEMENTS
let mode = localStorage.getItem("lotmdleclassicmode") || "daily";

const grid = document.getElementById("grid");
const list = document.getElementById("list");
const searchInput = document.getElementById("searchInput");
const statusText = document.getElementById("statusText");
const attemptsText = document.getElementById("attemptsText");

const dailyBtn = document.getElementById("dailyBtn");
const infiniteBtn = document.getElementById("infiniteBtn");

const endOverlay = document.getElementById("endOverlay");
const endTitle = document.getElementById("endTitle");
const endDesc = document.getElementById("endDesc");
const playAgainBtn = document.getElementById("playAgainBtn");
const closeOverlayBtn = document.getElementById("closeOverlayBtn");

const lbBtn = document.getElementById("leaderboardBtn");
const lbOverlay = document.getElementById("leaderboardOverlay");
const lbCloseBtn = document.getElementById("closeLeaderboard");
const lbDailyBtn = document.getElementById("lbDailyBtn");
const lbInfBtn = document.getElementById("lbInfBtn");
let currentLbMode = "daily";

//STATE
let answer = null;
let attempts = 0;
const maxAttempts = 7;
let gameOver = false;
let usedNames = new Set();
let currentSuggestions = [];

//RESULTS
function normalize(str) {
  return String(str ?? "").toLowerCase().trim();
}
function normPathway(p) {
  return normalize(p);
}
function pathwayResult(guessPathway, answerPathway) {
  const g = normPathway(guessPathway);
  const a = normPathway(answerPathway);
  if (!g || !a) return "wrong";
  if (g === a) return "correct";
  for (const group of pathwayGroups) {
    const set = new Set(group.map(normPathway));
    if (set.has(g) && set.has(a)) return "partial";
  }
  return "wrong";
}
function ageResult(guessAge, answerAge) {
  const g = normalize(guessAge);
  const a = normalize(answerAge);
  return { suffix: "", result: g === a ? "correct" : "wrong" };
}
function simpleEqualResult(g, a) {
  return normalize(g) === normalize(a) ? "correct" : "wrong";
}
function seqResult(guessSeq, answerSeq) {
  const g = Number(guessSeq);
  const a = Number(answerSeq);
  if (g === a) return "correct";
  if (Math.abs(g - a) === 1) return "partial";
  return "wrong";
}
function factionsResult(guessFactions, answerFactions) {
  const gSet = new Set((guessFactions || []).map(normalize));
  const aSet = new Set((answerFactions || []).map(normalize));
  const intersection = Array.from(gSet).filter((x) => aSet.has(x));
  if (intersection.length === 0) return "wrong";
  if (gSet.size === aSet.size && intersection.length === gSet.size) return "correct";
  return "partial";
}
function chapterResult(guessChapter, answerChapter) {
  const g = parseInt(guessChapter, 10);
  const a = parseInt(answerChapter, 10);
  if (Number.isNaN(g) || Number.isNaN(a)) return { suffix: "", result: "wrong" };
  if (g === a) return { suffix: "", result: "correct" };
  return { suffix: g < a ? " ↑" : " ↓", result: "partial" };
}
function makeCell(text, result) {
  const cell = document.createElement("div");
  cell.className = "cell";
  if (result === "correct") cell.classList.add("correct");
  else if (result === "partial") cell.classList.add("partial");
  else cell.classList.add("wrong");
  cell.textContent = text;
  return cell;
}

//PICK
function pickDailyAnswer() {
  if (!characters.length) return null;
  const idx = dailyIndex(todayKey(), characters.length);
  return characters[idx];
}
function pickInfiniteAnswer() {
  if (!characters.length) return null;
  return characters[Math.floor(Math.random() * characters.length)];
}

//LIST
function openList() {
  if (!list) return;
  if (gameOver) return;
  list.classList.remove("hidden");
}
function closeList() {
  if (!list) return;
  list.classList.add("hidden");
}
function renderList(items) {
  if (!list) return;
  list.innerHTML = "";
  items.forEach((char) => {
    const div = document.createElement("div");
    div.className = "list-item";

    const nameSpan = document.createElement("span");
    nameSpan.className = "name";
    nameSpan.textContent = char.name;

    const seqSpan = document.createElement("span");
    seqSpan.className = "seq";
    seqSpan.textContent = `Seq ${char.sequence}`;

    div.appendChild(nameSpan);
    div.appendChild(seqSpan);

    const disabled = usedNames.has(char.name) || gameOver;
    if (disabled) {
      div.classList.add("used");
      div.onclick = null;
    } else {
      div.onclick = () => {
        if (usedNames.has(char.name) || gameOver) return;
        makeGuess(char);
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
  currentSuggestions = characters
    .filter((c) => c.name.toLowerCase().includes(q))
    .slice(0, 30);
  renderList(currentSuggestions);
  if (currentSuggestions.length) openList();
  else closeList();
}

//END
function hideEndScreen() {
  if (endOverlay) endOverlay.classList.add("hidden");
}
function updateStreak(won) {
  const streakKey = mode === "daily" ? "lotmdleclassic_dailystreak" : "lotmdleclassic_infstreak";
  let current = parseInt(localStorage.getItem(streakKey) || "0", 10);

  if (won) {
    current++;
    localStorage.setItem(streakKey, String(current));

    let playerName = localStorage.getItem("lotmdleplayername");
    if (!playerName) {
      setTimeout(() => {
        playerName = (prompt("Gratulacje! Podaj swój nick do rankingu") || "").trim();
        if (playerName) {
          if (playerName.length > 15) playerName = playerName.substring(0, 15);
          localStorage.setItem("lotmdleplayername", playerName);
          submitScore(playerName, current, mode === "daily" ? "daily" : "infinite");
        }
      }, 400);
    } else {
      submitScore(playerName, current, mode === "daily" ? "daily" : "infinite");
    }
  } else {
    localStorage.setItem(streakKey, "0");
  }
}
function showEndScreen(won) {
  if (endTitle) endTitle.textContent = won ? "You got it!" : "Not quite!";
  if (endDesc && answer) {
    endDesc.textContent = `Answer: ${answer.name} | Pathway: ${answer.pathway} | Seq: ${answer.sequence} | First chapter: ${answer.firstChapter}`;
  }
  if (endOverlay) endOverlay.classList.remove("hidden");

  updateStreak(won);

  if (mode === "daily") {
    setDailyDone();
    clearDailyState();

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

  const shareEl = document.getElementById("owShare");
  const triesEl = document.getElementById("owTries");
  const maxEl = document.getElementById("owMax");
  const modeEl = document.getElementById("owMode");

  if (triesEl) triesEl.textContent = String(attempts);
  if (maxEl) maxEl.textContent = String(maxAttempts);
  if (modeEl) modeEl.textContent = mode === "daily" ? "DAILY" : "INFINITE";

  if (shareEl) {
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
  
}

//FLOW
function syncModeUI() {
  const isDaily = mode === "daily";
  if (dailyBtn) dailyBtn.classList.toggle("is-active", isDaily);
  if (infiniteBtn) infiniteBtn.classList.toggle("is-active", !isDaily);
  if (dailyBtn) dailyBtn.setAttribute("aria-pressed", String(isDaily));
  if (infiniteBtn) infiniteBtn.setAttribute("aria-pressed", String(!isDaily));
}
function resetDaily() {
  hideEndScreen();

  answer = pickDailyAnswer();
  attempts = 0;
  gameOver = false;
  usedNames = new Set();
  currentSuggestions = [];

  if (grid) grid.innerHTML = "";
  if (searchInput) searchInput.value = "";
  closeList();

  if (attemptsText) attemptsText.textContent = `Attempts: 0 / ${maxAttempts}`;

  if (isDailyDone()) {
    clearDailyState();
    gameOver = true;
    if (statusText) statusText.textContent = "Daily completed. Come back tomorrow.";
    return;
  }

  const s = loadDailyState();
  if (s && s.answerName === answer.name) {
    attempts = typeof s.attempts === "number" ? s.attempts : 0;
    gameOver = !!s.gameOver;
    usedNames = new Set(Array.isArray(s.usedNames) ? s.usedNames : []);
    currentSuggestions = [];

    if (grid) {
      grid.innerHTML = "";
      const guesses = Array.isArray(s.guesses) ? s.guesses : [];
      guesses.forEach((rowCells) => {
        const row = document.createElement("div");
        row.className = "row";
        (Array.isArray(rowCells) ? rowCells : []).forEach((c) => {
          const cell = document.createElement("div");
          cell.className = c.cls || "cell wrong";
          cell.textContent = c.text || "";
          row.appendChild(cell);
        });
        grid.appendChild(row);
      });
    }

    if (attemptsText) attemptsText.textContent = `Attempts: ${attempts} / ${maxAttempts}`;
    if (statusText) statusText.textContent = gameOver ? "Game finished." : "Select a character to continue.";
    if (searchInput) searchInput.value = "";
    closeList();
    return;
  }

  if (statusText) statusText.textContent = "Select a character to start.";
  saveDailyState();
}

function startInfinite(forceNew = false) {
  hideEndScreen();

  if (!forceNew) {
    const s = loadInfiniteState();
    if (s && s.answerName) {
      const restoredAnswer = characters.find((c) => c.name === s.answerName);
      if (restoredAnswer) {
        answer = restoredAnswer;
        attempts = typeof s.attempts === "number" ? s.attempts : 0;
        gameOver = !!s.gameOver;
        usedNames = new Set(Array.isArray(s.usedNames) ? s.usedNames : []);
        currentSuggestions = [];

        if (grid) {
          grid.innerHTML = "";
          const guesses = Array.isArray(s.guesses) ? s.guesses : [];
          guesses.forEach((rowCells) => {
            const row = document.createElement("div");
            row.className = "row";
            (Array.isArray(rowCells) ? rowCells : []).forEach((c) => {
              const cell = document.createElement("div");
              cell.className = c.cls || "cell wrong";
              cell.textContent = c.text || "";
              row.appendChild(cell);
            });
            grid.appendChild(row);
          });
        }

        if (attemptsText) attemptsText.textContent = `Attempts: ${attempts} / ${maxAttempts}`;
        if (statusText) statusText.textContent = gameOver ? "Game finished." : "Keep guessing...";
        if (searchInput) searchInput.value = "";
        closeList();
        return;
      }
    }
  }

  answer = pickInfiniteAnswer();
  attempts = 0;
  gameOver = false;
  usedNames = new Set();
  currentSuggestions = [];

  if (grid) grid.innerHTML = "";
  if (searchInput) searchInput.value = "";
  closeList();

  if (attemptsText) attemptsText.textContent = `Attempts: 0 / ${maxAttempts}`;
  if (statusText) statusText.textContent = "Select a character to start.";

  saveInfiniteState();
}
function setMode(newMode) {
  if (mode === newMode) return;
  mode = newMode;
  localStorage.setItem("lotmdleclassicmode", mode);
  syncModeUI();
  if (mode === "infinite") startInfinite(false);
  else resetDaily();
}

//GUESS
function makeGuess(guess) {
  if (gameOver || attempts >= maxAttempts || !answer) return;

  if (usedNames.has(guess.name)) {
    if (statusText) statusText.textContent = "Already guessed.";
    return;
  }
  usedNames.add(guess.name);

  const row = document.createElement("div");
  row.className = "row";

  row.appendChild(makeCell(guess.name, simpleEqualResult(guess.name, answer.name)));

  const ageInfo = ageResult(guess.age, answer.age);
  row.appendChild(makeCell(`${guess.age}${ageInfo.suffix}`, ageInfo.result));

  row.appendChild(makeCell(guess.gender, simpleEqualResult(guess.gender, answer.gender)));
  row.appendChild(makeCell(guess.pathway, pathwayResult(guess.pathway, answer.pathway)));
  row.appendChild(makeCell(String(guess.sequence), seqResult(guess.sequence, answer.sequence)));

  const guessFactionsText = (guess.factions || []).join(", ");
  row.appendChild(makeCell(guessFactionsText, factionsResult(guess.factions, answer.factions)));

  const chapterInfo = chapterResult(guess.firstChapter, answer.firstChapter);
  row.appendChild(makeCell(`${guess.firstChapter}${chapterInfo.suffix}`, chapterInfo.result));

  if (grid) grid.appendChild(row);

  attempts++;
  if (attemptsText) attemptsText.textContent = `Attempts: ${attempts} / ${maxAttempts}`;

  const won = simpleEqualResult(guess.name, answer.name) === "correct";
  if (won) {
    if (statusText) statusText.textContent = `You got it! The answer was ${answer.name}.`;
    gameOver = true;
    if (mode === "infinite") saveInfiniteState();
    if (mode === "daily") saveDailyState();

    showEndScreen(true);
    return;
  }

  if (attempts >= maxAttempts) {
    if (statusText) statusText.textContent = `Out of attempts. The answer was ${answer.name}.`;
    gameOver = true;
    if (mode === "infinite") saveInfiniteState();
    if (mode === "daily") saveDailyState();

    showEndScreen(false);
    return;
  }

  if (statusText) statusText.textContent = "Keep guessing...";
  if (mode === "infinite") saveInfiniteState();
  if (mode === "daily") saveDailyState();

}

//EVENTS
if (dailyBtn) dailyBtn.onclick = () => setMode("daily");
if (infiniteBtn) infiniteBtn.onclick = () => setMode("infinite");

if (playAgainBtn) {
  playAgainBtn.onclick = () => {
    if (mode === "infinite") startInfinite(true);
    else resetDaily();
  };
}
if (closeOverlayBtn) closeOverlayBtn.onclick = hideEndScreen;
if (endOverlay) {
  endOverlay.onclick = (e) => {
    if (e.target === endOverlay) hideEndScreen();
  };
}

document.addEventListener("pointerdown", (e) => {
  if (!list || !searchInput) return;
  const clickedInside = e.target === searchInput || list.contains(e.target);
  if (!clickedInside) closeList();
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
      const exact = characters.find((c) => c.name.toLowerCase() === q);
      const pick = exact || currentSuggestions[0];
      if (!pick) return;
      makeGuess(pick);
      searchInput.value = "";
      currentSuggestions = [];
      closeList();
    }
  });
}

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

//LEADERBOARD
if (lbBtn && lbOverlay) {
  lbBtn.addEventListener("click", () => {
    lbOverlay.classList.remove("hidden");
    currentLbMode = mode === "daily" ? "daily" : "infinite";
    if (lbDailyBtn && lbInfBtn) {
      lbDailyBtn.classList.toggle("is-active", currentLbMode === "daily");
      lbInfBtn.classList.toggle("is-active", currentLbMode === "infinite");
    }
    loadLeaderboard(currentLbMode);
  });
}
if (lbCloseBtn && lbOverlay) lbCloseBtn.addEventListener("click", () => lbOverlay.classList.add("hidden"));
if (lbOverlay) lbOverlay.addEventListener("click", (e) => { if (e.target === lbOverlay) lbOverlay.classList.add("hidden"); });

if (lbDailyBtn) lbDailyBtn.addEventListener("click", () => {
  currentLbMode = "daily";
  lbDailyBtn.classList.add("is-active");
  if (lbInfBtn) lbInfBtn.classList.remove("is-active");
  loadLeaderboard("daily");
});
if (lbInfBtn) lbInfBtn.addEventListener("click", () => {
  currentLbMode = "infinite";
  lbInfBtn.classList.add("is-active");
  if (lbDailyBtn) lbDailyBtn.classList.remove("is-active");
  loadLeaderboard("infinite");
});

//THEME
const themeBtn = document.getElementById("themeBtn");
const themeMenu = document.getElementById("themeMenu");
const themeOptions = document.querySelectorAll(".theme-option");
let currentTheme = localStorage.getItem("lotmdletheme") || "theme-lotm";

function setTheme(theme) {
  document.body.classList.remove("theme-classic", "theme-lotm");
  document.body.classList.add(theme);
  currentTheme = theme;
  localStorage.setItem("lotmdletheme", theme);
  themeOptions.forEach((opt) => {
    if (opt.dataset.theme === theme) opt.classList.add("active");
    else opt.classList.remove("active");
  });
}

setTheme(currentTheme);

if (themeBtn && themeMenu) {
  themeBtn.addEventListener("click", (e) => {
    e.stopPropagation();
    themeMenu.classList.toggle("hidden");
  });
  document.addEventListener("click", (e) => {
    if (!themeMenu.contains(e.target) && e.target !== themeBtn) themeMenu.classList.add("hidden");
  });
  themeOptions.forEach((opt) => {
    opt.addEventListener("click", () => {
      setTheme(opt.dataset.theme);
      themeMenu.classList.add("hidden");
    });
  });
}

//INIT
syncModeUI();
if (mode === "infinite") startInfinite(false);
else resetDaily();
