import Login from "./pages/Login";

export default function App() {
  const user = localStorage.getItem("user");

  return user ? (
    <div className="text-white bg-black min-h-screen flex items-center justify-center">
      Welcome to Execution OS
    </div>
  ) : (
    <Login />
  );
}