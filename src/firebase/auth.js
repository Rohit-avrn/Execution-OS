import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "./config";

const provider = new GoogleAuthProvider();

export async function loginWithGoogle() {
  const result = await signInWithPopup(auth, provider);
  return result.user;
}