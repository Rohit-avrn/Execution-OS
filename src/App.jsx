import { useEffect, useState } from "react";

export default function App() {
  const [user, setUser] = useState(null);
  const [input, setInput] = useState("");
  const [mission, setMission] = useState(null);

  const [streak, setStreak] = useState(0);
  const [level, setLevel] = useState(1);
  const [xp, setXp] = useState(0);
  const [coins, setCoins] = useState(0);

  const [history, setHistory] = useState([]);
  const [badges, setBadges] = useState([]);
  const [ownedRewards, setOwnedRewards] = useState([]);

  const [avatar, setAvatar] = useState("🧑");
  const [theme, setTheme] = useState("purple");
  const [rank, setRank] = useState("Beginner");
  const [popup, setPopup] = useState("");

  const themes = {
    purple:
      "from-purple-500 via-pink-500 to-cyan-400",
    red:
      "from-red-500 via-orange-500 to-yellow-400",
    green:
      "from-green-500 via-emerald-500 to-cyan-400"
  };

  useEffect(() => {
    const saved = JSON.parse(
      localStorage.getItem("exec_os_ultimate")
    );

    if (saved) {
      setUser(saved.user);
      setStreak(saved.streak || 0);
      setLevel(saved.level || 1);
      setXp(saved.xp || 0);
      setCoins(saved.coins || 0);
      setHistory(saved.history || []);
      setBadges(saved.badges || []);
      setOwnedRewards(saved.ownedRewards || []);
      setAvatar(saved.avatar || "🧑");
      setTheme(saved.theme || "purple");
      setRank(saved.rank || "Beginner");
    }
  }, []);

  function persist(data) {
    localStorage.setItem(
      "exec_os_ultimate",
      JSON.stringify(data)
    );
  }

  function saveAll(
    newUser,
    newStreak,
    newLevel,
    newXp,
    newCoins,
    newHistory,
    newBadges,
    newRewards,
    newAvatar,
    newTheme,
    newRank
  ) {
    persist({
      user: newUser,
      streak: newStreak,
      level: newLevel,
      xp: newXp,
      coins: newCoins,
      history: newHistory,
      badges: newBadges,
      ownedRewards: newRewards,
      avatar: newAvatar,
      theme: newTheme,
      rank: newRank
    });
  }

  function handleLogin() {
    const fakeUser = {
      name: "Akshay",
      joined: new Date().toDateString()
    };

    setUser(fakeUser);

    saveAll(
      fakeUser,
      streak,
      level,
      xp,
      coins,
      history,
      badges,
      ownedRewards,
      avatar,
      theme,
      rank
    );
  }

  function createMission(goal) {
    const templates = [
      `Complete first attack phase of "${goal}"`,
      `Work 25 mins distraction-free on "${goal}"`,
      `Destroy one blocker stopping "${goal}"`,
      `Execute hardest step toward "${goal}"`,
      `Push momentum on "${goal}"`,
      `Take immediate action toward "${goal}"`
    ];

    return templates[
      Math.floor(Math.random() * templates.length)
    ];
  }

  function generateMission() {
    if (!input.trim()) return;

    setMission({
      goal: input,
      task: createMission(input),
      difficulty:
        ["Easy", "Medium", "Hard"][
          Math.floor(Math.random() * 3)
        ]
    });
  }

  function evolveAvatar(level) {
    if (level >= 10) return "👑";
    if (level >= 7) return "⚔️";
    if (level >= 5) return "🔥";
    if (level >= 3) return "🛡️";
    return "🧑";
  }

  function updateRank(level) {
    if (level >= 10) return "Legend";
    if (level >= 7) return "Elite Operator";
    if (level >= 5) return "Execution Engine";
    if (level >= 3) return "Discipline Builder";
    return "Beginner";
  }

  function updateBadges(newStreak, newLevel) {
    let b = [...badges];

    if (newStreak >= 1 && !b.includes("Starter"))
      b.push("Starter");

    if (newStreak >= 5 && !b.includes("Consistent"))
      b.push("Consistent");

    if (newStreak >= 10 && !b.includes("Relentless"))
      b.push("Relentless");

    if (newLevel >= 3 && !b.includes("Executor"))
      b.push("Executor");

    if (newLevel >= 5 && !b.includes("Elite"))
      b.push("Elite");

    if (newLevel >= 10 && !b.includes("Legend"))
      b.push("Legend");

    return b;
  }

  function completeMission() {
    if (!mission) return;

    let gainedXp =
      mission.difficulty === "Hard"
        ? 45
        : mission.difficulty === "Medium"
        ? 30
        : 20;

    let gainedCoins =
      mission.difficulty === "Hard"
        ? 60
        : mission.difficulty === "Medium"
        ? 40
        : 20;

    let newXp = xp + gainedXp;
    let newCoins = coins + gainedCoins;
    let newLevel = level;
    let newStreak = streak + 1;

    let threshold = 100 + level * 20;

    if (newXp >= threshold) {
      newLevel++;
      newXp = 0;

      setPopup(`🚀 LEVEL ${newLevel} UNLOCKED`);
      setTimeout(() => setPopup(""), 3000);
    }

    const newAvatar = evolveAvatar(newLevel);
    const newRank = updateRank(newLevel);
    const updatedBadges = updateBadges(
      newStreak,
      newLevel
    );

    const newHistory = [
      {
        goal: mission.goal,
        difficulty: mission.difficulty,
        time: new Date().toLocaleString()
      },
      ...history
    ].slice(0, 12);

    setXp(newXp);
    setCoins(newCoins);
    setLevel(newLevel);
    setStreak(newStreak);

    setAvatar(newAvatar);
    setRank(newRank);

    setBadges(updatedBadges);
    setHistory(newHistory);

    setMission(null);
    setInput("");

    saveAll(
      user,
      newStreak,
      newLevel,
      newXp,
      newCoins,
      newHistory,
      updatedBadges,
      ownedRewards,
      newAvatar,
      theme,
      newRank
    );
  }

  const rewardShop = [
    {
      name: "☕ Coffee Reward",
      cost: 50
    },
    {
      name: "🎬 Watch Episode",
      cost: 120
    },
    {
      name: "🍔 Cheat Meal",
      cost: 250
    },
    {
      name: "🎮 Gaming Session",
      cost: 400
    },
    {
      name: "👑 Legendary Reward",
      cost: 700
    }
  ];

  function redeemReward(item) {
    if (coins < item.cost) return;

    const updatedCoins = coins - item.cost;

    const updatedRewards = [
      ...ownedRewards,
      item
    ];

    setCoins(updatedCoins);
    setOwnedRewards(updatedRewards);

    setPopup(`🎁 Redeemed ${item.name}`);
    setTimeout(() => setPopup(""), 3000);

    saveAll(
      user,
      streak,
      level,
      xp,
      updatedCoins,
      history,
      badges,
      updatedRewards,
      avatar,
      theme,
      rank
    );
  }

  if (!user) {
    return (
      <div className="h-screen overflow-hidden bg-black flex items-center justify-center text-white relative">

        <div className="absolute w-96 h-96 bg-purple-500 blur-[150px] opacity-30 animate-pulse" />
        <div className="absolute w-96 h-96 bg-pink-500 blur-[150px] opacity-20 right-0 bottom-0 animate-pulse" />

        <div className="text-center z-10">

          <h1 className={`text-7xl font-black bg-gradient-to-r ${themes[theme]} text-transparent bg-clip-text animate-pulse`}>
            Execution OS
          </h1>

          <p className="mt-4 text-gray-400 text-lg">
            Discipline Becomes Identity
          </p>

          <button
            onClick={handleLogin}
            className={`mt-8 px-8 py-4 rounded-2xl bg-gradient-to-r ${themes[theme]} font-black text-lg hover:scale-110 transition-all duration-300 shadow-2xl`}
          >
            ENTER SYSTEM
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white overflow-hidden p-6 relative">

      {/* BACKGROUND */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-purple-500 blur-[180px] opacity-20 animate-pulse" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-pink-500 blur-[180px] opacity-20 animate-pulse" />

      {/* POPUP */}
      {popup && (
        <div className="fixed top-6 right-6 bg-green-500 text-black px-6 py-3 rounded-2xl font-black z-50 animate-bounce shadow-2xl">
          {popup}
        </div>
      )}

      {/* HEADER */}
      <div className="relative z-10 flex justify-between flex-wrap gap-5">

        <div>
          <h1 className={`text-6xl font-black bg-gradient-to-r ${themes[theme]} text-transparent bg-clip-text`}>
            KAIZEN 
          </h1>

          <p className="text-gray-400 mt-2">
            Welcome back, {user.name}
          </p>

          <p className="text-yellow-300 mt-2 font-bold">
            {rank}
          </p>
        </div>

        <div className="bg-zinc-900/70 backdrop-blur-xl border border-purple-500/20 rounded-3xl p-5 text-center shadow-2xl">

          <div className="text-6xl animate-bounce">
            {avatar}
          </div>

          <p className="mt-3">🔥 {streak}</p>
          <p>⭐ Level {level}</p>
          <p>⚡ {xp}</p>
          <p>🪙 {coins}</p>
        </div>
      </div>

      {/* XP BAR */}
      <div className="relative z-10 mt-8 w-full h-5 bg-zinc-800 rounded-full overflow-hidden shadow-inner">

        <div
          className={`h-full bg-gradient-to-r ${themes[theme]} transition-all duration-700`}
          style={{
            width: `${xp}%`
          }}
        />
      </div>

      {/* THEME SWITCH */}
      <div className="relative z-10 mt-5 flex gap-3">

        <button
          onClick={() => setTheme("purple")}
          className="w-8 h-8 rounded-full bg-purple-500"
        />

        <button
          onClick={() => setTheme("red")}
          className="w-8 h-8 rounded-full bg-red-500"
        />

        <button
          onClick={() => setTheme("green")}
          className="w-8 h-8 rounded-full bg-green-500"
        />
      </div>

      {/* INPUT */}
      <div className="relative z-10 mt-10 bg-zinc-900/70 backdrop-blur-xl p-6 rounded-3xl border border-purple-500/20 shadow-2xl">

        <p className="text-gray-400 mb-3">
          Today's Goal
        </p>

        <input
          value={input}
          onChange={(e) =>
            setInput(e.target.value)
          }
          placeholder="Enter your mission..."
          className="w-full p-4 rounded-2xl text-black font-bold outline-none"
        />

        <button
          onClick={generateMission}
          className={`mt-5 bg-gradient-to-r ${themes[theme]} px-6 py-3 rounded-2xl font-black hover:scale-105 transition-all duration-300`}
        >
          GENERATE MISSION
        </button>
      </div>

      {/* MISSION */}
      {mission && (
        <div className="relative z-10 mt-8 bg-zinc-900/70 backdrop-blur-xl border border-purple-500/20 rounded-3xl p-6 shadow-2xl animate-pulse">

          <div className="flex justify-between flex-wrap gap-3">

            <h2 className="text-3xl font-black">
              {mission.goal}
            </h2>

            <span className="bg-purple-500 px-4 py-1 rounded-full text-sm font-bold">
              {mission.difficulty}
            </span>
          </div>

          <p className="mt-4 text-lg">
            {mission.task}
          </p>

          <button
            onClick={completeMission}
            className="mt-6 bg-green-400 text-black px-6 py-3 rounded-2xl font-black hover:scale-110 transition-all duration-300"
          >
            COMPLETE MISSION
          </button>
        </div>
      )}

      {/* REWARD SHOP */}
      <div className="relative z-10 mt-10 bg-zinc-900/70 backdrop-blur-xl p-6 rounded-3xl border border-yellow-500/20 shadow-2xl">

        <h2 className="text-3xl font-black text-yellow-300">
          Reward Shop
        </h2>

        <div className="grid md:grid-cols-2 gap-4 mt-6">

          {rewardShop.map((item, i) => (
            <div
              key={i}
              className="bg-black/40 border border-zinc-700 rounded-2xl p-5 hover:border-yellow-400 transition-all duration-300 hover:scale-[1.02]"
            >

              <div className="flex justify-between items-center">

                <div>
                  <p className="font-black text-lg">
                    {item.name}
                  </p>

                  <p className="text-yellow-300">
                    {item.cost} Coins
                  </p>
                </div>

                <button
                  onClick={() =>
                    redeemReward(item)
                  }
                  className={`px-4 py-2 rounded-xl font-black ${
                    coins >= item.cost
                      ? "bg-green-400 text-black hover:scale-105"
                      : "bg-zinc-700 text-gray-400"
                  } transition-all`}
                >
                  {coins >= item.cost
                    ? "Redeem"
                    : "Locked"}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* OWNED */}
      <div className="relative z-10 mt-10 bg-zinc-900/70 backdrop-blur-xl p-6 rounded-3xl border border-cyan-500/20 shadow-2xl">

        <h2 className="text-3xl font-black text-cyan-300">
          Inventory
        </h2>

        <div className="flex flex-wrap gap-3 mt-5">

          {ownedRewards.length === 0 ? (
            <p className="text-gray-500">
              No rewards redeemed
            </p>
          ) : (
            ownedRewards.map((r, i) => (
              <div
                key={i}
                className="bg-cyan-500/20 border border-cyan-400 px-4 py-2 rounded-full animate-pulse"
              >
                {r.name}
              </div>
            ))
          )}
        </div>
      </div>

      {/* BADGES */}
      <div className="relative z-10 mt-10 bg-zinc-900/70 backdrop-blur-xl p-6 rounded-3xl border border-pink-500/20 shadow-2xl">

        <h2 className="text-3xl font-black text-pink-300">
          Badges
        </h2>

        <div className="flex flex-wrap gap-3 mt-5">

          {badges.map((b, i) => (
            <div
              key={i}
              className="bg-pink-500/20 border border-pink-400 px-5 py-2 rounded-full hover:scale-110 transition-all duration-300"
            >
              🏆 {b}
            </div>
          ))}
        </div>
      </div>

      {/* HISTORY */}
      <div className="relative z-10 mt-10 bg-zinc-900/70 backdrop-blur-xl p-6 rounded-3xl border border-purple-500/20 shadow-2xl">

        <h2 className="text-3xl font-black text-purple-300">
          Mission History
        </h2>

        {history.length === 0 ? (
          <p className="text-gray-500 mt-4">
            No missions completed
          </p>
        ) : (
          history.map((h, i) => (
            <div
              key={i}
              className="mt-4 bg-black/40 border border-zinc-700 rounded-2xl p-4 hover:border-purple-400 transition-all duration-300"
            >

              <div className="flex justify-between">

                <p className="font-black">
                  {h.goal}
                </p>

                <span className="text-cyan-300 text-sm">
                  {h.difficulty}
                </span>
              </div>

              <p className="text-gray-500 text-sm mt-2">
                {h.time}
              </p>
            </div>
          ))
        )}
      </div>
    </div>
  );
}