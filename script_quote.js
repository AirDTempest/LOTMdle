import { submitScore, loadLeaderboard } from './leaderboard.js';

const quotesData = [
    { text: "The oldest and strongest emotion of mankind is fear, and the oldest and strongest fear is the fear of the unknown.", name: "Klein Moretti" },
    { text: "We are guardians, but also a bunch of miserable wretches that are constantly fighting against threats and madness.", name: "Dunn Smith" },
    { text: "You can call me... The Fool.", name: "Klein Moretti" },
    { text: "The taste of a Demoness ain't bad.", name: "Roselle Gustav" },
    { text: "Witches are all female...", name: "Roselle Gustav" },
    { text: "There are always some things that are more important than others.", name: "Klein Moretti" },
    { text: "I am just a spectator.", name: "Audrey Hall" },
];

const characters = [
    { name: "Adam" }, { name: "Alger Wilson" }, { name: "Alista Tudor" }, 
    { name: "Alzuhod" }, { name: "Amon" }, { name: "Anderson Hood" }, 
    { name: "Antigonus" }, { name: "Arianna" }, { name: "Audrey Hall" }, 
    { name: "Azik Eggers" }, { name: "Bernadette Gustav" }, { name: "Bethel Abraham" }, 
    { name: "Cattleya" }, { name: "Chained God" }, { name: "Colin Iliad" }, 
    { name: "Cohinem" }, { name: "Daly Simone" }, { name: "Danitz Dubois" }, 
    { name: "Derrick Berg" }, { name: "Dorian Gray Abraham" }, { name: "Dunn Smith" }, 
    { name: "Emlyn White" }, { name: "Eternal Blazing Sun" }, { name: "Evernight Goddess" }, 
    { name: "Flegrea" }, { name: "Fors Wall" }, { name: "Frank Lee" }, { name: "Frye" }, 
    { name: "God of Combat" }, { name: "God of Knowledge and Wisdom" }, { name: "Hidden Sage" }, 
    { name: "Hermes" }, { name: "Ince Zangwill" }, { name: "Katarina Pelle" }, 
    { name: "Klein Moretti" }, { name: "Lenevus" }, { name: "Leonard Mitchell" }, 
    { name: "Lilith" }, { name: "Lord of Storms" }, { name: "Lovia Tiffany" }, 
    { name: "Maric" }, { name: "Medici" }, { name: "Mobet Zoroast" }, 
    { name: "Old Neil" }, { name: "Ouroboros" }, { name: "Pallez Zoroast" }, 
    { name: "Reinette Tinekerr" }, { name: "Roselle Gustav" }, { name: "Sasir" }, 
    { name: "Siatas" }, { name: "Snowman" }, { name: "Sharron" }, 
    { name: "Soniathrym" }, { name: "Suah" }, { name: "Susie" }, 
    { name: "Trissy" }, { name: "Will Auceptin" }, { name: "Xio Derecha" }, 
    { name: "Zaratul" }
];

let mode = localStorage.getItem("lotmdle_quote_mode") || "daily";
let currentQuote = null;
let answerName = "";

const grid = document.getElementById("grid");
const list = document.getElementById("list");
const searchInput = document.getElementById("searchInput");
const statusText = document.getElementById("statusText");
const attemptsText = document.getElementById("attemptsText");
const quoteText = document.getElementById("quoteText");
const dailyBtn = document.getElementById("dailyBtn");
const infiniteBtn = document.getElementById("infiniteBtn");

const endOverlay = document.getElementById("endOverlay");
const endTitle = document.getElementById("endTitle");
const endDesc = document.getElementById("endDesc");
const playAgainBtn = document.getElementById("playAgainBtn");
const closeOverlayBtn = document.getElementById("closeOverlayBtn");

function todayKey() {
  const d = new Date();
  const yyyy = d.getFullYear();
  const mm = String(d.getMonth() + 1).padStart(2, "0");
  const dd = String(d.getDate()).padStart(2, "0");
  return `${yyyy}-${mm}-${dd}`;
}

function dailyDoneKey() {
  return `lotmdle_quote_daily_done_${todayKey()}`;
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

function pickQuote() {
  if (!quotesData || quotesData.length === 0) return { text: "No quotes", name: "Error" };
  
  if (mode === "daily") {
      const idx = dailyIndex(todayKey(), quotesData.length);
      return quotesData[idx];
  } else {
      return quotesData[Math.floor(Math.random() * quotesData.length)];
  }
}

currentQuote = pickQuote();
answerName = currentQuote.name;

let attempts = 0;
const maxAttempts = 7;
let gameOver = false;
const usedNames = new Set();
let currentSuggestions = [];

function renderList(items) {
  if (!list) return;
  list.innerHTML = "";

  items.forEach(char => {
    const div = document.createElement("div");
    div.className = "list-item";
    div.innerHTML = `<span class="name">${char.name}</span>`;
    
    const key = char.name;
    if (usedNames.has(key) || gameOver) {
      div.classList.add("used");
      div.onclick = null;
    } else {
      div.onclick = () => {
        if (usedNames.has(char.name) || gameOver) return;
        makeGuess(char.name);
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
  if (!q) { closeList(); return; }

  currentSuggestions = characters
    .filter(c => c.name.toLowerCase().includes(q))
    .slice(0, 30);

  renderList(currentSuggestions);
  if (currentSuggestions.length > 0) openList();
  else closeList();
}

function updateStreak(won) {
    const streakKey = mode === "daily" ? "lotmdle_quote_daily_streak" : "lotmdle_quote_inf_streak";
    let current = parseInt(localStorage.getItem(streakKey)) || 0;

    if (won) {
        current++;
        localStorage.setItem(streakKey, current);
        
        let playerName = localStorage.getItem("lotmdle_player_name");
        if (!playerName) {
            setTimeout(() => {
                playerName = prompt("Congratulations! Write your nickname for the leaderboard:");
                if (playerName) {
                    if(playerName.length > 15) playerName = playerName.substring(0, 15);
                    localStorage.setItem("lotmdle_player_name", playerName);
                    const finalMode = mode === "daily" ? "daily_quote" : "inf_quote";
                    submitScore(playerName, current, finalMode);
                }
            }, 500);
        } else {
            const finalMode = mode === "daily" ? "daily_quote" : "inf_quote";
            submitScore(playerName, current, finalMode);
        }
    } else {
        localStorage.setItem(streakKey, 0);
    }
}

function showEndScreen(won) {
  endTitle.textContent = won ? "You got it!" : "Not quite!";
  endDesc.textContent = `Speaker: ${answerName}`;
  endOverlay.classList.remove("hidden");

  updateStreak(won);

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
  if (modeEl) modeEl.textContent = mode === "daily" ? "DAILY QUOTE" : "∞ QUOTE";
  
  const shareEl = document.getElementById("owShare");
  if(shareEl) shareEl.innerHTML = ""; 
}

function hideEndScreen() {
  endOverlay.classList.add("hidden");
}

function resetGame() {
  if (mode === "daily" && isDailyDone()) {
    statusText.textContent = "Daily completed. Come back tomorrow.";
    gameOver = true;
    grid.innerHTML = "";
    quoteText.textContent = `"${currentQuote.text}"`;
    hideEndScreen();
    return;
  }

  attempts = 0;
  usedNames.clear();
  gameOver = false;
  attemptsText.textContent = `Attempts: 0 / ${maxAttempts}`;
  statusText.textContent = "Who said this?";
  grid.innerHTML = "";
  
  currentQuote = pickQuote();
  answerName = currentQuote.name;
  quoteText.textContent = `"${currentQuote.text}"`;
  
  hideEndScreen();
  if(searchInput) searchInput.value = "";
}

function syncModeUI() {
  const isDaily = mode === "daily";
  dailyBtn.classList.toggle("is-active", isDaily);
  infiniteBtn.classList.toggle("is-active", !isDaily);
}

function setMode(newMode) {
  mode = newMode;
  localStorage.setItem("lotmdle_quote_mode", mode);
  resetGame();
  syncModeUI();
}

if(dailyBtn) dailyBtn.onclick = () => setMode("daily");
if(infiniteBtn) infiniteBtn.onclick = () => setMode("infinite");

syncModeUI();
resetGame();

if(playAgainBtn) playAgainBtn.onclick = resetGame;
if(closeOverlayBtn) closeOverlayBtn.onclick = hideEndScreen;

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
  
  if (name === answerName) {
      cell.classList.add("correct");
      statusText.textContent = `Correct! It was ${answerName}.`;
      gameOver = true;
      showEndScreen(true);
  } else {
      cell.classList.add("wrong");
      statusText.textContent = "Wrong speaker...";
  }
  
  row.appendChild(cell);
  grid.appendChild(row);
  
  attempts++;
  attemptsText.textContent = `Attempts: ${attempts} / ${maxAttempts}`;
  
  if (!gameOver && attempts >= maxAttempts) {
      statusText.textContent = `Game Over. It was ${answerName}.`;
      gameOver = true;
      showEndScreen(false);
  }
}

function openList() { list.classList.remove("hidden"); }
function closeList() { list.classList.add("hidden"); }

document.addEventListener("pointerdown", (e) => {
  if (!list || !searchInput) return;
  if (e.target !== searchInput && !list.contains(e.target)) closeList();
});

searchInput.addEventListener("focus", updateSuggestions);
searchInput.addEventListener("input", updateSuggestions);
searchInput.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
     const q = searchInput.value.trim().toLowerCase();
     const exact = characters.find(c => c.name.toLowerCase() === q);
     const pick = exact || currentSuggestions[0];
     if (pick) {
         makeGuess(pick.name);
         searchInput.value = "";
         closeList();
     }
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
}
setTheme(currentTheme);

if(themeBtn) themeBtn.onclick = (e) => { e.stopPropagation(); themeMenu.classList.toggle("hidden"); };
document.onclick = (e) => { if(!themeMenu.contains(e.target) && e.target !== themeBtn) themeMenu.classList.add("hidden"); };
themeOptions.forEach(opt => opt.onclick = () => { setTheme(opt.dataset.theme); themeMenu.classList.add("hidden"); });

const howBtn = document.getElementById("howBtn");
const howOverlay = document.getElementById("howOverlay");
const howClose = document.getElementById("howCloseBtn");
if(howBtn) howBtn.onclick = () => howOverlay.classList.remove("hidden");
if(howClose) howClose.onclick = () => howOverlay.classList.add("hidden");

const lbBtn = document.getElementById("leaderboardBtn");
const lbOverlay = document.getElementById("leaderboardOverlay");
const lbClose = document.getElementById("closeLeaderboard");
const lbDaily = document.getElementById("lbDailyBtn");
const lbInf = document.getElementById("lbInfBtn");
let lbMode = "daily_quote"; 

if(lbBtn) lbBtn.onclick = () => {
    lbOverlay.classList.remove("hidden");
    lbMode = mode === "daily" ? "daily_quote" : "inf_quote";
    loadLeaderboard(lbMode);
};
if(lbClose) lbClose.onclick = () => lbOverlay.classList.add("hidden");
if(lbDaily) lbDaily.onclick = () => { lbMode = "daily_quote"; loadLeaderboard(lbMode); };
if(lbInf) lbInf.onclick = () => { lbMode = "inf_quote"; loadLeaderboard(lbMode); };

const patchBtn = document.getElementById("patchBtn");
const patchOverlay = document.getElementById("patchOverlay");
const patchCloseBtn = document.getElementById("patchCloseBtn");
if (patchBtn && patchOverlay) {
    patchBtn.onclick = () => patchOverlay.classList.remove("hidden");
    patchCloseBtn.onclick = () => patchOverlay.classList.add("hidden");
    patchOverlay.onclick = (e) => { if (e.target === patchOverlay) patchOverlay.classList.add("hidden"); };
}
const feedbackBtn = document.getElementById("feedbackBtn");
const feedbackOverlay = document.getElementById("feedbackOverlay");
const feedbackCloseBtn = document.getElementById("feedbackCloseBtn");
if (feedbackBtn && feedbackOverlay) {
    feedbackBtn.onclick = () => feedbackOverlay.classList.remove("hidden");
    feedbackCloseBtn.onclick = () => feedbackOverlay.classList.add("hidden");
    feedbackOverlay.onclick = (e) => { if (e.target === feedbackOverlay) feedbackOverlay.classList.add("hidden"); };
}
