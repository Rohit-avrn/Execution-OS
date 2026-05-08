import { getFirestore, doc, setDoc, getDocs, collection } from "firebase/firestore";
import { app } from "./config";

const db = getFirestore(app);

export async function updateStreak(userId, name, streak) {
  await setDoc(doc(db, "leaderboard", userId), {
    name,
    streak
  });
}

export async function getLeaderboard() {
  const snap = await getDocs(collection(db, "leaderboard"));
  return snap.docs.map(d => d.data());
}