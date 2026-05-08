export default function StreakCounter({ streak }) {
  return (
    <div className="bg-orange-500 text-black p-5 rounded-2xl mt-6 text-2xl font-bold">
      🔥 {streak} Day Streak
    </div>
  );
}