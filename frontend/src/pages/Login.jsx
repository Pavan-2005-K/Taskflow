
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { CheckSquare } from "lucide-react";
import { useAuth } from "../context/AuthContext";
import VideoBackground from "../components/VideoBackground";

function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      await login(email, password);
      navigate("/dashboard");
    } catch (err) {
      setError(err.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <VideoBackground>
      <div className="auth-page">
        <form className="auth-card" onSubmit={handleSubmit}>

          <div className="brand">
            <CheckSquare size={34} />
            <h2>TaskFlow</h2>
          </div>

          <h1>Welcome back!</h1>

          <p className="auth-description">
            Sign in to manage your tasks.
          </p>

          {error && <div className="error">{error}</div>}

          <div className="form-group">
            <label htmlFor="email">Email Address</label>
            <input
              id="email"
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              id="password"
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button type="submit" disabled={loading}>
            {loading ? "Signing in..." : "Sign In"}
          </button>

          <div className="auth-footer">
            Don't have an account?
            <Link to="/register"> Sign Up</Link>
          </div>

        </form>
      </div>
    </VideoBackground>
  );
}

export default Login;
