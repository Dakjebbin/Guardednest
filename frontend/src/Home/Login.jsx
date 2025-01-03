import { useState } from "react";
import { Link, useNavigate } from "react-router-dom"; // eslint-disable-line
import goog from "../assets/google.svg";
import "../style/home.css";
import eye from "../assets/eye.svg"; 
import eyeOff from "../assets/eye-off.svg"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from "axios";

export default function Login() {
  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");
 // const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  const baseUrl = import.meta.env.VITE_BASEURL;
  axios.defaults.withCredentials = true;

  const handleSubmit = async (e) => {
    e.preventDefault();

    const trimmedUsername = username.trim();
    const trimmedPassword = password.trim();

    if (!trimmedUsername || !trimmedPassword) {
      toast.error('Please all fields are required');
      return;
    }

    try {
      const response = await axios.post(`${baseUrl}/auth/login`, 
        {
          username: trimmedUsername,
          password: trimmedPassword,
      },{
        withCredentials: true,
      });


if (response.status === 200) {
  toast.success("Login Successfull")
  setUserName('');
        setPassword('');
        window.location.assign("/user")
}

    } catch (error) {
      if (error.status === 400) { 
        toast.error("Invalid Credentials")
      } else if(error.status === 409) {
        toast.error("Invalid Credentials");
      } else {
        toast.error("An error occurred");
      }
    }
  };

  return (
    <div>
    
      <div className="content">
        <div className="section">
          <div className="login">
            <div className="text2">
              <h2>Welcome back!</h2>
              <p>
                Hey there! Ready to log in? Just enter your username and
                password below and you&#39;ll be back in action in no time.
                Let&#39;s go!
              </p>
            </div>

            <div className="google-sect">
              <Link href="#">
                <span>
                  <img src={goog} alt="google icon" />
                </span>
                Continue with Google
              </Link>
              <br />
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
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <div className="eye-button" onClick={() => setShowPassword(!showPassword)}
                    aria-label={showPassword ? "Hide password" : "Show password"}>
                  <img src={showPassword ? eye : eyeOff} alt={showPassword ? "Hide password" : "Show password"} />
                  </div>
                </div>
              </div>


              <a className="forgot" href="forgot-pass.html">
                Forgot Password?
              </a>
              <button type="submit" id="submit">
                Sign in
              </button>
            </form>

            <div className="signup">
              <p>
                Don&#39;t have an account? <Link to="/signup">Sign up</Link>
              </p>
            </div>
          </div>
        </div>
      </div>

      
      <ToastContainer />
    </div>
  );
}
