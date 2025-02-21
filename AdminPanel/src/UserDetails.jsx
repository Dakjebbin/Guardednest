import { Link, useParams } from "react-router-dom";
import logo1 from "./assets/logosmall.png";
import xmark from "./assets/xmark.svg";
import "./admin.css";
import { useState, useEffect } from "react";
import axios from "axios";
import { useAuthContext } from "../context/Auth.Context";
import { toast } from "react-toastify";

export default function UserDetails() {
  const [isNavActive, setNavActive] = useState(false);
  const [selectedUser, setSelectedUser] = useState({});
  const { id } = useParams(); 

  function toggleNavigation() {
    setNavActive(!isNavActive);
  }

  function closeNavigation() {
    setNavActive(false);
  }

  const {userData} = useAuthContext();
  const [loading, setLoading] = useState(true);
  const baseUrl = import.meta.env.VITE_BASEURL
  axios.defaults.withCredentials = true

  useEffect(() => {
    const fetchUserDetails = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`${baseUrl}/auth/allUsersDetails/${id}`, {
        withCredentials:true,
        });

        setSelectedUser(response.data.data);
      } catch (error) {
        console.error("Error fetching user details:", error);
      }finally {
        setLoading(false);
      }

    };

    fetchUserDetails();
  }, [id]);

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
  

  if (loading) {
    return <p>Loading...</p>; // Or a spinner
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
            alt="close navigation"
            onClick={closeNavigation}
          />
        </div>

        <ul>
          <li>
            <Link to={"/admin"}>
              <span className="icon">
                <ion-icon name="home-outline"></ion-icon>
              </span>
              <span className="title">Dashboard</span>
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

  {/* mobile view sidebar */}
  <aside className={`bg-[#cb8d39] sm:hidden fixed bottom-0 top-0 w-full z-30 text-white ${isNavActive ? "block" : "hidden"}`}>
        <div className="flex justify-end mr-10 mt-6">
              <img
                className="w-7 "
                src={xmark}
                alt="logo"
                onClick={closeNavigation}
              />
        </div>
        <ul className="mt-10 pl-10" >
          <li className="mb-10 cursor-pointer " onClick={closeNavigation}>
            <Link to={"/admin"} className="flex items-center">
              <span className="text-3xl mr-4">
                <ion-icon name="home-outline"></ion-icon>
              </span>
              <span className="text-3xl">Dashboard</span>
            </Link>
            </li>
            <li className="cursor-pointer" onClick={closeNavigation}>
            <Link onClick={handleLogout} className="flex items-center">
              <span className="text-3xl mr-4">
                <ion-icon name="log-out-outline"></ion-icon>
              </span>
              <span className="text-3xl">Sign Out</span>
            </Link>
          </li>
        </ul>
      </aside>

      <div className={`main ${isNavActive ? "active" : ""}`}>
        <div className="topbar">
          <div className="toggle" onClick={toggleNavigation}>
          <svg xmlns="http://www.w3.org/2000/svg" height="34px" viewBox="0 -960 960 960" width="34px" fill="black"><path d="M120-240v-80h720v80H120Zm0-200v-80h720v80H120Zm0-200v-80h720v80H120Z"/></svg>
          </div>

          <div className="user1">
            <p>Welcome {userData.fname}</p>
          </div>
        </div>

        <div className="uzer">
          <h2>User Details</h2>
          <div className="userDetails">
            <h3 className="username">{selectedUser.username}</h3>
            <p>Email: {selectedUser.email}</p>
            <p>
              Name: {selectedUser.fname} {selectedUser.lname}
            </p>
            <p>Phone: {selectedUser.phone}</p>
            <p>Country: {selectedUser.country}</p>
            <p>Balance: ${selectedUser.balance}</p>
            <p>Profit: ${selectedUser.profit}</p>
            <p>IsAdmin: {selectedUser.isAdmin}</p>
          </div>
        </div>
      </div>
    </div>
    )}
    </>
  );
}
