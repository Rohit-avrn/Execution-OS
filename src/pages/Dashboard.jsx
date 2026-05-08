import { useEffect, useState } from "react";
import GoalForm from "../components/GoalForm";
import MissionCard from "../components/MissionCard";
import StreakCounter from "../components/StreakCounter";
import { generateMission } from "../services/openai";

export default function Dashboard() {
  const [goal, setGoal] = useState("");
  const [mission, setMission] = useState(null);
  const [streak, setStreak] = useState(1);

  // Load saved data on refresh
  useEffect(() => {
    const savedMission = localStorage.getItem("mission");
    const savedStreak = localStorage.getItem("streak");

    if (savedMission) setMission(JSON.parse(savedMission));
    if (savedStreak) setStreak(Number(savedStreak));
  }, []);

  function handleGenerate() {
    if (!goal) return;

    const newMission = generateMission(goal);
    setMission(newMission);

    // SAVE locally
    localStorage.setItem("mission", JSON.stringify(newMission));
  }

  return (
    <div className="bg-black text-white min-h-screen p-10">
      <h1 className="text-4xl font-bold mb-6">Execution OS</h1>

      <GoalForm
        goal={goal}
        setGoal={setGoal}
        onGenerate={handleGenerate}
      />

      {mission && <MissionCard mission={mission} />}

      <StreakCounter streak={streak} />
    </div>
  );
}