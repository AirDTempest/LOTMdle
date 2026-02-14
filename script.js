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
  ["Spectator", "Bard", "Sailor", "Reader", "Secret Supplicant"],
  ["Sleepless", "Corpse Collector", "Warrior"],
  ["Assassin", "Hunter"],
  ["Monster"],
  ["Planter", "Apothecary"],
  ["Criminal", "Prisoner"],
  ["Lawyer", "Arbiter"]
];

const grid = document.getElementById("grid");
const list = document.getElementById("list");
const searchInput = document.getElementById("searchInput");
const statusText = document.getElementById("statusText");
const attemptsText = document.getElementById("attemptsText");
const owTries = document.getElementById("owTries");
const owMax = document.getElementById("owMax");
const owMode = document.getElementById("owMode");
const owShare = document.getElementById("owShare");
const owCopyBtn = document.getElementById("owCopyBtn");

const dailyBtn = document.getElementById("dailyBtn");
const infiniteBtn = document.getElementById("infiniteBtn");

const endOverlay = document.getElementById("endOverlay");
const endTitle = document.getElementById("endTitle");
const endDesc = document.getElementById("endDesc");
const playAgainBtn = document.getElementById("playAgainBtn");
const closeOverlayBtn = document.getElementById("closeOverlayBtn");

let mode = localStorage.getItem("lotmdle_mode") || "daily";

function todayKey() {
  const d = new Date();
  const yyyy = d.getFullYear();
  const mm = String(d.getMonth() + 1).padStart(2, "0");
  const dd = String(d.getDate()).padStart(2, "0");
  return `${yyyy}-${mm}-${dd}`;
}

function dailyDoneKey() {
  return `lotmdle_daily_done_${todayKey()}`;
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

function pickAnswer() {
  if (mode === "daily") {
    const idx = dailyIndex(todayKey(), characters.length);
    return characters[idx];
  }
  return characters[Math.floor(Math.random() * characters.length)];
}

let answer = pickAnswer();
let attempts = 0;
const maxAttempts = 7;
let gameOver = false;
const usedNames = new Set();

function renderList(items) {
  if (!list) return;
  list.innerHTML = "";

  items.forEach(char => {
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

    const key = char.name;

    if (usedNames.has(key) || gameOver) {
      div.classList.add("used");
      div.onclick = null;
    } else {
      div.classList.remove("used");
      div.onclick = () => {
        if (usedNames.has(char.name) || gameOver) return;
        
        makeGuess(char);
        searchInput.value = "";
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
    .filter(c => c.name.toLowerCase().includes(q))
    .slice(0, 30);

  renderList(currentSuggestions);
  if (currentSuggestions.length > 0) {
    openList();
  } else {
    closeList();
  }
}

function filterList() {
  const value = searchInput.value.toLowerCase();
  const filtered = characters.filter(char => char.name.toLowerCase().includes(value));
  renderList(filtered);
}



function normalize(str) {
  return String(str).toLowerCase().trim();
}

function normPathway(p) {
  return String(p || "").trim().toLowerCase();
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

    if (g === a) {
        return { suffix: "", result: "correct" };
    }
    
    return { suffix: "", result: "wrong" };
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
  const gSet = new Set(guessFactions.map(f => normalize(f)));
  const aSet = new Set(answerFactions.map(f => normalize(f)));
  const intersection = [...gSet].filter(x => aSet.has(x));
  if (intersection.length === 0) return "wrong";
  if (gSet.size === aSet.size && intersection.length === gSet.size) return "correct";
  return "partial";
}

function chapterResult(guessChapter, answerChapter) {
  const g = parseInt(guessChapter);
  const a = parseInt(answerChapter);
  if (isNaN(g) || isNaN(a)) return { suffix: "", result: "wrong" };
  if (g === a) return { suffix: "", result: "correct" };
  return g < a ? { suffix: " ↑", result: "partial" } : { suffix: " ↓", result: "partial" };
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

function showEndScreen(won) {
  endTitle.textContent = won ? "You got it!" : "Not quite!";
  endDesc.textContent = `Answer: ${answer.name} • Pathway: ${answer.pathway} • Seq: ${answer.sequence} • First chapter: ${answer.firstChapter}`;
  endOverlay.classList.remove("hidden");

  if (mode === "daily") {
    setDailyDone();
    playAgainBtn.disabled = true;
    playAgainBtn.textContent = "Come back tomorrow";
  } else {
    playAgainBtn.disabled = false;
    playAgainBtn.textContent = "Play again";
  }

  const triesEl = document.getElementById("owTries");
  const maxEl = document.getElementById("owMax");
  const modeEl = document.getElementById("owMode");
  if (triesEl) triesEl.textContent = String(attempts);
  if (maxEl) maxEl.textContent = String(maxAttempts);
  if (modeEl) modeEl.textContent = mode === "daily" ? "DAILY" : "∞";

  const shareEl = document.getElementById("owShare");
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

function hideEndScreen() {
  endOverlay.classList.add("hidden");
}

function resetGame() {
  if (mode === "daily" && isDailyDone()) {
    statusText.textContent = "Daily completed. Come back tomorrow.";
    gameOver = true;

    grid.innerHTML = ""; 

    if (list) {
        list.classList.add("hidden");
        list.innerHTML = "";
    }
    hideEndScreen();
    return;
  }

  attempts = 0;
  usedNames.clear();
  gameOver = false;

  attemptsText.textContent = `Attempts: 0 / ${maxAttempts}`;
  statusText.textContent = "Select a character to start.";

  grid.innerHTML = ""; 

  answer = pickAnswer();
  hideEndScreen();

  if (list) {
      list.classList.add("hidden");
      list.innerHTML = "";
  }

  if (searchInput) searchInput.value = "";
  currentSuggestions = [];
}



function syncModeUI() {
  if (!dailyBtn || !infiniteBtn) return;

  const isDaily = mode === "daily";
  dailyBtn.classList.toggle("is-active", isDaily);
  infiniteBtn.classList.toggle("is-active", !isDaily);

  dailyBtn.disabled = false;
  infiniteBtn.disabled = false;

  dailyBtn.setAttribute("aria-pressed", String(isDaily));
  infiniteBtn.setAttribute("aria-pressed", String(!isDaily));
}

function setMode(newMode) {
  mode = newMode;
  localStorage.setItem("lotmdle_mode", mode);
  resetGame();
  syncModeUI();
}

if (dailyBtn) dailyBtn.onclick = () => setMode("daily");
if (infiniteBtn) infiniteBtn.onclick = () => setMode("infinite");
syncModeUI();

if (playAgainBtn) playAgainBtn.onclick = resetGame;
if (closeOverlayBtn) closeOverlayBtn.onclick = hideEndScreen;
if (endOverlay) {
  endOverlay.onclick = (e) => {
    if (e.target === endOverlay) hideEndScreen();
  };
}

if (mode === "daily" && isDailyDone()) {
  gameOver = true;
  statusText.textContent = "Daily completed. Come back tomorrow.";
  if (list) {
    list.classList.add("hidden");
    list.innerHTML = "";
  }
}

function makeGuess(guess) {
  if (gameOver || attempts >= maxAttempts) return;

  const key = guess.name;
  if (usedNames.has(key)) {
    statusText.textContent = "Already guessed.";
    return;
  }
  usedNames.add(key);

  const row = document.createElement("div");
  row.className = "row";

  row.appendChild(makeCell(guess.name, simpleEqualResult(guess.name, answer.name)));

  const ageInfo = ageResult(guess.age, answer.age);
  row.appendChild(makeCell(`${guess.age}${ageInfo.suffix}`, ageInfo.result));

  row.appendChild(makeCell(guess.gender, simpleEqualResult(guess.gender, answer.gender)));
  row.appendChild(makeCell(guess.pathway, pathwayResult(guess.pathway, answer.pathway)));
  row.appendChild(makeCell(guess.sequence, seqResult(guess.sequence, answer.sequence)));

  const guessFactionsText = guess.factions.join(", ");
  row.appendChild(makeCell(guessFactionsText, factionsResult(guess.factions, answer.factions)));

  const chapterInfo = chapterResult(guess.firstChapter, answer.firstChapter);
  row.appendChild(makeCell(`${guess.firstChapter}${chapterInfo.suffix}`, chapterInfo.result));

  grid.appendChild(row);

  attempts++;
  attemptsText.textContent = `Attempts: ${attempts} / ${maxAttempts}`;
  


  if (simpleEqualResult(guess.name, answer.name) === "correct") {
    statusText.textContent = `You got it! The answer was ${answer.name}.`;
    gameOver = true;
    showEndScreen(true);
    return;
  }

  if (attempts === maxAttempts) {
    statusText.textContent = `Out of attempts. The answer was ${answer.name}.`;
    gameOver = true;
    showEndScreen(false);
    return;
  }

  statusText.textContent = "Keep guessing...";
}


const howBtn = document.getElementById("howBtn");
const howOverlay = document.getElementById("howOverlay");
const howCloseBtn = document.getElementById("howCloseBtn");

function showHow() {
  if (howOverlay) howOverlay.classList.remove("hidden");
}

function hideHow() {
  if (howOverlay) howOverlay.classList.add("hidden");
}

if (howBtn) howBtn.onclick = showHow;
if (howCloseBtn) howCloseBtn.onclick = hideHow;

if (howOverlay) {
  howOverlay.onclick = (e) => {
    if (e.target === howOverlay) hideHow();
  };
}

const feedbackBtn = document.getElementById("feedbackBtn");
const feedbackOverlay = document.getElementById("feedbackOverlay");
const feedbackCloseBtn = document.getElementById("feedbackCloseBtn");

function showFeedback() {
  if (feedbackOverlay) feedbackOverlay.classList.remove("hidden");
}

function hideFeedback() {
  if (feedbackOverlay) feedbackOverlay.classList.add("hidden");
}

if (feedbackBtn) feedbackBtn.onclick = showFeedback;
if (feedbackCloseBtn) feedbackCloseBtn.onclick = hideFeedback;
if (feedbackOverlay) {
  feedbackOverlay.onclick = (e) => {
    if (e.target === feedbackOverlay) hideFeedback();
  };
}

const patchBtn = document.getElementById("patchBtn");
const patchOverlay = document.getElementById("patchOverlay");
const patchCloseBtn = document.getElementById("patchCloseBtn");

if (patchBtn) {
  patchBtn.onclick = () => patchOverlay.classList.remove("hidden");
}

if (patchCloseBtn) {
  patchCloseBtn.onclick = () => patchOverlay.classList.add("hidden");
}

if (patchOverlay) {
  patchOverlay.onclick = (e) => {
    if (e.target === patchOverlay) patchOverlay.classList.add("hidden");
  };
}
if (list) list.classList.add("hidden");

let currentSuggestions = [];

function openList() {
  if (!list) return;
  if (gameOver) return;
  list.classList.remove("hidden");
}

function closeList() {
  if (!list) return;
  list.classList.add("hidden");
}


document.addEventListener("pointerdown", (e) => {
  if (!list || !searchInput) return;
  const clickedInside = (e.target === searchInput) || list.contains(e.target);
  if (!clickedInside) closeList();
});

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

    const exact = characters.find(c => c.name.toLowerCase() === q);
    const pick = exact || currentSuggestions[0];
    if (!pick) return;

    makeGuess(pick);
    searchInput.value = "";
    currentSuggestions = [];
    closeList();
  }
});





const themeBtn = document.getElementById("themeBtn");
const themeMenu = document.getElementById("themeMenu");
const themeOptions = document.querySelectorAll(".theme-option");


let currentTheme = localStorage.getItem("lotmdle_theme") || "theme-lotm";

function setTheme(theme) {

  document.body.classList.remove("theme-classic", "theme-lotm");
  

  document.body.classList.add(theme);
  

  currentTheme = theme;
  localStorage.setItem("lotmdle_theme", theme);
  

  if (themeOptions) {
      themeOptions.forEach(opt => {
        if (opt.dataset.theme === theme) opt.classList.add("active");
        else opt.classList.remove("active");
      });
  }
}


setTheme(currentTheme);

if (themeBtn && themeMenu) {

  themeBtn.addEventListener("click", (e) => {
    e.stopPropagation();
    themeMenu.classList.toggle("hidden");
  });

  document.addEventListener("click", (e) => {
    if (!themeMenu.contains(e.target) && e.target !== themeBtn) {
      themeMenu.classList.add("hidden");
    }
  });


  themeOptions.forEach(opt => {
    opt.addEventListener("click", () => {
      const selected = opt.dataset.theme;
      setTheme(selected);
      themeMenu.classList.add("hidden");
    });
  });
}



const lbBtn = document.getElementById("leaderboardBtn");
const lbOverlay = document.getElementById("leaderboardOverlay");
const lbCloseBtn = document.getElementById("closeLeaderboard");
const lbDailyBtn = document.getElementById("lbDailyBtn");
const lbInfBtn = document.getElementById("lbInfBtn");
let currentLbMode = "daily";

if(lbBtn) {
    lbBtn.addEventListener("click", () => {
        if(lbOverlay) lbOverlay.classList.remove("hidden");
   
        currentLbMode = mode === "daily" ? "daily" : "infinite";
        
    
        if(currentLbMode === "daily") {
            lbDailyBtn.classList.add("is-active");
            lbInfBtn.classList.remove("is-active");
        } else {
            lbInfBtn.classList.add("is-active");
            lbDailyBtn.classList.remove("is-active");
        }
        
        loadLeaderboard(currentLbMode);
    });
}

if(lbCloseBtn && lbOverlay) {
    lbCloseBtn.addEventListener("click", () => {
        lbOverlay.classList.add("hidden");
    });
    

    lbOverlay.addEventListener("click", (e) => {
        if(e.target === lbOverlay) lbOverlay.classList.add("hidden");
    });
}

if(lbDailyBtn) {
    lbDailyBtn.addEventListener("click", () => {
        currentLbMode = "daily";
        lbDailyBtn.classList.add("is-active");
        lbInfBtn.classList.remove("is-active");
        loadLeaderboard("daily");
    });
}

if(lbInfBtn) {
    lbInfBtn.addEventListener("click", () => {
        currentLbMode = "infinite";
        lbInfBtn.classList.add("is-active");
        lbDailyBtn.classList.remove("is-active");
        loadLeaderboard("infinite");
    });
}


function updateStreak(won) {
    const streakKey = mode === "daily" ? "lotmdle_daily_streak" : "lotmdle_inf_streak";
    let current = parseInt(localStorage.getItem(streakKey)) || 0;

    if (won) {
        current++;
        localStorage.setItem(streakKey, current);
        console.log(`Streak updated: ${current}`);
        
       
        let playerName = localStorage.getItem("lotmdle_player_name");
        
        if (!playerName) {
           
            setTimeout(() => {
                playerName = prompt("Congratulations! You set the record. Whats your Nickname?");
                if (playerName) {
          
                    if(playerName.length > 15) playerName = playerName.substring(0, 15);
                    localStorage.setItem("lotmdle_player_name", playerName);
                    submitScore(playerName, current, mode);
                }
            }, 500);
        } else {
            submitScore(playerName, current, mode);
        }
    } else {

        localStorage.setItem(streakKey, 0);
        console.log("Streak reset to 0");
    }
}


const originalShowEndScreen = showEndScreen;
showEndScreen = function(won) {

    originalShowEndScreen(won);
    

    updateStreak(won);
};
