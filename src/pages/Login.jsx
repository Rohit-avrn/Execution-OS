export default function Login({ setUser }) {
  function login() {
    setUser({
      name: "Akshay",
      joined: new Date().toDateString()
    });
  }

  return (
    <div className="h-screen flex items-center justify-center bg-black text-white">
      <div className="text-center">
        <h1 className="text-5xl font-bold">Execution OS</h1>
        <button
          onClick={login}
          className="mt-6 bg-white text-black px-6 py-3 rounded"
        >
          Start Session
        </button>
      </div>
    </div>
  );
}