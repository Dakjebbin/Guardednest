import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import goog from "../../frontend/src/assets/google.svg";
import "../../frontend/src/style/home.css";
import eye from "../../frontend/src/assets/eye.svg"; 
import eyeOff from "../../frontend/src/assets/eye-off.svg"

import Footer from "../../frontend/src/Home/Footer.jsx";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function SignIn() {
  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:3001/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          "Access-Control-Allow-Origin": "*",
        },
        body: JSON.stringify({
          username,
          password,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        if (data.success) {
          toast.success("Login successful!");
          window.localStorage.setItem("token", data.token);
          window.localStorage.setItem("loggedIn", true);
          navigate(`/admin`);
        } else {
          // Handle unsuccessful login response
          toast.error(data.message || "Login failed. Please check your credentials.");
        }
      } else {
        // Handle server errors
        toast.error("Server error: " + (data.message || "Please try again later."));
      }
    } catch (error) {
      toast.error("An error occurred: " + error.message);
    }
  };

  return (
    <>
      
      <div className="content">
        <div className="section">
          <div className="login">
            <div className="text2">
              <h2>Admin Welcome back!</h2>
             <h3>Admin Sign In</h3>
            </div>

           {/*  <div className="google-sect">
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
*/}
            <form onSubmit={handleSubmit} className="sign">
              <label htmlFor="username">Username</label>
              <input
                type="text"
                id="username"
                required
                onChange={(e) => setUserName(e.target.value)}
              />



<div className="password-container">
                <label htmlFor="password">Password</label>
                <div className="password-input">
                  <input
                    type={showPassword ? "text" : "password"}
                    id="password"
                    required
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

            
          </div>
        </div>
      </div>

   
      <ToastContainer />
    </>
  );
}
