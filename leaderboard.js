import { initializeApp } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-app.js";
import { getFirestore, collection, addDoc, getDocs, query, orderBy, limit, where, updateDoc } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-firestore.js";


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
  } else {

    return { collName: "LeaderboardInf", fieldName: "MaxWinstreakInf" };
  }
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
      await updateDoc(docRef, {
        [fieldName]: currentStreak,
        date: new Date()
      });
      console.log(`New record ${currentStreak} in ${collName} saved!`);
    }
  } else {

    await addDoc(collection(db, collName), {
      name: playerName,
      [fieldName]: currentStreak,
      date: new Date()
    });
    console.log(`First score in ${collName} saved!`);
  }
}


export async function loadLeaderboard(mode) {
  const list = document.getElementById("leaderboard-list");
  if (!list) return;

  const { collName, fieldName } = getModeConfig(mode);
  
  list.innerHTML = `<div style="text-align:center; padding:20px;">Ranking is loading ${mode}...</div>`;


  const q = query(
      collection(db, collName), 
      orderBy(fieldName, "desc"), 
      limit(10)
  );
  
  try {
      const snapshot = await getDocs(q);
      
      if(snapshot.empty) {
          list.innerHTML = `<div style="text-align:center; padding:20px;">No scores in this mode ${mode}</div>`;
          return;
      }

      let html = "";
      let rank = 1;

      snapshot.forEach((doc) => {
        const data = doc.data();
        const score = data[fieldName];
        

        html += `
        <div style="display:flex; justify-content:space-between; padding:8px; border-bottom:1px solid rgba(255,255,255,0.1);">
          <span style="font-weight:bold; width:30px;">#${rank++}</span>
          <span style="flex:1; text-align:left; padding-left:10px;">${data.name}</span>
          <span style="font-weight:bold; color:#d4af37;">${score} 🔥</span>
        </div>`;
      });
      
      list.innerHTML = html;

  } catch (error) {
      console.error(" Firebase error:", error);
      list.innerHTML = `<div style="color:red; text-align:center;">Błąd pobierania danych</div>`;
  }
}
