import { useState } from "react";
import api from "../services/api"
import "../styles/login.css";


export default function Login({setUser}) {
  const [id, setId] = useState("");
  const [key, setKey] = useState("");
  const [err, setErr] = useState("");

  const handleLogin = async () => {
    try {
      setErr("");

      const res = await api.post("/api/auth/login", {
        username: id,
        password: key,
      });

      console.log(res.data);

      setUser(res.data.user);

     
    } catch (error) {
      if (error.response) {
        setErr(error.response.data.message);
      } else {
        setErr("Cannot connect to server");
      }

      console.log(error);
    }
  };

  return (
    <div className="login-page">
      <div className="login-card">

        <div>
          <h1 className="logo">
            CHRONOSYNC
          </h1>

          <p className="subtitle">
            TEMPORAL NEXUS — AUTH REQUIRED
          </p>
        </div>

        <div className="divider"></div>

        <div className="form-group">

          <div className="input-group">
            <label>OPERATOR ID</label>

            <input
              value={id}
              onChange={(e) => setId(e.target.value)}
              placeholder="commander"
            />
          </div>

          <div className="input-group">
            <label>ACCESS KEY</label>

            <input
              type="password"
              value={key}
              onChange={(e) => setKey(e.target.value)}
              placeholder="••••••••"
              onKeyDown={(e) =>
                e.key === "Enter" && handleLogin()
              }
            />
          </div>

        </div>

        <button
          className="login-btn"
          onClick={handleLogin}
        >
          Authenticate →
        </button>

        <div className="error">
          {err}
        </div>



      </div>
    </div>
  );
}