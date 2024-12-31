import { Link, useNavigate} from "react-router-dom";
import { useEffect, useState } from "react";
import logo1 from "../assets/logosmall.png";
import xmark from "../assets/xmark.svg";
import "../style/dash.css";
import { toast, ToastContainer } from "react-toastify";
import { useAuthContext } from "../context/auth.context";
import axios from "axios";

function Fund() {
  const [isNavActive, setNavActive] = useState(false);
  const [plan, setPlan] = useState("");
  const [amount, setAmount] = useState("");
  const navigate = useNavigate();
  
  
  const { userData } = useAuthContext();

  useEffect(() => {
    if (!userData) {
      toast.error("Please Login");
      navigate("/");  // Redirect to login page if user is not authenticated
    }
  }, [userData, navigate]);
 

  // Toggle navigation menu
  const toggleNavigation = () => {
    setNavActive(!isNavActive);
  };

  // Close navigation menu
  const closeNavigation = () => {
    setNavActive(false);
  };


  // Handle plan selection change
  const handlePlanChange = (e) => {
    const selectedPlan = e.target.value;
    let selectedAmount = "";

    switch (selectedPlan) {
      case "Starter":
        selectedAmount = "100";
        break;
      case "Regular":
        selectedAmount = "500";
        break;
      case "Premium":
        selectedAmount = "2500";
        break;
      case "Classic":
        selectedAmount = "5500";
        break;
      default:
        selectedAmount = "";
        break;
    }

    setAmount(selectedAmount);
    setPlan(selectedPlan);
  };
  
const baseUrl = import.meta.env.VITE_BASEURL;
axios.defaults.withCredentials = true

  const handleFunding = async (e) => {
    e.preventDefault();

    if (!plan || !amount) {
      toast.error("Please select a plan and amount");
      return;
    }

    try {
      const response = await axios.post(`${baseUrl}/user/fund`, {
        plan, amount
      }, {
        withCredentials: true,
      })

      console.log(response);
      
  
      if (response.status === 201)  {
        toast.success("Funding Process Initialized")
       
        console.log('Navigating to payment...');
        navigate("/user/fund/payment", {state: {amount, plan}})
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
              <Link to={"/user"}>
                <span className="icon">
                  <ion-icon name="home-outline"></ion-icon>
                </span>
                <span className="title">Dashboard</span>
              </Link>
            </li>
            <li>
              <Link to={"/user"}>
                <span className="icon">
                  <ion-icon name="wallet-outline"></ion-icon>
                </span>
                <span className="title">Withdrawals</span>
              </Link>
            </li>
            <li>
              <Link to={"/user/"}>
                <span className="icon">
                  <ion-icon name="stats-chart-outline"></ion-icon>
                </span>
                <span className="title">Transactions</span>
              </Link>
            </li>
            <li>
              <Link to={"/user"}>
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
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
              <path d="M0 96C0 78.3 14.3 64 32 64H416c17.7 0 32 14.3 32 32s-14.3 32-32 32H32C14.3 128 0 113.7 0 96zM0 256c0-17.7 14.3-32 32-32H416c17.7 0 32 14.3 32 32s-14.3 32-32 32H32c-17.7 0-32-14.3-32-32zM448 416c0 17.7-14.3 32-32 32H32c-17.7 0-32-14.3-32-32s14.3-32 32-32H416c17.7 0 32 14.3 32 32z" />
            </svg>
          </div>
          <div className="user1">
            <p>Welcome {userData ? userData.fname : "User"}</p>
          </div>
        </div>

        <div className="tab">
          <div className="bank">
            <div className="text5">
              <h2>Fund Account</h2>
            </div>

            <form onSubmit={handleFunding}>
              <label htmlFor="plan">Plan</label>
              <br />
              <select id="plan" value={plan} onChange={handlePlanChange}>
                <option value="Select Plan">Select Plan</option>
                <option value="Starter">Starter</option>
                <option value="Regular">Regular</option>
                <option value="Premium">Premium</option>
                <option value="Classic">Classic</option>
              </select>
              <label htmlFor="amount">Amount</label>
              <input
                type="number"
                id="amount"
                value={amount}
                readOnly
                onChange={(e) => setAmount(e.target.value)}
                required
              />
            

              <button type="submit" className="go">Submit</button>
            </form>
          </div>
        </div>
      </div>
     
      <ToastContainer/>
      
    </div>
  )}
  </>
  );
}

export default Fund;
