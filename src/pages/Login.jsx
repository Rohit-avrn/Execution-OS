import { loginWithGoogle } from "../firebase/auth";

export default function Login() {
  async function handleLogin() {
    const user = await loginWithGoogle();

    // store user locally for now
    localStorage.setItem("user", JSON.stringify(user));

    // redirect to dashboard
    window.location.href = "/";
  }

  return (
    <div className="h-screen flex flex-col items-center justify-center bg-black text-white">
      <h1 className="text-4xl font-bold mb-6">Execution OS</h1>

      <button
        onClick={handleLogin}
        className="bg-white text-black px-6 py-3 rounded-xl"
      >
        Login with Google
      </button>
    </div>
  );
}