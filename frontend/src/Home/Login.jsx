import { useState } from "react";
import { Link } from "react-router-dom"; 
import goog from "../assets/google.svg";
import "../style/home.css";
import eye from "../assets/eye.svg"; 
import eyeOff from "../assets/eye-off.svg";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from "axios";

export default function Login() {
  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
 

  const baseUrl = import.meta.env.VITE_BASEURL;
  axios.defaults.withCredentials = true;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (loading) return; // Prevent multiple clicks

    const trimmedUsername = username.trim();
    const trimmedPassword = password.trim();

    if (!trimmedUsername || !trimmedPassword) {
      toast.error('Please fill in all fields');
      return;
    }

    setLoading(true); // Start loading

    try {
      const response = await axios.post(`${baseUrl}/auth/login`, 
        { username: trimmedUsername, password: trimmedPassword },
        { withCredentials: true }
      );

      if (response.status === 200) {
        localStorage.setItem("user", JSON.stringify(response.data));
        toast.success("Login Successful");
        setUserName('');
        setPassword('');
        window.location.assign("/user");
      }
    } catch (error) {
      if (error.response) {
        const { status, data } = error.response;
        if (status === 400 || status === 401) {
          toast.error(data?.message || "Invalid credentials");
        } else {
          toast.error(data?.message || "Something went wrong, try again!");
        }
      } else {
        toast.error("Network error, please check your connection.");
      }
    } finally {
      setLoading(false); // Stop loading
    }
  };

  return (
    <div className="container7">
      <div className="content">
        <div className="section">
          <div className="login">
            <div className="text2">
              <h2>Welcome back!</h2>
              <p>Enter your username and password to log in.</p>
            </div>

            {/* <div className="google-sect"> */}
            <div className="flex justify-center ">
              <div className="flex cursor-pointer items-center border border-black rounded-lg py-3 px-2">
                  <img src={goog} alt="Google icon" />
                <p>Continue with Google</p>
              </div>
            </div>

            <div className="divider">
              <span className="or">or</span>
            </div>

            <form onSubmit={handleSubmit} className="sign">
              <label htmlFor="username">Username</label>
              <input
                type="text"
                id="username"
                required
                placeholder="Enter Your Username"
                value={username}
                onChange={(e) => setUserName(e.target.value)}
              />

              <div className="password-container">
                <label htmlFor="password">Password</label>
                <div className="password-input">
                  <input
                    type={showPassword ? "text" : "password"}
                    id="password"
                    required
                    placeholder="Enter Your Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <div className="eye-button" onClick={() => setShowPassword(!showPassword)}
                    aria-label={showPassword ? "Hide password" : "Show password"}>
                    <img src={showPassword ? eye : eyeOff} alt="Toggle password visibility" />
                  </div>
                </div>
              </div>

              <a className="forgot" href="forgot-pass.html">
                Forgot Password?
              </a>
              <button type="submit" id="submit" disabled={loading}>
                {loading ? "Signing in..." : "Sign in"}
              </button>
            </form>

            <div className="signup">
              <p>
                Don&apos;t have an account? <Link to="/signup">Sign up</Link>
              </p>
            </div>
          </div>
        </div>
      </div>

      <ToastContainer />
    </div>
  );
}
