export default function MissionCard({ mission, onComplete }) {
  return (
    <div className="mt-6 bg-zinc-900 p-5 rounded-xl max-w-xl">
      <h2 className="font-bold">{mission.goal}</h2>
      <p className="mt-2">{mission.task}</p>

      <button
        onClick={onComplete}
        className="mt-4 bg-green-500 text-black px-4 py-2"
      >
        Complete Mission
      </button>
    </div>
  );
}