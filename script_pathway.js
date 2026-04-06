import { auth, submitScoreLoggedIn, loadLeaderboardLoggedIn, submitDailyResultLoggedIn } from "./leaderboard.js";
import { initTheme } from "./theme.js";

const pathways = [
  { name: "Fool", description: "This pathway represents the authority over history, time, change, and concealment. High-level Beyonders can summon Historical Void projections, perform terrifying miracles, and effortlessly fool fate, time, and history itself. Its sequences are often associated with divination, magic tricks, bizarre occurrences, shapeshifting, and the power to resurrect from the dead." },
  { name: "Door", description: "Known for the ultimate mastery over space, sealing, and wandering. Beyonders of this route can travel through the cosmos, record and replicate other people's Beyonder powers, and pass through any physical or conceptual barrier. They are scholars of the starry sky, masters of dimensional manipulation, and the ultimate escape artists." },
  { name: "Error", description: "The pathway of deception, time-theft, and paradoxes. Its Beyonders specialize in stealing powers, thoughts, destinies, and even the lifespans of others. They are swindlers of the highest order, capable of exploiting loopholes in the rules of the world, creating countless avatars, and parasitizing almost any existence." },
  { name: "Visionary", description: "This route revolves around the mind, dreams, and the power of imagination. Its followers can manipulate human consciousness, implant psychological cues, and eventually turn imagined things into reality. They orchestrate the tides of the times behind the scenes, treating the world as their personal theater where every development follows their script." },
  { name: "Tyrant", description: "The embodiment of extreme power, storms, oceans, and lightning. Followers of this route possess terrifying physical destruction capabilities, commanding the weather and dominating the seas. They are irascible, domineering, and often act as the absolute rulers of the sky and the oceans, singing songs that induce dread." },
  { name: "Sun", description: "A pathway of purification, light, and oaths. Its Beyonders are the nemesis of the undead and evil spirits, wielding holy light to cleanse corruption. They can create powerful buffs, enforce unbreakable contracts, unshadow any deceit, and eventually become a miniature sun that illuminates the darkness." },
  { name: "Darkness", description: "Associated with night, sleep, concealment, and serenity. Followers of this route can drag enemies into deep slumber, manipulate bad luck, and erase concepts from reality using absolute concealment. They find comfort in the dark, possess domain over soul manipulation, and hold authority over the resting dead." },
  { name: "Death", description: "The masters of the Underworld and spirits. They can command the undead, induce decay and death, and communicate directly with spirits. At higher levels, they become immortal entities, turning their surroundings into a realm of the dead where no living thing can survive, utilizing pale white flames to burn souls." },
  { name: "Red Priest", description: "The pathway of war, conspiracy, and destruction. Its Beyonders excel at provoking enemies, manipulating flames, and leading armies into battle. They turn every conflict into a fiery massacre, specializing in changing weather and environments, and gain their true power through warfare and the blood of their enemies." },
  { name: "Demoness", description: "A path of curses, plagues, and deadly allure. It fundamentally changes the gender of its followers to female at higher sequences. They manipulate black flames, frost, invisible threads, and devastating diseases, hiding extreme danger and apocalyptic calamities behind an incredibly beautiful and seductive appearance." },
  { name: "Black Emperor", description: "The embodiment of order, distortion, and loopholes. Beyonders here can distort physical rules, exploit the law, and enforce their own chaotic order upon the world. They use bribery and magnification of effects to their advantage, and as long as their nation and rules stand, they can continuously resurrect from their mausoleums." },
  { name: "Justiciar", description: "The strict enforcers of law and order. They can lay down absolute rules that all within a certain range must follow. They punish rule-breakers, prohibit specific actions, and rely on strict discipline. At the pinnacle, they become the embodiment of the world's rules, passing inevitable judgments upon their targets." },
  { name: "Hermit", description: "Deeply connected to esoteric knowledge, mystery, and hidden information. Followers can decipher complex magical rituals, peer into hidden truths, and use fairy tales or mystical knowledge as physical attacks. They are the ultimate sages of mysticism, but are constantly threatened by the madness of raw, corrupted knowledge." },
  { name: "Paragon", description: "The pathway of machinery, alchemy, and civilization. Its Beyonders have absolute understanding of tools, physics, and creation. They can infuse life into machines, create miraculous artifacts, flawlessly recall any information, and push the boundaries of technological and mystical enlightenment beyond mortal comprehension." },
  { name: "Mother", description: "The origin of life, nature, and mutation. Beyonders of this route can command plants, breed terrifying biological mutations, and manipulate the flesh and blood of all living creatures. They represent both the nurturing aspect of creation and the terrifying, grotesque sides of raw, unrestrained life and cross-breeding." },
  { name: "Moon", description: "Tied to vampires, spirituality, and life force. Followers possess immense vitality, mastery over potions, and the ability to control darkness and the moon's phases. They excel in healing and herbalism, but can also use curses, blood manipulation, and summon corrupted crimson moonlight." },
  { name: "Wheel of Fortune", description: "The most unique pathway, revolving entirely around luck, probability, and fate. Its followers are monsters of luck, capable of predicting the future, manipulating fortune, and continuously reincarnating to accumulate power. They do not rely on direct combat, but let the terrifying weight of fate destroy their enemies." },
  { name: "Chained", description: "A pathway of extreme temperance, curses, and monstrous transformations. Followers often appear as zombies, wraiths, or puppets. They suppress their darkest desires to gain power, but can unleash them to transform into horrifying, uncontrollable monsters, utilizing absolute malicious malice and curses." },
  { name: "Abyss", description: "The epitome of pure evil, corruption, and demonic desires. Followers are capable of sensing extreme danger, using foul language to curse enemies, and manipulating lava and the abyss itself. They transform into genuine devils, committing atrocious acts and utilizing absolute malice to corrupt everything around them." },
  { name: "Hanged Man", description: "Associated with flesh, secrets, and degeneration. Its Beyonders can manipulate shadows, corrupt the environment, and use their own flesh and blood for terrifying magical effects. They thrive in the shadows, graze on the souls of others to steal their powers, and embrace the ultimate depravity." },
  { name: "Twilight Giant", description: "The pinnacle of physical combat, decay, and dusk. Followers are heavily armored warriors, wielding giant broadswords and the power of twilight, which accelerates decay and the end of all things. They are unmatched in close combat, utilizing dawn light and absolute physical defenses to crush opposition." },
  { name: "White Tower", description: "The pathway of omniscience, prophecy, and imitation. Beyonders here can analyze and replicate almost any Beyonder ability they witness. They are ultimate scholars who predict the future, decipher the enemy's weaknesses through deduction, and use raw knowledge and mental manipulation as their absolute weapons." }
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
let descriptionSegments = [];
let segmentRevealOrder = [];
let revealedSegmentsCount = 0;

function updateSuggestions() {
  if (!list || !searchInput) return;
  const q = searchInput.value.trim().toLowerCase();
  
  if (!q) {
    closeList();
    return;
  }

  let matched = pathways.filter(p => p.name.toLowerCase().includes(q));

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

function dailySaveKey() { return `lotmdle_pathway_dailysave_${todayKey()}`; }
function dailyDoneKey() { return `lotmdle_pathway_daily_done_${todayKey()}`; }

function isDailyDone() { return localStorage.getItem(dailyDoneKey()) === "1"; }
function setDailyDone() { localStorage.setItem(dailyDoneKey(), "1"); }

function saveDailyState() {
  if (!currentPuzzle) return;
  const state = {
    attempts,
    gameOver,
    usedNames: Array.from(usedNames)
  };
  localStorage.setItem(dailySaveKey(), JSON.stringify(state));
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

function dailyIndex(key, size) {
  const rand = mulberry32(hash32(key));
  return Math.floor(rand() * size);
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
  if (!pathways || pathways.length === 0) return { name: "Error", description: "Error loading pathway." };
  return pathways[dailyIndex(todayKey(), pathways.length)];
}

function setupDescriptionForCurrentPuzzle() {
  const desc = currentPuzzle?.description || "";
  const words = desc.split(" ");
  const numSegments = maxAttempts; 
  
  descriptionSegments = [];
  for (let i = 0; i < numSegments; i++) {
    const start = Math.floor((i * words.length) / numSegments);
    const end = Math.floor(((i + 1) * words.length) / numSegments);
    descriptionSegments.push(words.slice(start, end));
  }

  const indices = Array.from({ length: numSegments }, (_, i) => i);
  segmentRevealOrder = seededShuffle(indices, `${todayKey()}|${currentPuzzle?.name || ""}`);
  revealedSegmentsCount = 0;
}

function renderDescription() {
  if (!emotesText) return;
  
  let out = [];
  let lastHidden = false;
  const visibleIndices = new Set(segmentRevealOrder.slice(0, revealedSegmentsCount));

  for (let i = 0; i < descriptionSegments.length; i++) {
    if (visibleIndices.has(i)) {
      out.push(descriptionSegments[i].join(" "));
      lastHidden = false;
    } else {
      if (!lastHidden) {
        out.push("[...]");
        lastHidden = true;
      }
    }
  }
  
  emotesText.textContent = `"${out.join(" ")}"`;
  emotesText.style.fontSize = "1.0rem"; 
  emotesText.style.fontWeight = "400";
  emotesText.style.fontStyle = "italic";
  emotesText.style.lineHeight = "1.6";
  emotesText.style.padding = "0 10px";
}

function revealMoreWords() {
  if (revealedSegmentsCount >= maxAttempts) return false;
  revealedSegmentsCount++;
  renderDescription();
  return true;
}

function revealAllWords() {
  revealedSegmentsCount = maxAttempts;
  renderDescription();
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
function dailyWinRecordedKeyPathway() {
  const uid = auth?.currentUser?.uid || "guest";
  return `lotmdle_pathway_dailywin_${todayKey()}_${uid}`;
}

async function updateStreak(won) {
  const streakKey = streakKeyPathwayDaily();
  let current = parseInt(localStorage.getItem(streakKey) || "0", 10);
  const winKey = dailyWinRecordedKeyPathway();
  
  const alreadyWonToday = localStorage.getItem(winKey) === "1";

  if (won) {
    if (!alreadyWonToday) {
      current++;
      localStorage.setItem(streakKey, String(current));
      localStorage.setItem(winKey, "1");
    }
  } else {
    if (!alreadyWonToday) {
      localStorage.setItem(streakKey, "0");
    }
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

  revealAllWords();
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
                  currentStreakAfter: current,
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
        if (navigator.clipboard && navigator.clipboard.writeText) {
          await navigator.clipboard.writeText(shareText);
        } else {
          const textArea = document.createElement("textarea");
          textArea.value = shareText;
          document.body.appendChild(textArea);
          textArea.select();
          document.execCommand("copy");
          document.body.removeChild(textArea);
        }
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

  setupDescriptionForCurrentPuzzle();

  if (grid) grid.innerHTML = "";
  if (searchInput) searchInput.value = "";
  closeList();

  const savedState = loadDailyState();
  if (savedState) {
    attempts = savedState.attempts || 0;
    gameOver = !!savedState.gameOver;
    usedNames = new Set(savedState.usedNames || []);

    if (grid) {
      usedNames.forEach(name => {
        const row = document.createElement("div");
        row.className = "row";
        row.style.gridTemplateColumns = "1fr";

        const cell = document.createElement("div");
        cell.className = "cell";
        cell.textContent = name;
        
        if (name === currentPuzzle?.name) {
          cell.classList.add("correct");
        } else {
          cell.classList.add("wrong");
        }
        row.appendChild(cell);
        grid.appendChild(row);
      });
    }
  }

  if (isDailyDone() || gameOver) {
    gameOver = true;
    if (statusText) statusText.textContent = "Daily completed. Come back tomorrow.";
    if (attemptsText) attemptsText.textContent = `Attempts: ${attempts} / ${maxAttempts}`;
    revealAllWords();
    return;
  }

  if (statusText) statusText.textContent = "Which Pathway is this?";
  if (attemptsText) attemptsText.textContent = `Attempts: ${attempts} / ${maxAttempts}`;

  if (savedState) {
    revealedSegmentsCount = Math.min(attempts, maxAttempts - 1);
  } else {
    revealedSegmentsCount = 0;
  }
  
  revealMoreWords();
  saveDailyState();
}

function makeGuess(name) {
  if (gameOver || attempts >= maxAttempts) return;
  if (usedNames.has(name)) return;

  usedNames.add(name);
  attempts++;

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
    if (attemptsText) attemptsText.textContent = `Attempts: ${attempts} / ${maxAttempts}`;

    row.appendChild(cell);
    if (grid) grid.appendChild(row);

    gameOver = true;
    saveDailyState();
    showEndScreen(true);
    return;
  }

  cell.classList.add("wrong");
  if (statusText) statusText.textContent = "Wrong pathway...";

  row.appendChild(cell);
  if (grid) grid.appendChild(row);

  if (attemptsText) attemptsText.textContent = `Attempts: ${attempts} / ${maxAttempts}`;

  revealMoreWords();

  if (attempts >= maxAttempts) {
    if (statusText) statusText.textContent = `Game Over. It was ${currentPuzzle?.name || "???"}.`;
    gameOver = true;
    saveDailyState();
    showEndScreen(false);
    return;
  }

  saveDailyState();
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