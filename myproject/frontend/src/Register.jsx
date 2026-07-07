import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "./AuthContext";

export default function Register() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const { setAccessToken, setUsername: setAuthUsername, axiosInstance } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await axiosInstance.post("/auth/register", { username, email, password });
      setAccessToken(res.data.accessToken);
      setAuthUsername(res.data.username);
      navigate("/");
    } catch (err) {
      setError(err.response?.data?.error || err.response?.data?.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full flex justify-center items-center bg-[#010409] text-white">
      <div className="w-full max-w-md border border-white p-8 flex flex-col gap-6 bg-gray-800">
        <div className="text-[2em] font-bold font-serif text-center">Register</div>

        {error && <p className="text-red-400 text-center">{error}</p>}

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div className="flex flex-col gap-1">
            <label className="text-white">Username</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              placeholder="Enter your full name"
              className="bg-[#0d1117] border border-gray-600 p-2 text-white outline-none"
            />
          </div>

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
              placeholder="Enter choosen password"
              className="bg-[#0d1117] border border-gray-600 p-2 text-white outline-none"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="bg-blue-600 p-3 w-full"
          >
            <p className="h-full p-2">{loading ? "Registering..." : "Register"}</p>
          </button>
        </form>

        <p className="text-center text-gray-400">
          Already have an account?{" "}
          <Link to="/login" className="text-blue-400">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}
