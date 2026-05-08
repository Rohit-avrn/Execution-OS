export default function GoalForm({ goal, setGoal, onGenerate }) {
  return (
    <div className="bg-zinc-900 p-6 rounded-2xl">
      <input
        value={goal}
        onChange={(e) => setGoal(e.target.value)}
        placeholder="Enter your goal"
        className="w-full p-3 rounded-xl text-black"
      />

      <button
        onClick={onGenerate}
        className="bg-white text-black px-5 py-2 rounded-xl mt-4"
      >
        Generate Mission
      </button>
    </div>
  );
}