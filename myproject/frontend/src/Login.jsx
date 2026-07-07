import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "./AuthContext";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const { setAccessToken, setUsername, axiosInstance } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await axiosInstance.post("/auth/login", { email, password });
      setAccessToken(res.data.accessToken);
      setUsername(res.data.username);
      navigate("/");
    } catch (err) {
      setError(err.response?.data?.error || err.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full flex justify-center items-center bg-[#010409] text-white">
      <div className="w-full max-w-md border border-white p-8 flex flex-col gap-6 bg-gray-800">
        <div className="text-[2em] font-bold font-serif text-center">Login</div>

        {error && <p className="text-red-400 text-center">{error}</p>}

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div className="flex flex-col gap-1">
            <label className="text-white">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="Enter your email"
              className="bg-[#0d1117] border border-gray-600 p-2 text-white outline-none"
            />
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-white">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              placeholder="Enter your password"
              className="bg-[#0d1117] border border-gray-600 p-2 text-white outline-none"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="bg-blue-600 p-3 w-full"
          >
            <p className="h-full p-2">{loading ? "Logging in..." : "Login"}</p>
          </button>
        </form>

        <p className="text-center text-gray-400">
          No account?{" "}
          <Link to="/register" className="text-blue-400">
            Register
          </Link>
        </p>
      </div>
    </div>
  );
}
