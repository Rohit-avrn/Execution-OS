import { useEffect, useState } from "react";

export default function App() {
  const [user, setUser] = useState(null);
  const [input, setInput] = useState("");
  const [mission, setMission] = useState(null);

  const [streak, setStreak] = useState(0);
  const [level, setLevel] = useState(1);
  const [xp, setXp] = useState(0);

  // LOAD REALISTIC APP STATE
  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("exec_os_v1"));
    if (saved) {
      setUser(saved.user);
      setStreak(saved.streak || 0);
      setLevel(saved.level || 1);
      setXp(saved.xp || 0);
    }
  }, []);

  function persist(data) {
    localStorage.setItem("exec_os_v1", JSON.stringify(data));
  }

  // LOGIN FEELS REAL NOW
  function handleLogin() {
    const fakeUser = {
      name: "Akshay",
      joined: new Date().toDateString()
    };

    setUser(fakeUser);

    persist({
      user: fakeUser,
      streak,
      level,
      xp
    });
  }

  // REALISTIC MISSION ENGINE (NOT RANDOM TEXT SPAM)
  function createMission(goal) {
    const templates = [
      `Break "${goal}" into 3 clear steps and complete step 1 only`,
      `Focus session: work on "${goal}" without distractions for 25 minutes`,
      `Execute the smallest possible action toward "${goal}"`,
      `Write down what blocking you from "${goal}" and remove it`
    ];

    return templates[Math.floor(Math.random() * templates.length)];
  }

  function generate() {
    if (!input.trim()) return;

    setMission({
      goal: input,
      task: createMission(input),
      reward: "Discipline compounds silently."
    });
  }

  function complete() {
    let newStreak = streak + 1;
    let newXp = xp + 25;
    let newLevel = level;

    if (newXp >= 100) {
      newLevel += 1;
      newXp = 0;
    }

    setStreak(newStreak);
    setXp(newXp);
    setLevel(newLevel);

    persist({
      user,
      streak: newStreak,
      level: newLevel,
      xp: newXp
    });

    setMission(null);
    setInput("");
  }

  // LOGIN SCREEN (CLEAN PRODUCT STYLE)
  if (!user) {
    return (
      <div className="h-screen bg-black text-white flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-5xl font-bold tracking-wide">
            Execution OS
          </h1>
          <p className="text-gray-400 mt-2">
            Build discipline. Execute goals.
          </p>

          <button
            onClick={handleLogin}
            className="mt-6 bg-white text-black px-6 py-3 rounded-xl font-semibold"
          >
            Start Session
          </button>
        </div>
      </div>
    );
  }

  // DASHBOARD (PRODUCT STYLE LAYOUT)
  return (
    <div className="min-h-screen bg-black text-white p-10">

      {/* HEADER */}
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-4xl font-bold">Execution OS</h1>
          <p className="text-gray-400 mt-1">
            Welcome back, {user.name}
          </p>
        </div>

        <div className="text-right text-sm text-gray-300">
          <p>🔥 Streak: {streak}</p>
          <p>⭐ Level: {level}</p>
          <p>⚡ XP: {xp}/100</p>
        </div>
      </div>

      {/* INPUT MODULE */}
      <div className="mt-10 bg-zinc-900 p-6 rounded-2xl max-w-xl">
        <p className="text-gray-400 mb-2">Today's focus</p>

        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Enter your goal..."
          className="w-full p-3 rounded-xl text-black"
        />

        <button
          onClick={generate}
          className="mt-4 bg-white text-black px-5 py-2 rounded-xl font-semibold"
        >
          Generate Execution Plan
        </button>
      </div>

      {/* MISSION CARD */}
      {mission && (
        <div className="mt-6 bg-zinc-900 p-6 rounded-2xl max-w-xl">
          <p className="text-gray-400 text-sm">MISSION</p>
          <h2 className="text-xl font-bold mt-1">{mission.goal}</h2>

          <p className="mt-4 text-gray-200">
            {mission.task}
          </p>

          <p className="mt-3 italic text-gray-400">
            {mission.reward}
          </p>

          <button
            onClick={complete}
            className="mt-5 bg-green-500 text-black px-5 py-2 rounded-xl font-semibold"
          >
            Mark as Completed
          </button>
        </div>
      )}

      {/* PROGRESSION SYSTEM */}
      <div className="mt-10 bg-zinc-900 p-6 rounded-2xl max-w-xl">
        <h2 className="text-lg font-bold mb-3">Progress System</h2>

        <p>Beginner → Discipline Builder → Execution Engine → Elite Operator</p>

        <div className="w-full bg-gray-800 h-2 mt-3 rounded">
          <div
            className="bg-white h-2 rounded"
            style={{ width: `${xp}%` }}
          />
        </div>
      </div>

    </div>
  );
} 