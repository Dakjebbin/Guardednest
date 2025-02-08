import { Link, useNavigate } from "react-router-dom";
import logo1 from "./assets/logosmall.png";
import xmark from "./assets/xmark.svg";
import "./admin.css";
import { useState, useEffect } from "react";
import { useAuthContext } from "../context/Auth.Context";
import axios from "axios";
import { toast } from "react-toastify";

export default function Admin() {
  const [isNavActive, setNavActive] = useState(false);
  const [users, setUsers] = useState([]);
 const {userData} = useAuthContext();
 const navigate = useNavigate()


  function toggleNavigation() {
    setNavActive(!isNavActive);
  }

  function closeNavigation() {
    setNavActive(false);
  }
const baseUrl = import.meta.env.VITE_BASEURL
axios.defaults.withCredentials = true

  const [loading, setLoading] = useState(true);

   useEffect(() => { 

     const fetchUsers = async () => {

      if (userData?.isAdmin === "USER") {
       toast.error("Unauthorized Access");
       window.location.assign("/")
       return;
       }
       
      setLoading(true);
       try {
         const response = await axios.get(`${baseUrl}/auth/allUsers`,{
           withCredentials: true,
         });
 
         setUsers(response.data.data)
         

      } catch (err) {
        console.error("Failed to fetch users:", err);
      } finally {
        setLoading(false);
      }
    };
  
    fetchUsers();
  }, [userData]);

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
            alt="logo"
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
          {/* <li>
            <Link to={"/admin"}>
              <span className="icon">
                <ion-icon name="wallet-outline"></ion-icon>
              </span>
              <span className="title">Withdrawals</span>
            </Link>
          </li>
          <li>
            <Link to={"/admin"}>
              <span className="icon">
                <ion-icon name="stats-chart-outline"></ion-icon>
              </span>
              <span className="title">Transactions</span>
            </Link>
          </li>
          <li>
            <Link to={"/admin"}>
              <span className="icon">
                <ion-icon name="settings-outline"></ion-icon>
              </span>
              <span className="title">Settings</span>
            </Link>
          </li> */}
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
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
              <path d="M0 96C0 78.3 14.3 64 32 64H416c17.7 0 32 14.3 32 32s-14.3 32-32 32H32C14.3 128 0 113.7 0 96zM0 256c0-17.7 14.3-32 32-32H416c17.7 0 32 14.3 32 32s-14.3 32-32 32H32c-17.7 0-32-14.3-32-32zM448 416c0 17.7-14.3 32-32 32H32c-17.7 0-32-14.3-32-32s14.3-32 32-32H416c17.7 0 32 14.3 32 32z" />
            </svg>
          </div>

          <div className="user1 mb-10">
            <p>Welcome {userData.fname}</p>
          </div>
        </div>

        <div className="panel">
          <h2>Admin Dashboard</h2>
          <div className="flex justify-between gap-10 flex-wrap mx-10 ">
            {users.map((user) => (
              <div className="border basis-24 flex-grow border-[#535353] p-5 rounded-lg shadow-lg shadow-black" key={user.username}>
                <div className="">
                  <h3 className="username">{user.username}</h3>
                  <p className="email">{user.email}</p>
                </div>
                <div className="btn-sect">
                  <button
                  className="button"
                 onClick={() => navigate(`/transactions/${user._id}`)}
                >
                  View Transactions
                </button>
                <button
                  className="button"
                  onClick={() => navigate(`/userCard/${user._id}`)}
                >
                  View Usercard
                </button>

                
                </div>
                
              </div>
            ))}
          </div> 
        </div>
      </div>
    </div>
    )}
    </>
  );
}
