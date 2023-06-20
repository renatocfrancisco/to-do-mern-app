import { login, setRefreshToken, setToken } from "../../api";
import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import "../../App.css";

export default function Login() {
  const userRef = useRef();
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const result = await login(username, password);
    if (result.status === 200) {
      setRefreshToken(result.data.refreshToken);
      setToken(result.data.accessToken);
      navigate("/home");
    } else {
      alert(result);
    }
    setLoading(false);
  };

  useEffect(() => {
    userRef.current.focus();
  }, []);

  useEffect(() => {
    console.log("loading", loading);
  }, [loading]);

  return (
    <>
      <div className="login">
        <h1>LOGIN</h1>
        <form>
          <label>
            <p>Username</p>
            <input
              type="text"
              autoComplete="username"
              onChange={(e) => setUsername(e.target.value)}
              ref={userRef}
            />
          </label>
          <label>
            <p>Password</p>
            <input
              type="password"
              autoComplete="current-password"
              onChange={(e) => setPassword(e.target.value)}
            />
          </label>

          <div className="submit">
            <button onClick={handleSubmit}>Submit</button>
          </div>
        </form>
      </div>
    </>
  );
}
