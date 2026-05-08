import { getFirestore, doc, setDoc, getDoc } from "firebase/firestore";
import { app } from "./config";

const db = getFirestore(app);

// save mission
export async function saveMission(userId, mission) {
  await setDoc(doc(db, "missions", userId), {
    mission,
    updatedAt: new Date()
  });
}

// load mission
export async function getMission(userId) {
  const snap = await getDoc(doc(db, "missions", userId));
  return snap.exists() ? snap.data() : null;
}