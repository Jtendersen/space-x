import { login } from "api";
import "./index.scss";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "contexts/AuthContext";

export const Login = () => {
  const { setToken } = useContext(AuthContext);
  const [userId, setUserId] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const handleLogin = async () => {
    try {
      setLoading(true);
      const token = await login(userId);
      setToken(token);
    } catch (error: any) {
      console.error("Error while logging in--->", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    localStorage.clear();
  }, []);

  return (
    <div className="login-page">
      <img
        src="https://www.deptagency.com/wp-content/themes/dept/public/logo-light-new.svg"
        alt="DEPT®"
        title="DEPT®"
      />

      <div className="input-container">
        <input
          type="number"
          value={userId}
          style={{
            marginBottom: "30px",
            padding: "10px",
            background: "transparent",
            border: "1px solid #fff",
            color: "#fff",
          }}
          onChange={(e) => setUserId(e.target.value)}
          placeholder="Enter your user ID..."
        />
      </div>
      <button
        onClick={handleLogin}
        className="glow-on-hover"
        disabled={loading}
      >
        {loading ? "Logging in..." : "LOG IN"}
      </button>
    </div>
  );
};
