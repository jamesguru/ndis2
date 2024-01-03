import Navbar from "../../components/navbar/Navbar";
import "./login.css";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Footer from "../../components/footer/Footer";
import { login } from "../../redux/apiCalls";
import { Navigate } from "react-router-dom";
const Login = () => {
  const [staffID, setStaffID] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const user = useSelector((state) => state.user);

  const dispatch = useDispatch();
  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
  };

  const handleLogin = async () => {
    if (staffID && password) {
      try {
        setLoading(true);
        await login(dispatch, { staffID, password });
        setLoading(false); // Navigate on successful login
      } catch (error) {
        setLoading(false);
        // Handle login error (e.g., display an error message)
        setError('You have entered wrong password or staffID.')
      }
    }
  };

  return (
    <div>
      <Navbar />
      <div className="login-container">
        <form>
          <h2>Login</h2>
          <label htmlFor="username">Staff ID:</label>
          <div className="password">
            <input
              type="text"
              id="staffID"
              name="staffID"
              onChange={(e) => setStaffID(e.target.value)}
            />
          </div>

          <label htmlFor="password">Password:</label>
          <div className="password">
            <input
              type={showPassword ? "text" : "password"}
              id="password"
              name="password"
              className="password"
              onChange={(e) => setPassword(e.target.value)}
            />
            <span
              style={{
                display: "inline",
                cursor: "pointer",
                fontSize: "20px",
              }}
              onClick={handleTogglePassword}
            >
              {showPassword ? "🔒" : "👁️"}
            </span>
          </div>
          <span className="login-btn" onClick={handleLogin}>
            {loading ? "loading ..." : "Login"}
            {user.currentUser ? <Navigate to="/staff" /> : ""}
          </span>
          {error && <span style={{color:'red'}}>{error}</span>}
        </form>
      </div>

      <Footer />
    </div>
  );
};

export default Login;
