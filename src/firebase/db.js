import { doc, setDoc, getDoc } from "firebase/firestore";
import { db } from "./config";

export async function saveUserData(uid, data) {
  await setDoc(doc(db, "users", uid), data);
}

export async function getUserData(uid) {
  const snap = await getDoc(doc(db, "users", uid));
  return snap.exists() ? snap.data() : null;
}