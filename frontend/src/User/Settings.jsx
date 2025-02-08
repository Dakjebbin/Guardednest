import { Link } from "react-router-dom";
import logo1 from "../assets/logosmall.png";
import xmark from "../assets/xmark.svg";
import cus1 from "../assets/customer01.jpg";
import "../style/dash.css";
import { useState } from "react";
import { useAuthContext } from "../context/auth.context";
import axios from "axios";
import { toast } from "react-toastify";
export default function Settings() {
  const [isNavActive, setNavActive] = useState(false);
  const { userData } = useAuthContext();

  function toggleNavigation() {
    setNavActive(!isNavActive);
  }
  
  
  function closeNavigation() {
    setNavActive(false);
  }

    
  const baseUrl = import.meta.env.VITE_BASEURL;
axios.defaults.withCredentials = true

  const handleLogout = async () => {
    try {
      const response = await axios.post(`${baseUrl}/auth/logout`, {
        withCredentials: true,
      })
  
      if (response.status === 200) {
        toast.success("Logout successful");
        window.location.assign("/") 
      } else{
        toast.error("An error occurred. Please try again");
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
  }

  return (
    <>
    {userData && (
      <div className="container">
      <div className={`navigation ${isNavActive ? "active" : ""}`}>
          <div className="navbar">
            <img className="logo1" src={logo1} alt="logo" />
            <img
              className="xmark"
              src={xmark}
              alt="logo"
              onClick={closeNavigation}
            />
          </div>

          <ul>
            <li>
              <Link to={`/user`}>
                <span className="icon">
                  <ion-icon name="home-outline"></ion-icon>
                </span>
                <span className="title">Dashboard</span>
              </Link>
            </li>
            <li>
              <Link to={`/user/withdrawals`}>
                <span className="icon">
                  <ion-icon name="wallet-outline"></ion-icon>
                </span>
                <span className="title">Withdrawals</span>
              </Link>
            </li>
            <li>
              <Link to={`/user/transactions`}>
                <span className="icon">
                  <ion-icon name="stats-chart-outline"></ion-icon>
                </span>
                <span className="title">Transactions</span>
              </Link>
            </li>
            <li>
              <Link to={`/user/settings`}>
                <span className="icon">
                  <ion-icon name="settings-outline"></ion-icon>
                </span>
                <span className="title">Settings</span>
              </Link>
            </li>
            <li>
              <Link onClick={handleLogout}>
                <span className="icon">
                  <ion-icon name="log-out-outline"></ion-icon>
                </span>
                <span className="title">Sign Out</span>
              </Link>
            </li>
          </ul>
        </div>

        <div className={`main ${isNavActive ? "active" : ""}`}>
          <div className="topbar">
            <div className="toggle" onClick={toggleNavigation}>
            <svg xmlns="http://www.w3.org/2000/svg" height="34px" viewBox="0 -960 960 960" width="34px" fill="black"><path d="M120-240v-80h720v80H120Zm0-200v-80h720v80H120Zm0-200v-80h720v80H120Z"/></svg>
            </div>
              
          <div className="user1">
              <p>Welcome  {userData ? userData.fname : "User"}</p>
              <div className="user">
                <img src={cus1} alt="profile-photo" />
              </div>
              </div>
          </div>
          <div className="sector">
        
 
            <div className="border border-[#cb8d39] mb-4 py-8 px-1">
              <Link className="flex justify-center items-center">
              <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 640 512"
                  width={"50px"}
                  className="bg-[#cb8d39] px-2 py-2 rounded-lg"
                >
                  <path d="M224 256A128 128 0 1 0 224 0a128 128 0 1 0 0 256zm-45.7 48C79.8 304 0 383.8 0 482.3C0 498.7 13.3 512 29.7 512H418.3c1.8 0 3.5-.2 5.3-.5c-76.3-55.1-99.8-141-103.1-200.2c-16.1-4.8-33.1-7.3-50.7-7.3H178.3zm308.8-78.3l-120 48C358 277.4 352 286.2 352 296c0 63.3 25.9 168.8 134.8 214.2c5.9 2.5 12.6 2.5 18.5 0C614.1 464.8 640 359.3 640 296c0-9.8-6-18.6-15.1-22.3l-120-48c-5.7-2.3-12.1-2.3-17.8 0zM591.4 312c-3.9 50.7-27.2 116.7-95.4 149.7V273.8L591.4 312z" />
                </svg>
                <p className="text-3xl ml-3">Verifications  </p>
              </Link>
            </div>
            
            <div className="border border-[#cb8d39] mb-4 py-8 px-1">
              <Link className="flex justify-center items-center">
              <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 512 512"
                  width={"50px"}
                   className="bg-[#cb8d39] px-2 py-2 rounded-lg"
                >
                  <path d="M48 64C21.5 64 0 85.5 0 112c0 15.1 7.1 29.3 19.2 38.4L236.8 313.6c11.4 8.5 27 8.5 38.4 0L492.8 150.4c12.1-9.1 19.2-23.3 19.2-38.4c0-26.5-21.5-48-48-48H48zM0 176V384c0 35.3 28.7 64 64 64H448c35.3 0 64-28.7 64-64V176L294.4 339.2c-22.8 17.1-54 17.1-76.8 0L0 176z" />
                </svg>
                <p className="text-3xl ml-3">Update Email</p>
              </Link>
            </div>
            
            <div className="border border-[#cb8d39] py-8 px-1">
              <Link className="flex justify-center items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 448 512"
                  width={"40px"}
                  className="bg-[#cb8d39] px-2 py-2 rounded-lg"
                >
                  <path d="M144 144v48H304V144c0-44.2-35.8-80-80-80s-80 35.8-80 80zM80 192V144C80 64.5 144.5 0 224 0s144 64.5 144 144v48h16c35.3 0 64 28.7 64 64V448c0 35.3-28.7 64-64 64H64c-35.3 0-64-28.7-64-64V256c0-35.3 28.7-64 64-64H80z" />
                </svg>
                <p className="text-2xl ml-3">Update Password</p>
              </Link>
            </div>
          </div>
        </div>
      </div>
      )}
    </>
  );
}
