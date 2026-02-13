const characters = [
  { name: "Adam", age: "Unk", gender: "Male", pathway: "Visionary", sequence: 0, factions: ["Twilight Hermit Order", "Psychology Alchemist", "King of Angels"], firstChapter: 448 },
  { name: "Alger Wilson", age: 32, gender: "Male", pathway: "Tyrant", sequence: 4, factions: ["Tarot Club", "Church of the Fool"], firstChapter: 5 },
  { name: "Alista Tudor", age: "Unk", gender: "Male", pathway: "Black Emperor", sequence: 0, factions: ["Demoness Sect"], firstChapter: 9 },
  { name: "Amon", age: "Unk", gender: "Male", pathway: "Error", sequence: 2, factions: ["King of Angels"], firstChapter: 60 },
  { name: "Anderson Hood", age: 29, gender: "Male", pathway: "Red Priest", sequence: 4, factions: ["Treasure Hunter"], firstChapter: 649 },
  { name: "Antigonus", age: "Unk", gender: "Male", pathway: "Fool", sequence: 2, factions: ["Solomon Empire"], firstChapter: 1381 },
  { name: "Audrey Hall", age: 17, gender: "Female", pathway: "Visionary", sequence: 3, factions: ["Tarot Club", "Psychology Alchemists"], firstChapter: 5 },
  { name: "Azik Eggers", age: 1300, gender: "Male", pathway: "Death", sequence: 2, factions: ["Church of the Fool"], firstChapter: 9 },
  { name: "Bernadette Gustav", age: 194, gender: "Female", pathway: "Hermit", sequence: 2, factions: ["Emerald City"], firstChapter: 321 },
  { name: "Bethel Abraham", age: "Unk", gender: "Male", pathway: "Door", sequence: 1, factions: ["Abraham Family", "King of Angels"], firstChapter: 216 },
  { name: "Cattleya", age: 26, gender: "Female", pathway: "Hermit", sequence: 3, factions: ["Tarot Club", "Moses Ascetic Order"], firstChapter: 294 },
  { name: "Chained God", age: "Unk", gender: "Male", pathway: "Chained", sequence: 1, factions: ["Rose Redemption"], firstChapter: 180 },
  { name: "Colin Iliad", age: 100, gender: "Male", pathway: "Twilight Giant", sequence: 3, factions: ["City of Silver"], firstChapter: 219 },
  { name: "Daly Simone", age: 24, gender: "Female", pathway: "Death", sequence: 5, factions: ["Nighthawk", "Red Gloves"], firstChapter: 17 },
  { name: "Danitz Dubois", age: 31, gender: "Male", pathway: "Red Priest", sequence: 6, factions: ["Treasure Hunter", "Church of the Fool"], firstChapter: 499 },
  { name: "Derrick Berg", age: 14, gender: "Male", pathway: "Sun", sequence: 4, factions: ["Tarot Club", "City of Silver", "Church of the Fool"], firstChapter: 95 },
  { name: "Dorian Gray Abraham", age: "Unk", gender: "Male", pathway: "Door", sequence: 7, factions: ["Abraham Family"], firstChapter: 404 },
  { name: "Dunn Smith", age: 35, gender: "Male", pathway: "Darkness", sequence: 7, factions: ["Nighthawks"], firstChapter: 12 },
  { name: "Emlyn White", age: 37, gender: "Male", pathway: "Moon", sequence: 4, factions: ["Tarot Club", "Sanguines"], firstChapter: 315 },
  { name: "Eternal Blazing Sun", age: "Unk", gender: "Male", pathway: "Sun", sequence: 0, factions: ["Rose Redemption"], firstChapter: 3 },
  { name: "Evernight Goddess", age: "Unk", gender: "Female", pathway: "Darkness", sequence: 0, factions: ["Rose Redemption", "Church of Evernight Goddess", "Transmigrator"], firstChapter: 3 },
  { name: "Flegrea", age: "Unk", gender: "Female", pathway: "Darkness", sequence: 0, factions: ["None"], firstChapter: 32 },
  { name: "Fors Wall", age: 23, gender: "Female", pathway: "Door", sequence: 4, factions: ["Tarot Club", "Church of the Fool", "Abraham Family"], firstChapter: 107 },
  { name: "Frank Lee", age: 34, gender: "Male", pathway: "Druid", sequence: 5, factions: ["None"], firstChapter: 638 },
  { name: "Frye", age: 30, gender: "Male", pathway: "Death", sequence: 7, factions: ["Nighthawks"], firstChapter: 45 },
  { name: "God of Combat", age: "Unk", gender: "Male", pathway: "Twilight Giant", sequence: 0, factions: ["Rose Redemption"], firstChapter: 3 },
  { name: "God of Knowledge and Wisdom", age: "Unk", gender: "Male", pathway: "Paragon", sequence: 0, factions: ["Moses Ascetic Order"], firstChapter: 3 },
  { name: "Hidden Sage", age: "Unk", gender: "Male", pathway: "Hermit", sequence: 0, factions: ["Moses Ascetic Order"], firstChapter: 164 },
  { name: "Ince Zangwill", age: 40, gender: "Male", pathway: "Darkness", sequence: 4, factions: ["None"], firstChapter: 19 },
  { name: "Katarina Pelle", age: 1300, gender: "Female", pathway: "Demoness", sequence: 3, factions: ["Demoness Sect"], firstChapter: 199 },
  { name: "Klein Moretti", age: 22, gender: "Male", pathway: "Fool", sequence: 0, factions: ["Tarot Club", "Transmigrator", "Church of the Fool", "Nighthawks"], firstChapter: 1 },
  { name: "Lenevus", age: "Unk", gender: "Male", pathway: "Error", sequence: 8, factions: ["Aurora Order"], firstChapter: 62 },
  { name: "Lenoard Mitchell", age: 25, gender: "Male", pathway: "Darkness", sequence: 4, factions: ["Tarot Club", "Red Gloves", "Nighthawk"], firstChapter: 10 },
  { name: "Lilith", age: "Unk", gender: "Female", pathway: "Mother", sequence: 0, factions: ["Sanguines"], firstChapter: 3 },
  { name: "Lord of Storms", age: "Unk", gender: "Male", pathway: "Tyrant", sequence: 0, factions: ["Rose Redemption"], firstChapter: 3 },
  { name: "Lovia Tiffany", age: "Unk", gender: "Female", pathway: "Hanged Man", sequence: 4, factions: ["City of Silver"], firstChapter: 202 },
  { name: "Maric", age: "Unk", gender: "Male", pathway: "Chained", sequence: 4, factions: ["Church of the Fool", "Rose School"], firstChapter: 233 },
  { name: "Medici", age: 1300, gender: "Male", pathway: "Red Priest", sequence: 1, factions: ["King of Angels", "Rose Redemption"], firstChapter: 486 },
  { name: "Old Neil", age: 61, gender: "Male", pathway: "Hermit", sequence: 9, factions: ["Nighthawk"], firstChapter: 25 },
  { name: "Ourobos", age: 2500, gender: "Male", pathway: "Wheel of Fortune", sequence: 1, factions: ["King of Angels", "Aurora Order", "Rose Redemption"], firstChapter: 466 },
  { name: "Pallez Zoroast", age: "Unk", gender: "Male", pathway: "Error", sequence: 2, factions: ["Church of the Fool"], firstChapter: 609 },
  { name: "Reinette Tinekerr", age: 1289, gender: "Female", pathway: "Chained", sequence: 2, factions: ["Church of the Fool", "Rose School"], firstChapter: 547 },
  { name: "Roselle Gustav", age: 227, gender: "Male", pathway: "Black Emperor", sequence: 0, factions: ["Transmigrator", "Twilight Hermit Order"], firstChapter: 4 },
  { name: "Sasir", age: "Unk", gender: "Male", pathway: "Hanged Man", sequence: 1, factions: ["King of Angels", "Rose Redemption"], firstChapter: 4 },
  { name: "Sharron", age: 23, gender: "Female", pathway: "Chained", sequence: 4, factions: ["Church of the Fool", "Rose School"], firstChapter: 246 },
  { name: "Suah", age: 922, gender: "Female", pathway: "Chained", sequence: 1, factions: ["Church of the Fool", "Rose School"], firstChapter: 729 },
  { name: "Susie", age: "Unk", gender: "Female", pathway: "Visionary", sequence: 5, factions: ["None"], firstChapter: 36 },
  { name: "Trissy", age: 18, gender: "Female", pathway: "Demoness", sequence: 4, factions: ["Demoness Sect"], firstChapter: 56 },
  { name: "Will Auceptin", age: 1, gender: "Male", pathway: "Wheel of Fortune", sequence: 1, factions: ["Church of the Fool"], firstChapter: 326 },
  { name: "Xio Derecha", age: 21, gender: "Female", pathway: "Justiciar", sequence: 4, factions: ["Tarot Club"], firstChapter: 107 },
  { name: "Zaratul", age: "Unk", gender: "Male", pathway: "Fool", sequence: 2, factions: ["Secret Order"], firstChapter: 59 }
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
      div.onclick = () => makeGuess(char);
    }
    list.appendChild(div);
  });
}

function filterList() {
  const value = searchInput.value.toLowerCase();
  const filtered = characters.filter(char => char.name.toLowerCase().includes(value));
  renderList(filtered);
}

renderList(characters);

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
  const g = parseInt(guessAge);
  const a = parseInt(answerAge);
  if (isNaN(g) || isNaN(a)) return { suffix: "", result: "wrong" };
  if (g === a) return { suffix: "", result: "correct" };
  return g < a ? { suffix: " ↑", result: "partial" } : { suffix: " ↓", result: "partial" };
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
    renderList(characters);
    hideEndScreen();
    return;
  }

  attempts = 0;
  usedNames.clear();
  gameOver = false;

  attemptsText.textContent = `Attempts: 0 / ${maxAttempts}`;
  statusText.textContent = "Select a character to start.";

  while (grid.children.length > 1) grid.removeChild(grid.lastElementChild);

  answer = pickAnswer();

  hideEndScreen();
  renderList(characters);
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
  renderList(characters);
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
  renderList(characters);

  if (simpleEqualResult(guess.name, answer.name) === "correct") {
    statusText.textContent = `You got it! The answer was ${answer.name}.`;
    gameOver = true;
    renderList(characters);
    showEndScreen(true);
    return;
  }

  if (attempts === maxAttempts) {
    statusText.textContent = `Out of attempts. The answer was ${answer.name}.`;
    gameOver = true;
    renderList(characters);
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
