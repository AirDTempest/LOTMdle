import { auth, submitScoreLoggedIn, loadLeaderboardLoggedIn, submitDailyResultLoggedIn } from "./leaderboard.js";
import { initTheme } from "./theme.js";

const characters = [
  { name: "Ancient Sun God", age: "Pre-Epoch", gender: "Male", pathway: "Visionary, Sun, Tyrant, White Tower, Hanged Man", sequence: "Above the Sequences", factions: ["Eastern Continent", "Forsaken Land of the Gods", "City of Silver", "Rose Redemption"], firstChapter: "114", diff: "normal" },
  { name: "Celestial Worthy (Lord of the Mysteries)", age: "Pre-Epoch", gender: "Male", pathway: "Fool, Error, Door", sequence: "Above the Sequences", factions: ["Cosmos", "Sefirah Castle"], firstChapter: "1368", diff: "normal" },
  { name: "Adam", age: "3rd Epoch", gender: "Male", pathway: "Visionary", sequence: "Above the Sequences", factions: ["Twilight Hermit Order", "Psychology Alchemists", "King of Angels", "Forsaken Land of the Gods"], firstChapter: "448", diff: "easy" },
  { name: "Salinger", age: "2nd Epoch", gender: "Male", pathway: "Death", sequence: "Above the Sequences", factions: ["Balam Empire", "Underworld", "Southern Continent"], firstChapter: "14", diff: "normal" },
  { name: "True Creator", age: "3rd Epoch", gender: "Male", pathway: "Hanged Man", sequence: "0", factions: ["Aurora Order", "Forsaken Land of the Gods"], firstChapter: "17", diff: "easy" },
  { name: "Cheek (Primordial Demoness)", age: "3rd Epoch", gender: "Female", pathway: "Demoness", sequence: "0", factions: ["Demoness Sect", "Underworld"], firstChapter: "89", diff: "normal" },
  { name: "God of Steam and Machinery", age: "4th Epoch", gender: "Male", pathway: "Paragon", sequence: "0", factions: ["Church of the God of Steam and Machinery", "Intis Republic", "Loen Kingdom"], firstChapter: "89", diff: "normal" },
  { name: "Alista Tudor", age: "4th Epoch", gender: "Male", pathway: "Red Priest", sequence: "0", factions: ["Demoness Sect", "Tudor Empire"], firstChapter: "9", diff: "normal" },
  { name: "Solomon", age: "4th Epoch", gender: "Male", pathway: "Black Emperor", sequence: "0", factions: ["Solomon Empire", "Northern Continent"], firstChapter: "131", diff: "normal" },
  { name: "Trunsoest", age: "4th Epoch", gender: "Male", pathway: "Justiciar", sequence: "0", factions: ["Trunsoest Empire", "Northern Continent"], firstChapter: "131", diff: "normal" },
  { name: "Badheil", age: "2nd Epoch", gender: "Male", pathway: "Twilight Giant", sequence: "0", factions: ["Church of Combat", "Feysac Empire"], firstChapter: "13", diff: "normal" },
  { name: "Eternal Blazing Sun", age: "3rd Epoch", gender: "Male", pathway: "Sun", sequence: "0", factions: ["Rose Redemption"], firstChapter: "3", diff: "normal" },
  { name: "Evernight Goddess", age: "2nd Epoch", gender: "Female", pathway: "Darkness", sequence: "0", factions: ["Rose Redemption", "Church of Evernight Goddess"], firstChapter: "3", diff: "easy" },
  { name: "Flegrea", age: "2nd Epoch", gender: "Male", pathway: "Darkness", sequence: "0", factions: ["None"], firstChapter: "32", diff: "normal" },
  { name: "God of Knowledge and Wisdom", age: "2nd Epoch", gender: "Male", pathway: "White Tower", sequence: "0", factions: ["Rose Redemption"], firstChapter: "3", diff: "normal" },
  { name: "Hidden Sage", age: "5th Epoch", gender: "Male", pathway: "Hermit", sequence: "0", factions: ["Moses Ascetic Order"], firstChapter: "164", diff: "normal" },
  { name: "Lilith", age: "2nd Epoch", gender: "Female", pathway: "Mother", sequence: "0", factions: ["Sanguines"], firstChapter: "3", diff: "normal" },
  { name: "Lord of Storms", age: "3rd Epoch", gender: "Male", pathway: "Tyrant", sequence: "0", factions: ["Rose Redemption"], firstChapter: "3", diff: "normal" },
  { name: "Roselle Gustav", age: "5th Epoch", gender: "Male", pathway: "Black Emperor", sequence: "0", factions: ["Transmigrator", "Twilight Hermit Order"], firstChapter: "4", diff: "easy" },
  { name: "Gregrace", age: "2nd Epoch", gender: "Female", pathway: "Death", sequence: "0", factions: ["Underworld", "Caldern City", "River of Eternal Darkness"], firstChapter: "1368", diff: "normal" },
  { name: "Soniathrym", age: "2nd Epoch", gender: "Male", pathway: "Tyrant", sequence: "0", factions: ["Elves"], firstChapter: "313", diff: "normal" },
  { name: "Zhou Mingrui", age: "Pre-Epoch", gender: "Male", pathway: "None", sequence: "None", factions: ["Modern China"], firstChapter: "1", diff: "easy" },
  { name: "Klein Moretti", age: "5th Epoch", gender: "Male", pathway: "Fool", sequence: "8", factions: ["Nighthawks", "Loen Kingdom", "Khoy University", "Tarot Club", "Transmigrator"], firstChapter: "1", diff: "easy" },
  { name: "Sherlock Moriarty", age: "5th Epoch", gender: "Male", pathway: "Fool", sequence: "6", factions: ["Loen Kingdom", "Backlund City", "Tarot Club", "The Fool's Blessed"], firstChapter: "214", diff: "easy" },
  { name: "Hero Bandit Black Emperor", age: "5th Epoch", gender: "Male", pathway: "Fool", sequence: "7", factions: ["Loen Kingdom", "Tarot Club", "The Fool's Blessed"], firstChapter: "443", diff: "easy" },
  { name: "Gehrman Sparrow", age: "5th Epoch", gender: "Male", pathway: "Fool", sequence: "1", factions: ["Rorsted Archipelago", "Tarot Club", "The Fool's Blessed", "Treasure Hunter"], firstChapter: "483", diff: "easy" },
  { name: "Dwayne Dantès", age: "5th Epoch", gender: "Male", pathway: "Fool", sequence: "4", factions: ["Southern Continent", "Backlund City", "Tarot Club"], firstChapter: "783", diff: "easy" },
  { name: "Merlin Hermes", age: "5th Epoch", gender: "Male", pathway: "Fool", sequence: "2", factions: ["Intis Republic", "Tarot Club", "The Fool's Blessed"], firstChapter: "1276", diff: "easy" },
  { name: "The Fool", age: "5th Epoch", gender: "Male", pathway: "Fool, Error, Door", sequence: "Above the Sequences", factions: ["Tarot Club", "The Gray Fog", "Church of the Fool"], firstChapter: "7", diff: "easy" },
  { name: "Alger Wilson", age: "5th Epoch", gender: "Male", pathway: "Tyrant", sequence: "3", factions: ["Tarot Club", "Church of Storms", "Church of the Fool"], firstChapter: "5", diff: "easy" },
  { name: "Audrey Hall", age: "5th Epoch", gender: "Female", pathway: "Visionary", sequence: "3", factions: ["Loen Kingdom Aristocracy", "Tarot Club", "Psychology Alchemists", "Church of Evernight Goddess"], firstChapter: "5", diff: "easy" },
  { name: "Derrick Berg", age: "5th Epoch", gender: "Male", pathway: "Sun", sequence: "4", factions: ["Tarot Club", "City of Silver", "Church of the Fool"], firstChapter: "95", diff: "easy" },
  { name: "Fors Wall", age: "5th Epoch", gender: "Female", pathway: "Door", sequence: "4", factions: ["Tarot Club", "Church of the Fool", "Abraham Family"], firstChapter: "107", diff: "easy" },
  { name: "Xio Derecha", age: "5th Epoch", gender: "Female", pathway: "Justiciar", sequence: "4", factions: ["Tarot Club"], firstChapter: "107", diff: "easy" },
  { name: "Emlyn White", age: "5th Epoch", gender: "Male", pathway: "Moon", sequence: "4", factions: ["Tarot Club", "Sanguines"], firstChapter: "315", diff: "easy" },
  { name: "Cattleya", age: "5th Epoch", gender: "Female", pathway: "Hermit", sequence: "3", factions: ["Tarot Club", "Moses Ascetic Order"], firstChapter: "294", diff: "easy" },
  { name: "Leonard Mitchell", age: "5th Epoch", gender: "Male", pathway: "Darkness", sequence: "4", factions: ["Tarot Club", "Church of Evernight Goddess", "Nighthawks", "Red Gloves"], firstChapter: "10", diff: "easy" },
  { name: "Amon", age: "3rd Epoch", gender: "Male", pathway: "Error", sequence: "2", factions: ["King of Angels"], firstChapter: "60", diff: "easy" },
  { name: "Anderson Hood", age: "5th Epoch", gender: "Male", pathway: "Red Priest", sequence: "5", factions: ["Treasure Hunter", "The Five Seas"], firstChapter: "650", diff: "normal" },
  { name: "Anthony Stevenson", age: "5th Epoch", gender: "Male", pathway: "Darkness", sequence: "3", factions: ["Church of Evernight Goddess"], firstChapter: "474", diff: "normal" },
  { name: "Antigonus", age: "2nd Epoch", gender: "Male", pathway: "Fool", sequence: "2", factions: ["Solomon Empire", "Church of Evernight Goddess"], firstChapter: "1381", diff: "normal" },
  { name: "Arianna", age: "5th Epoch", gender: "Female", pathway: "Darkness", sequence: "2", factions: ["Church of Evernight Goddess"], firstChapter: "950", diff: "normal" },
  { name: "Azik Eggers", age: "4th Epoch", gender: "Male", pathway: "Death", sequence: "2", factions: ["Church of the Fool"], firstChapter: "9", diff: "easy" },
  { name: "Bernadette Gustav", age: "5th Epoch", gender: "Female", pathway: "Hermit", sequence: "2", factions: ["Emerald City"], firstChapter: "321", diff: "normal" },
  { name: "Bethel Abraham", age: "4th Epoch", gender: "Male", pathway: "Door", sequence: "1", factions: ["Abraham Family", "King of Angels"], firstChapter: "216", diff: "normal" },
  { name: "Chained God", age: "4th Epoch", gender: "Male", pathway: "Chained", sequence: "1", factions: ["Rose Redemption"], firstChapter: "180", diff: "normal" },
  { name: "Colin Iliad", age: "5th Epoch", gender: "Male", pathway: "Twilight Giant", sequence: "3", factions: ["City of Silver"], firstChapter: "219", diff: "normal" },
  { name: "Cohinem", age: "2nd Epoch", gender: "Female", pathway: "Tyrant", sequence: "2", factions: ["Elves"], firstChapter: "549", diff: "normal" },
  { name: "Daly Simone", age: "5th Epoch", gender: "Female", pathway: "Death", sequence: "5", factions: ["Nighthawks", "Red Gloves"], firstChapter: "17", diff: "easy" },
  { name: "Danitz Dubois", age: "5th Epoch", gender: "Male", pathway: "Red Priest", sequence: "6", factions: ["Treasure Hunter", "Church of the Fool"], firstChapter: "499", diff: "normal" },
  { name: "Dorian Gray Abraham", age: "5th Epoch", gender: "Male", pathway: "Door", sequence: "7", factions: ["Abraham Family"], firstChapter: "404", diff: "normal" },
  { name: "Dunn Smith", age: "5th Epoch", gender: "Male", pathway: "Darkness", sequence: "7", factions: ["Nighthawks", "Church of Evernight Goddess"], firstChapter: "10", diff: "easy" },
  { name: "Frank Lee", age: "5th Epoch", gender: "Male", pathway: "Mother", sequence: "5", factions: ["None"], firstChapter: "638", diff: "normal" },
  { name: "Frye", age: "5th Epoch", gender: "Male", pathway: "Death", sequence: "7", factions: ["Nighthawks"], firstChapter: "45", diff: "normal" },
  { name: "Hermes", age: "2nd Epoch", gender: "Male", pathway: "Visionary", sequence: "2", factions: ["Psychology Alchemists", "Twilight Hermit Order"], firstChapter: "484", diff: "normal" },
  { name: "Ince Zangwill", age: "5th Epoch", gender: "Male", pathway: "Darkness", sequence: "4", factions: ["Church of Evernight Goddess"], firstChapter: "19", diff: "normal" },
  { name: "Katarina Pelle", age: "4th Epoch", gender: "Female", pathway: "Demoness", sequence: "3", factions: ["Demoness Sect"], firstChapter: "199", diff: "normal" },
  { name: "Lanevus", age: "5th Epoch", gender: "Male", pathway: "Error", sequence: "8", factions: ["Aurora Order", "True Creator Faction"], firstChapter: "46", diff: "normal" },
  { name: "Lovia Tiffany", age: "5th Epoch", gender: "Female", pathway: "Hanged Man", sequence: "4", factions: ["City of Silver"], firstChapter: "202", diff: "normal" },
  { name: "Maric", age: "5th Epoch", gender: "Male", pathway: "Chained", sequence: "5", factions: ["Church of the Fool", "Rose School"], firstChapter: "233", diff: "normal" },
  { name: "Medici", age: "3rd Epoch", gender: "Male", pathway: "Red Priest", sequence: "1", factions: ["King of Angels", "Rose Redemption"], firstChapter: "486", diff: "easy" },
  { name: "Mobet Zoroast", age: "4th Epoch", gender: "Male", pathway: "Error", sequence: "5", factions: ["Groselle's Travels", "Elves"], firstChapter: "697", diff: "normal" },
  { name: "Old Neil", age: "5th Epoch", gender: "Male", pathway: "Hermit", sequence: "9", factions: ["Nighthawks"], firstChapter: "25", diff: "easy" },
  { name: "Ouroboros", age: "3rd Epoch", gender: "Male", pathway: "Wheel of Fortune", sequence: "1", factions: ["King of Angels", "Aurora Order", "Rose Redemption"], firstChapter: "466", diff: "normal" },
  { name: "Pallez Zoroast", age: "4th Epoch", gender: "Male", pathway: "Error", sequence: "2", factions: ["Church of the Fool"], firstChapter: "609", diff: "normal" },
  { name: "Reinette Tinekerr", age: "4th Epoch", gender: "Female", pathway: "Chained", sequence: "2", factions: ["Church of the Fool", "Rose School"], firstChapter: "547", diff: "normal" },
  { name: "Sasir", age: "3rd Epoch", gender: "Male", pathway: "Hanged Man", sequence: "1", factions: ["King of Angels", "Rose Redemption"], firstChapter: "666", diff: "normal" },
  { name: "Siatas", age: "2nd Epoch", gender: "Female", pathway: "Tyrant", sequence: "5", factions: ["Groselle's Travels", "Elves"], firstChapter: "696", diff: "normal" },
  { name: "Snowman", age: "3rd Epoch", gender: "Male", pathway: "Sun", sequence: "5", factions: ["Groselle's Travels"], firstChapter: "697", diff: "normal" },
  { name: "Sharron", age: "5th Epoch", gender: "Female", pathway: "Chained", sequence: "4", factions: ["Church of the Fool", "Rose School"], firstChapter: "246", diff: "normal" },
  { name: "Suah", age: "4th Epoch", gender: "Male", pathway: "Chained", sequence: "1", factions: ["Church of the Fool", "Rose School"], firstChapter: "729", diff: "normal" },
  { name: "Susie", age: "5th Epoch", gender: "Female", pathway: "Visionary", sequence: "5", factions: ["None"], firstChapter: "36", diff: "normal" },
  { name: "Trissy", age: "5th Epoch", gender: "Female", pathway: "Demoness", sequence: "4", factions: ["Demoness Sect", "Theosophy Order", "Iron and Blood Cross Order"], firstChapter: "56", diff: "normal" },
  { name: "Will Auceptin", age: "5th Epoch", gender: "Male", pathway: "Wheel of Fortune", sequence: "1", factions: ["Church of the Fool"], firstChapter: "326", diff: "easy" },
  { name: "Zaratul", age: "4th Epoch", gender: "Male", pathway: "Fool", sequence: "2", factions: ["Secret Order"], firstChapter: "59", diff: "normal" },
  { name: "Ilya", age: "5th Epoch", gender: "Female", pathway: "Darkness", sequence: "3", factions: ["Church of Evernight Goddess"], firstChapter: "885", diff: "hard" },
  { name: "Selena", age: "3rd Epoch", gender: "Female", pathway: "Darkness", sequence: "4", factions: ["Church of Evernight Goddess"], firstChapter: "109", diff: "hard" },
  { name: "Crestet Cesimir", age: "5th Epoch", gender: "Male", pathway: "Darkness", sequence: "4", factions: ["Church of Evernight Goddess"], firstChapter: "166", diff: "hard" },
  { name: "Melissa Moretti", age: "5th Epoch", gender: "Female", pathway: "Paragon", sequence: "9", factions: ["Tingen Technical School", "Church of Evernight Goddess", "Church of the Fool", "Loen Kingdom"], firstChapter: "1", diff: "easy" },
  { name: "Daxter Goudreau", age: "5th Epoch", gender: "Male", pathway: "Visionary", sequence: "8", factions: ["Psychology Alchemists", "Tingen Asylum", "Loen Kingdom"], firstChapter: "53", diff: "hard" },
  { name: "Madam Sharon", age: "5th Epoch", gender: "Female", pathway: "Demoness", sequence: "6", factions: ["Demoness Sect", "Loen Kingdom"], firstChapter: "116", diff: "hard" },
  { name: "Qilangos", age: "5th Epoch", gender: "Male", pathway: "Tyrant", sequence: "6", factions: ["Sonia Sea", "Pirate Faction", "Twilight Hermit Order"], firstChapter: "56", diff: "hard" },
  { name: "Ray Bieber", age: "5th Epoch", gender: "Male", pathway: "Fool", sequence: "9", factions: ["Bieber Family", "Antigonus Family", "Loen Kingdom"], firstChapter: "15", diff: "hard" },
  { name: "Hood Eugen", age: "5th Epoch", gender: "Male", pathway: "Visionary", sequence: "7", factions: ["Psychology Alchemists", "Tingen Asylum", "Loen Kingdom"], firstChapter: "67", diff: "hard" },
  { name: "George III", age: "5th Epoch", gender: "Male", pathway: "Black Emperor", sequence: "1", factions: ["Loen Kingdom", "Augustus Family"], firstChapter: "5", diff: "normal" },
  { name: "Pallas Negan", age: "5th Epoch", gender: "Male", pathway: "Tyrant", sequence: "3", factions: ["Loen Kingdom", "House Negan", "Conservative Party", "Church of Storms"], firstChapter: "18", diff: "hard" },
  { name: "Alfred Hall", age: "5th Epoch", gender: "Male", pathway: "Justiciar", sequence: "5", factions: ["Loen Kingdom", "Hall Family", "Loen Military"], firstChapter: "18", diff: "hard" },
  { name: "Father Utravsky", age: "5th Epoch", gender: "Male", pathway: "Twilight Giant", sequence: "6", factions: ["Church of Earth Mother", "Harvest Church", "Feynapotter Kingdom", "Loen Kingdom"], firstChapter: "256", diff: "normal" },
  { name: "Isengard Stanton", age: "5th Epoch", gender: "Male", pathway: "White Tower", sequence: "7", factions: ["Church of the God of Knowledge and Wisdom", "Loen Kingdom"], firstChapter: "305", diff: "normal" },
  { name: "Rosago", age: "5th Epoch", gender: "Male", pathway: "Fool", sequence: "5", factions: ["Intis Republic", "Secret Order"], firstChapter: "252", diff: "hard" },
  { name: "Patrick Jason Beria", age: "5th Epoch", gender: "Male", pathway: "Abyss", sequence: "5", factions: ["Beria Family", "Blood Sanctify Sect"], firstChapter: "414", diff: "hard" },
  { name: "Ernes Boyar", age: "5th Epoch", gender: "Male", pathway: "Moon", sequence: "5", factions: ["Sanguines", "Church of Earth Mother", "Loen Kingdom"], firstChapter: "342", diff: "hard" },
  { name: "Mr. A", age: "5th Epoch", gender: "Male", pathway: "Hanged Man", sequence: "5", factions: ["Aurora Order", "Loen Kingdom"], firstChapter: "216", diff: "hard" },
  { name: "Steve", age: "5th Epoch", gender: "Male", pathway: "Chained", sequence: "5", factions: ["Rose School of Thought", "Indulgence Faction", "Southern Continent"], firstChapter: "331", diff: "hard" },
  { name: "Sauron-Einhorn-Medici", age: "2nd Epoch", gender: "Male", pathway: "Red Priest", sequence: "1", factions: ["Rose Redemption", "King of Angels", "Tudor Empire"], firstChapter: "296", diff: "hard" },
  { name: "Cosmi Odora", age: "5th Epoch", gender: "Male", pathway: "Moon", sequence: "5", factions: ["Sanguines", "Loen Kingdom"], firstChapter: "327", diff: "hard" },
  { name: "Helene Florent", age: "5th Epoch", gender: "Female", pathway: "Red Priest", sequence: "8", factions: ["Intis Republic", "Florent Family", "Black Death"], firstChapter: "488", diff: "hard" },
  { name: "Steel Maveti", age: "5th Epoch", gender: "Male", pathway: "Chained", sequence: "6", factions: ["Admiral of Blood's Fleet", "Rose School of Thought"], firstChapter: "523", diff: "hard" },
  { name: "Edwina Edwards", age: "5th Epoch", gender: "Female", pathway: "White Tower", sequence: "5", factions: ["Golden Dream", "Church of the God of Knowledge and Wisdom", "Lenburg"], firstChapter: "526", diff: "hard" },
  { name: "Kalvetua", age: "5th Epoch", gender: "Male", pathway: "Tyrant", sequence: "3", factions: ["Loen Kingdom", "Bayam"], firstChapter: "551", diff: "hard" },
  { name: "Tracy", age: "5th Epoch", gender: "Female", pathway: "Demoness", sequence: "5", factions: ["Disease Maiden's Crew", "Demoness Sect", "The Five Seas"], firstChapter: "581", diff: "hard" },
  { name: "Mithor King", age: "5th Epoch", gender: "Male", pathway: "Black Emperor", sequence: "6", factions: ["Disease Maiden's Crew", "The Five Seas"], firstChapter: "598", diff: "hard" },
  { name: "Groselle", age: "2nd Epoch", gender: "Male", pathway: "Twilight Giant", sequence: "5", factions: ["Giant King's Court", "Groselle's Travels"], firstChapter: "664", diff: "hard" },
  { name: "Frunziar Edward", age: "5th Epoch", gender: "Male", pathway: "Justiciar", sequence: "6", factions: ["Loen Kingdom", "Loen Military", "Groselle's Travels"], firstChapter: "664", diff: "hard" },
  { name: "Uranos", age: "2nd Epoch", gender: "Male", pathway: "Visionary", sequence: "3", factions: ["Groselle's Travels"], firstChapter: "665", diff: "hard" },
  { name: "Ludwell", age: "5th Epoch", gender: "Male", pathway: "Death", sequence: "5", factions: ["Pirate Admiral", "Numinous Episcopate"], firstChapter: "658", diff: "hard" },
  { name: "Senor", age: "5th Epoch", gender: "Male", pathway: "Chained", sequence: "5", factions: ["Southern Continent", "Rose School of Thought", "Admiral of Blood's Fleet"], firstChapter: "692", diff: "hard" },
  { name: "Shanks", age: "5th Epoch", gender: "Male", pathway: "Chained", sequence: "4", factions: ["Rose School of Thought", "Southern Continent"], firstChapter: "725", diff: "hard" },
  { name: "Havin Rambis", age: "5th Epoch", gender: "Male", pathway: "Visionary", sequence: "4", factions: ["Loen Kingdom", "Psychology Alchemists", "King George III's Faction"], firstChapter: "763", diff: "hard" },
  { name: "Hazel Macht", age: "5th Epoch", gender: "Female", pathway: "Error", sequence: "8", factions: ["Loen Kingdom", "Macht Family"], firstChapter: "734", diff: "hard" },
  { name: "Shermane", age: "5th Epoch", gender: "Female", pathway: "Demoness", sequence: "7", factions: ["Demoness Sect", "Loen Kingdom"], firstChapter: "766", diff: "hard" },
  { name: "Viscount Stratford", age: "5th Epoch", gender: "Male", pathway: "Justiciar", sequence: "5", factions: ["Loen Kingdom", "Royal Guards", "King George III's Faction"], firstChapter: "768", diff: "hard" },
  { name: "Enzo", age: "5th Epoch", gender: "Male", pathway: "Wheel of Fortune", sequence: "5", factions: ["Southern Continent", "Life School of Thought"], firstChapter: "909", diff: "hard" },
  { name: "Lucca Brewster", age: "5th Epoch", gender: "Male", pathway: "White Tower", sequence: "4", factions: ["West Balam", "Church of the God of Knowledge and Wisdom"], firstChapter: "953", diff: "hard" },
  { name: "Klarman", age: "5th Epoch", gender: "Male", pathway: "Death", sequence: "4", factions: ["West Balam", "Numinous Episcopate"], firstChapter: "968", diff: "hard" },
  { name: "Sia Palenque Eggers", age: "5th Epoch", gender: "Female", pathway: "Death", sequence: "2", factions: ["Southern Continent", "Numinous Episcopate"], firstChapter: "973", diff: "hard" },
  { name: "Qonas Kilgor", age: "5th Epoch", gender: "Male", pathway: "Black Emperor", sequence: "4", factions: ["Loen Kingdom", "MI9"], firstChapter: "1017", diff: "hard" },
  { name: "Grove Augustus", age: "5th Epoch", gender: "Male", pathway: "Justiciar", sequence: "3", factions: ["Loen Kingdom", "Augustus Family"], firstChapter: "1030", diff: "hard" },
  { name: "Archbishop Randall", age: "5th Epoch", gender: "Male", pathway: "Tyrant", sequence: "3", factions: ["Loen Kingdom", "Church of Storms"], firstChapter: "1030", diff: "hard" },
  { name: "Mistral Odora", age: "5th Epoch", gender: "Male", pathway: "Moon", sequence: "4", factions: ["Loen Kingdom", "Sanguines", "Odora Family"], firstChapter: "1059", diff: "hard" },
  { name: "William Augustus I", age: "4th Epoch", gender: "Male", pathway: "Justiciar", sequence: "1", factions: ["Loen Kingdom", "Augustus Family"], firstChapter: "1148", diff: "hard" },
  { name: "Murskogan", age: "2nd Epoch", gender: "Male", pathway: "Twilight Giant", sequence: "3", factions: ["Giant King's Court", "Court Chasers"], firstChapter: "1120", diff: "hard" },
  { name: "Bladel", age: "2nd Epoch", gender: "Male", pathway: "Twilight Giant", sequence: "2", factions: ["Giant King's Court", "Forsaken Land of the Gods"], firstChapter: "1166", diff: "hard" },
  { name: "Kotar", age: "2nd Epoch", gender: "Male", pathway: "Fool", sequence: "2", factions: ["Demonic Wolf Family", "Forsaken Land of the Gods"], firstChapter: "1238", diff: "hard" },
  { name: "Bornova Gustav", age: "5th Epoch", gender: "Male", pathway: "Paragon", sequence: "2", factions: ["Intis Republic", "Church of God of Steam and Machinery", "Gustav Family"], firstChapter: "1274", diff: "hard" },
  { name: "Verdu Garcia Abraham", age: "5th Epoch", gender: "Male", pathway: "Door", sequence: "7", factions: ["Loen Kingdom", "Abraham Family"], firstChapter: "1298", diff: "hard" },
  { name: "Pauli Derlau", age: "5th Epoch", gender: "Male", pathway: "Visionary", sequence: "3", factions: ["Psychology Alchemists", "Twilight Hermit Order"], firstChapter: "1316", diff: "hard" },
  { name: "Benson Moretti", age: "5th Epoch", gender: "Male", pathway: "None", sequence: "None", factions: ["Loen Kingdom", "Church of Evernight Goddess"], firstChapter: "1", diff: "easy" },
  { name: "Rozanne", age: "5th Epoch", gender: "Female", pathway: "None", sequence: "None", factions: ["Blackthorn Security Company", "Nighthawks", "Church of Evernight Goddess", "Loen Kingdom"], firstChapter: "10", diff: "easy" },
  { name: "Earl Hall", age: "5th Epoch", gender: "Male", pathway: "None", sequence: "None", factions: ["Loen Kingdom", "Hall Family", "Conservative Party", "Church of Evernight Goddess"], firstChapter: "5", diff: "hard" },
  { name: "Ian Wright", age: "5th Epoch", gender: "Male", pathway: "None", sequence: "None", factions: ["Loen Kingdom", "Church of the God of Steam and Machinery"], firstChapter: "214", diff: "hard" },
  { name: "Jurgen Cooper", age: "5th Epoch", gender: "Male", pathway: "None", sequence: "None", factions: ["Loen Kingdom"], firstChapter: "222", diff: "hard" },
  { name: "Old Kohler", age: "5th Epoch", gender: "Male", pathway: "None", sequence: "None", factions: ["Loen Kingdom"], firstChapter: "282", diff: "hard" },
  { name: "Edessak Augustus", age: "5th Epoch", gender: "Male", pathway: "Justiciar", sequence: "6", factions: ["Loen Kingdom", "Augustus Family"], firstChapter: "369", diff: "hard" },
  { name: "Butler Walter", age: "5th Epoch", gender: "Male", pathway: "None", sequence: "None", factions: ["Loen Kingdom", "Dwayne Dants Household"], firstChapter: "738", diff: "hard" },
  { name: "Dio Derecha", age: "5th Epoch", gender: "Male", pathway: "None", sequence: "None", factions: ["Loen Kingdom"], firstChapter: "1391", diff: "hard" },
  { name: "Yellow Light Venithan", age: "1st Epoch", gender: "Male", pathway: "None", sequence: "None", factions: ["Spirit World", "Seven Lights"], firstChapter: "1270", diff: "hard" },
  { name: "Blue Light Kuthumi", age: "1st Epoch", gender: "Male", pathway: "None", sequence: "None", factions: ["Spirit World", "Seven Lights"], firstChapter: "1270", diff: "hard" },
  { name: "Green Light Serapis", age: "1st Epoch", gender: "Male", pathway: "None", sequence: "None", factions: ["Spirit World", "Seven Lights"], firstChapter: "1270", diff: "hard" },
  { name: "Indigo Light Iesus", age: "1st Epoch", gender: "Male", pathway: "None", sequence: "None", factions: ["Spirit World", "Seven Lights"], firstChapter: "1270", diff: "hard" },
  { name: "Violet Light Saint Germain", age: "1st Epoch", gender: "Male", pathway: "None", sequence: "None", factions: ["Spirit World", "Seven Lights"], firstChapter: "1270", diff: "hard" },
  { name: "Orange Light Hilarion", age: "1st Epoch", gender: "Male", pathway: "None", sequence: "None", factions: ["Spirit World", "Seven Lights"], firstChapter: "1270", diff: "hard" },
  { name: "Red Light Aiur Moria", age: "1st Epoch", gender: "Male", pathway: "None", sequence: "None", factions: ["Spirit World", "Seven Lights"], firstChapter: "1270", diff: "hard" }
];

const pathwayGroups = [
  ["Fool", "Error", "Door"],
  ["Visionary", "Sun", "Tyrant", "White Tower", "Hanged Man"],
  ["Darkness", "Death", "Twilight Giant"],
  ["Demoness", "Red Priest"],
  ["Mother", "Moon"],
  ["Abyss", "Chained"],
  ["Black Emperor", "Justiciar"],
  ["Hermit", "Paragon"],
  ["Wheel of Fortune"]
];

let currentDifficulty = localStorage.getItem("lotmdleclassic_diff") || "normal";

const diffEasyBtn = document.getElementById("diffEasy");
const diffNormalBtn = document.getElementById("diffNormal");
const diffHardBtn = document.getElementById("diffHard");

function setDifficulty(diff) {
  if (currentDifficulty === diff) return;
  currentDifficulty = diff;
  localStorage.setItem("lotmdleclassic_diff", diff);
  
  if (diffEasyBtn) diffEasyBtn.classList.toggle("is-active", diff === "easy");
  if (diffNormalBtn) diffNormalBtn.classList.toggle("is-active", diff === "normal");
  if (diffHardBtn) diffHardBtn.classList.toggle("is-active", diff === "hard");

  resetDaily();
}

if (diffEasyBtn) {
  diffEasyBtn.onclick = () => setDifficulty("easy");
  diffEasyBtn.classList.toggle("is-active", currentDifficulty === "easy");
}
if (diffNormalBtn) {
  diffNormalBtn.onclick = () => setDifficulty("normal");
  diffNormalBtn.classList.toggle("is-active", currentDifficulty === "normal");
}
if (diffHardBtn) {
  diffHardBtn.onclick = () => setDifficulty("hard");
  diffHardBtn.classList.toggle("is-active", currentDifficulty === "hard");
}

function todayKey() {
  const d = new Date();
  const yyyy = d.getFullYear();
  const mm = String(d.getMonth() + 1).padStart(2, "0");
  const dd = String(d.getDate()).padStart(2, "0");
  return `${yyyy}-${mm}-${dd}`;
}

function keyForOffsetDays(offset) {
  const d = new Date();
  d.setDate(d.getDate() + offset);
  const yyyy = d.getFullYear();
  const mm = String(d.getMonth() + 1).padStart(2, "0");
  const dd = String(d.getDate()).padStart(2, "0");
  return `${yyyy}-${mm}-${dd}`;
}

function dailyIndex(key, size) {
  let h = 0;
  for (let i = 0; i < key.length; i++) {
    h = (Math.imul(31, h) + key.charCodeAt(i)) | 0;
  }
  return Math.abs(h) % size;
}

function pickDailyAnswerForKey(key, diffFilter) {
  let pool = characters.filter(c => c.diff === diffFilter);
  if (!pool.length) pool = characters;
  const idx = dailyIndex(key, pool.length);
  return pool[idx];
}

function pickDailyAnswer() {
  return pickDailyAnswerForKey(todayKey() + "_" + currentDifficulty, currentDifficulty);
}

function msToHMS(ms) {
  const s = Math.max(0, Math.floor(ms / 1000));
  const h = String(Math.floor(s / 3600)).padStart(2, "0");
  const m = String(Math.floor((s % 3600) / 60)).padStart(2, "0");
  const ss = String(s % 60).padStart(2, "0");
  return `${h}:${m}:${ss}`;
}

function msToNextLocalMidnight() {
  const now = new Date();
  const next = new Date(now);
  next.setHours(24, 0, 0, 0);
  return next - now;
}

function dailyDoneKey() {
  return `lotmdleclassic_daily_done_${todayKey()}_${currentDifficulty}`;
}

function isDailyDone() {
  return localStorage.getItem(dailyDoneKey()) === "1";
}

function setDailyDone() {
  localStorage.setItem(dailyDoneKey(), "1");
}

function dailySaveKey() {
  return `lotmdleclassic_dailysave_v1_${todayKey()}_${currentDifficulty}`;
}

function saveDailyState() {
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

function streakKeyDaily() {
  const uid = auth?.currentUser?.uid || "guest";
  return `lotmdleclassic_dailystreak_${uid}_${currentDifficulty}`;
}

const grid = document.getElementById("grid");
const list = document.getElementById("list");
const searchInput = document.getElementById("searchInput");
const statusText = document.getElementById("statusText");
const attemptsText = document.getElementById("attemptsText");
const endOverlay = document.getElementById("endOverlay");
const endTitle = document.getElementById("endTitle");
const endDesc = document.getElementById("endDesc");
const playAgainBtn = document.getElementById("playAgainBtn");
const closeOverlayBtn = document.getElementById("closeOverlayBtn");

const lbBtn = document.getElementById("leaderboardBtn");
const lbOverlay = document.getElementById("leaderboardOverlay");
const lbCloseBtn = document.getElementById("closeLeaderboard");
const lbDailyBtn = document.getElementById("lbDailyBtn");

let answer = null;
let attempts = 0;
const maxAttempts = 10;
let gameOver = false;
let usedNames = new Set();
let currentSuggestions = [];

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
    if (set.has(g) && set.has(a)) {
      return "partial";
    }
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
  if (String(guessSeq).toLowerCase() === String(answerSeq).toLowerCase()) {
    return "correct";
  }

  const g = Number(guessSeq);
  const a = Number(answerSeq);
  if (!Number.isNaN(g) && !Number.isNaN(a)) {
    if (Math.abs(g - a) === 1) return "partial";
  }
  return "wrong";
}

function factionsResult(guessFactions, answerFactions) {
  const gSet = new Set(guessFactions.map(normalize));
  const aSet = new Set(answerFactions.map(normalize));

  const intersection = Array.from(gSet).filter((x) => aSet.has(x));

  if (intersection.length === 0) return "wrong";
  if (gSet.size === aSet.size && intersection.length === gSet.size) {
    return "correct";
  }
  return "partial";
}

function chapterResult(guessChapter, answerChapter) {
  const g = parseInt(guessChapter, 10);
  const a = parseInt(answerChapter, 10);

  if (Number.isNaN(g) || Number.isNaN(a)) {
    return { suffix: "", result: "wrong" };
  }
  if (g === a) {
    return { suffix: "", result: "correct" };
  }
  return { suffix: g > a ? "↓" : "↑", result: "partial" };
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

function hideEndScreen() {
  if (endOverlay) endOverlay.classList.add("hidden");
  clearInterval(window.lotmdleNextDailyTimer);
}

async function updateStreak(won) {
  const streakKey = streakKeyDaily();
  let current = parseInt(localStorage.getItem(streakKey) || "0", 10);
  if (won) {
    current++;
    localStorage.setItem(streakKey, String(current));
  } else {
    localStorage.setItem(streakKey, "0");
  }
}

function showEndScreen(won) {
  if (endTitle) {
    endTitle.textContent = won ? "You got it!" : "Not quite!";
  }
  if (endDesc && answer) {
    endDesc.textContent = `Answer: ${answer.name} \n Pathway: ${answer.pathway} \n Seq: ${answer.sequence} \n First chapter: ${answer.firstChapter}`;
  }
  if (endOverlay) {
    endOverlay.classList.remove("hidden");
  }

  updateStreak(won).catch(console.warn);

  const u = auth?.currentUser;
  if (u) {
    const current = parseInt(localStorage.getItem(streakKeyDaily()) || "0", 10);
    if (typeof submitDailyResultLoggedIn === "function") {
      submitDailyResultLoggedIn({
        mode: `daily_${currentDifficulty}`,
        didWin: !!won,
        playedKey: todayKey(),
        currentStreakAfter: won ? current : 0,
      }).catch(console.warn);
    }
  }

  setDailyDone();
  clearDailyState();

  if (playAgainBtn) {
    playAgainBtn.disabled = true;
    playAgainBtn.textContent = "Come back tomorrow";
  }

  const shareEl = document.getElementById("owShare");
  const triesEl = document.getElementById("owTries");
  const maxEl = document.getElementById("owMax");
  const modeEl = document.getElementById("owMode");

  if (triesEl) triesEl.textContent = String(attempts);
  if (maxEl) maxEl.textContent = String(maxAttempts);
  if (modeEl) modeEl.textContent = currentDifficulty.toUpperCase();

  if (shareEl) {
    shareEl.innerHTML = "";
    const total = Math.min(maxAttempts, 10);
    for (let i = 0; i < total; i++) {
      const t = document.createElement("div");
      t.className = "ow-tile";
      if (i < attempts) {
        if (won && i === attempts - 1) {
          t.classList.add("correct");
        } else {
          t.classList.add("wrong");
        }
      } else {
        t.classList.add("wrong");
        t.style.opacity = "0.35";
      }
      shareEl.appendChild(t);
    }
  }

  const badge = document.getElementById("owBadge");
  if (badge) {
    badge.textContent = won ? "WIN" : "LOSE";
    badge.classList.toggle("win", !!won);
    badge.classList.toggle("lose", !won);
  }

  const ydEl = document.getElementById("yesterdayDaily");
  if (ydEl) {
    const yKey = keyForOffsetDays(-1) + "_" + currentDifficulty;
    const yAns = pickDailyAnswerForKey(yKey, currentDifficulty);
    ydEl.textContent = yAns?.name ?? "—";
  }

  const nextEl = document.getElementById("nextDailyIn");
  if (nextEl) {
    nextEl.textContent = msToHMS(msToNextLocalMidnight());
    clearInterval(window.lotmdleNextDailyTimer);
    window.lotmdleNextDailyTimer = setInterval(() => {
      nextEl.textContent = msToHMS(msToNextLocalMidnight());
    }, 1000);
  }

  const endXBtn = document.getElementById("endXBtn");
  if (endXBtn) {
    endXBtn.onclick = () => {
      clearInterval(window.lotmdleNextDailyTimer);
      if (endOverlay) endOverlay.classList.add("hidden");
    };
  }

  const toast = document.getElementById("owToast");
  const copyBtn = document.getElementById("copyResultBtn");
  const openLbBtn = document.getElementById("openLbBtn");

  const pageUrl = (location && location.origin ? location.origin : "") + (location && location.pathname ? location.pathname : "");
  const shareText =
    `LOTMDLE CLASSIC ${currentDifficulty.toUpperCase()}\n` +
    `${won ? "WIN" : "LOSE"} (${attempts}/${maxAttempts})\n` +
    `Answer: ${answer?.name ?? "?"}\n` +
    `Yesterday: ${ydEl?.textContent ?? "—"}\n` +
    pageUrl;

  const showToast = (msg) => {
    if (!toast) return;
    toast.textContent = msg;
    toast.classList.remove("hidden");
    clearTimeout(window.lotmdleToastT);
    window.lotmdleToastT = setTimeout(() => toast.classList.add("hidden"), 1200);
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
      } catch (e) {
        alert("Pogląd wyniku:\n" + shareText);
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

  answer = pickDailyAnswer();
  attempts = 0;
  gameOver = false;
  usedNames = new Set();
  currentSuggestions = [];

  if (grid) grid.innerHTML = "";
  if (searchInput) searchInput.value = "";
  closeList();

  if (attemptsText) {
    attemptsText.textContent = `Attempts: 0 / ${maxAttempts}`;
  }

  if (isDailyDone()) {
    clearDailyState();
    gameOver = true;
    if (statusText) statusText.textContent = `Daily ${currentDifficulty} completed!`;
    return;
  }

  const s = loadDailyState();
  if (s && s.answerName === answer?.name) {
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
        if (Array.isArray(rowCells)) {
          rowCells.forEach((c) => {
            const cell = document.createElement("div");
            cell.className = c.cls || "cell wrong";
            cell.textContent = c.text || "";
            row.appendChild(cell);
          });
        }
        grid.appendChild(row);
      });
    }

    if (attemptsText) {
      attemptsText.textContent = `Attempts: ${attempts} / ${maxAttempts}`;
    }

    if (gameOver) {
      if (statusText) statusText.textContent = "Game finished. Select a character to continue.";
      if (searchInput) searchInput.value = "";
      closeList();
      return;
    }
  }

  if (statusText) {
    statusText.textContent = `Select a character (${currentDifficulty} mode) to start.`;
  }
  saveDailyState();
}

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
  if (attemptsText) {
    attemptsText.textContent = `Attempts: ${attempts} / ${maxAttempts}`;
  }

  const won = simpleEqualResult(guess.name, answer.name) === "correct";

  if (won) {
    if (statusText) statusText.textContent = `You got it! The answer was ${answer.name}.`;
    gameOver = true;
    saveDailyState();
    showEndScreen(true);
    return;
  }

  if (attempts >= maxAttempts) {
    if (statusText) statusText.textContent = `Out of attempts. The answer was ${answer.name}.`;
    gameOver = true;
    saveDailyState();
    showEndScreen(false);
    return;
  }

  if (statusText) statusText.textContent = "Keep guessing...";
  saveDailyState();
}

if (playAgainBtn) playAgainBtn.onclick = () => resetDaily();
if (closeOverlayBtn) closeOverlayBtn.onclick = () => hideEndScreen();

if (endOverlay) {
  endOverlay.onclick = (e) => {
    if (e.target !== endOverlay) return;
    hideEndScreen();
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

const howBtn = document.getElementById("howBtn");
const howOverlay = document.getElementById("howOverlay");
const howCloseBtn = document.getElementById("howCloseBtn");

if (howBtn && howOverlay) howBtn.onclick = () => howOverlay.classList.remove("hidden");
if (howCloseBtn && howOverlay) howCloseBtn.onclick = () => howOverlay.classList.add("hidden");
if (howOverlay) {
  howOverlay.onclick = (e) => {
    if (e.target === howOverlay) howOverlay.classList.add("hidden");
  };
}

const feedbackBtn = document.getElementById("feedbackBtn");
const feedbackOverlay = document.getElementById("feedbackOverlay");
const feedbackCloseBtn = document.getElementById("feedbackCloseBtn");

if (feedbackBtn && feedbackOverlay) feedbackBtn.onclick = () => feedbackOverlay.classList.remove("hidden");
if (feedbackCloseBtn && feedbackOverlay) feedbackCloseBtn.onclick = () => feedbackOverlay.classList.add("hidden");
if (feedbackOverlay) {
  feedbackOverlay.onclick = (e) => {
    if (e.target === feedbackOverlay) feedbackOverlay.classList.add("hidden");
  };
}

const patchBtn = document.getElementById("patchBtn");
const patchOverlay = document.getElementById("patchOverlay");
const patchCloseBtn = document.getElementById("patchCloseBtn");

if (patchBtn && patchOverlay) patchBtn.onclick = () => patchOverlay.classList.remove("hidden");
if (patchCloseBtn && patchOverlay) patchCloseBtn.onclick = () => patchOverlay.classList.add("hidden");
if (patchOverlay) {
  patchOverlay.onclick = (e) => {
    if (e.target === patchOverlay) patchOverlay.classList.add("hidden");
  };
}

if (lbBtn && lbOverlay) {
  lbBtn.addEventListener("click", () => {
    lbOverlay.classList.remove("hidden");
    lbDailyBtn?.classList.add("is-active");
    if (typeof loadLeaderboardLoggedIn === "function") loadLeaderboardLoggedIn(`daily_${currentDifficulty}`);
  });
}

if (lbCloseBtn && lbOverlay) lbCloseBtn.addEventListener("click", () => lbOverlay.classList.add("hidden"));
if (lbOverlay) {
  lbOverlay.addEventListener("click", (e) => {
    if (e.target === lbOverlay) lbOverlay.classList.add("hidden");
  });
}

if (lbDailyBtn) {
  lbDailyBtn.addEventListener("click", () => {
    lbDailyBtn.classList.add("is-active");
    if (typeof loadLeaderboardLoggedIn === "function") loadLeaderboardLoggedIn(`daily_${currentDifficulty}`);
  });
}

if (typeof initTheme === "function") initTheme();
resetDaily();