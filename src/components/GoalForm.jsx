export default function GoalForm() {
  return (
    <div className="bg-zinc-900 p-6 rounded-2xl">
      <input
        type="text"
        placeholder="Enter your goal"
        className="w-full p-3 rounded-xl text-black"
      />

      <button className="bg-white text-black px-5 py-2 rounded-xl mt-4">
        Generate Mission
      </button>
    </div>
  )
}