import { useState } from "react";
import MissionCard from "../components/MissionCard";

export default function Dashboard({ user }) {
  const [goal, setGoal] = useState("");
  const [mission, setMission] = useState(null);
  const [streak, setStreak] = useState(0);

  function generateMission() {
    setMission({
      goal,
      task: `Break "${goal}" into 3 steps and execute step 1`,
    });
  }

  function complete() {
    setStreak(streak + 1);
    setMission(null);
    setGoal("");
  }

  return (
    <div className="min-h-screen bg-black text-white p-10">

      <h1 className="text-3xl font-bold">
        Welcome, {user.name}
      </h1>

      <p className="text-orange-400">🔥 Streak: {streak}</p>

      <input
        className="p-2 text-black mt-6"
        value={goal}
        onChange={(e) => setGoal(e.target.value)}
        placeholder="Enter goal"
      />

      <button
        onClick={generateMission}
        className="ml-3 bg-white text-black px-4 py-2"
      >
        Generate
      </button>

      {mission && (
        <MissionCard mission={mission} onComplete={complete} />
      )}
    </div>
  );
}