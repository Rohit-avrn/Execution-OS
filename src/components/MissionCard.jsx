export default function MissionCard({ mission }) {
  function completeMission() {
    let current = Number(localStorage.getItem("streak") || 1);
    current += 1;

    localStorage.setItem("streak", current);
    window.location.reload(); // simple hackathon trick
  }

  return (
    <div className="bg-zinc-900 p-6 rounded-2xl mt-6">
      <h2 className="text-2xl font-bold mb-3">Today's Mission</h2>

      <p>{mission.mission}</p>
      <p className="mt-2">{mission.time}</p>
      <p className="mt-2 italic">{mission.motivation}</p>

      <button
        onClick={completeMission}
        className="bg-green-500 text-black px-4 py-2 mt-4 rounded"
      >
        Complete Mission
      </button>
    </div>
  );
}