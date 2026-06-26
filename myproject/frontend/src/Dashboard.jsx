import { useEffect, useState } from "react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { useAuth } from "./AuthContext";

export default function Dashboard() {
  const { axiosInstance } = useAuth();
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await axiosInstance.get("/quiz/stats");
        setStats(res.data);
      } catch (err) {
        setError(err.response?.data?.error || "Failed to load stats");
      } finally {
        setLoading(false);
      }
    };
    fetchStats();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center bg-[#010409] text-white">
        Loading...
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex justify-center items-center bg-[#010409] text-red-400">
        {error}
      </div>
    );
  }

  const chartData = [
    { label: "Due Today", value: stats.dueToday },
    { label: "Reviewed Today", value: stats.reviewedToday }
  ];

  return (
    <div className="w-full flex justify-center min-h-screen bg-[#010409] text-white">
      <div className="w-[95%] h-fit flex flex-col gap-8 border border-white p-5">
        <div className="text-[2em] md:text-5xl font-bold font-serif text-center">Dashboard</div>

        <div className="flex flex-col gap-2">
          <p className="text-lg">Total Words Saved: <span className="text-white font-bold">{stats.totalWords}</span></p>
          <p className="text-lg">Words Due Today: <span className="text-white font-bold">{stats.dueToday}</span></p>
          <p className="text-lg">Words Reviewed Today: <span className="text-white font-bold">{stats.reviewedToday}</span></p>
        </div>

        <div className="flex flex-col gap-2">
          <p className="text-gray-400 text-sm">Daily Review</p>
          <div style={{ width: "100%", height: 250 }}>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData} margin={{ top: 10, right: 20, left: 0, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                <XAxis dataKey="label" tick={{ fill: "#9ca3af" }} />
                <YAxis allowDecimals={false} tick={{ fill: "#9ca3af" }} />
                <Tooltip
                  contentStyle={{ backgroundColor: "#0d1117", border: "1px solid #374151", color: "#fff" }}
                  cursor={{ fill: "rgba(255,255,255,0.05)" }}
                />
                <Bar dataKey="value" fill="#3b82f6" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
}
