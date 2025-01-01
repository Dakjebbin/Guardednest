import { useState } from "react";
import "../../frontend/src/style/home.css";
import eye from "../../frontend/src/assets/eye.svg"; 
import eyeOff from "../../frontend/src/assets/eye-off.svg"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from "axios";

export default function SignIn() {
  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const baseUrl = import.meta.env.VITE_BASEURL;
  axios.defaults.withCredentials = true;

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(`${baseUrl}/auth/login`,{
        username,password
      }, {
        withCredentials: true,
      });
      

      if (response.status === 200) {
        toast.success("Login Successfull")
        setUserName('');
        setPassword('');
        window.location.assign("/admin")
      } else {
        toast.error("An error occurred");
      }
    } catch (error) {
      if (error instanceof axios.AxiosError) {
        console.log(
           error?.response?.data
         );
       } else {
         console.log("reg error => ", error);
       }
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
