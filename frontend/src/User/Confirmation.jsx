import { Link, useLocation, useNavigate} from "react-router-dom";
import logo1 from "../assets/logosmall.png";
import cus1 from "../assets/customer01.jpg";
import xmark from "../assets/xmark.svg";
import "../style/dash.css";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import { useAuthContext } from "../context/auth.context";



const addresses = {
  bitcoin: "bc1qk47jxm8rrec2um50ext8s4mqdjr7sp3lnrlzhh",
  ethereum: "0x32Be343B94f860124dC4fEe278FDCBD38C102D88",
  tether: "0xdac17f958d2ee523a2206206994597c13d831ec7",
};

const cryptoShortForms = {
  bitcoin: "BTC",
  ethereum: "ETH",
  tether: "USDT",
};

function Confirmation() {
  const [isNavActive, setNavActive] = useState(false);
  const location = useLocation();
  const { amount, plan, selectedCrypto, invoice } = location.state || {};
  const [timeLeft, setTimeLeft] = useState(3600); // 1 hour in seconds
  const [image, setImage] = useState(null)
  const [imageError, setImageError] = useState("");
  const navigate = useNavigate();
  const { userData } = useAuthContext();

useEffect(() => {
  if (!userData) {
    toast.error("Please Login");
    navigate("/"); 
  }
}, [userData, navigate]);

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

const handleImageChange = (e) => {
  const file = e.target.files[0];

  if (file) {
    
    if (file.size > 5242880) {
      setImageError("Image should not exceed 5MB.");
      setImage(null);  // Clear image if it exceeds size limit
      return;
    } else {
      setImageError("");  // Reset error if image size is valid
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      setImage(reader.result);
    };
    reader.readAsDataURL(file);
  } 
};

const handleTransaction = async (e) => {
  e.preventDefault();
  if (!amount || !plan || !image) {
    toast.error("Please select a plan, enter an amount, please select an image");
    return;
  }

  try {
    const response = await axios.post(`${baseUrl}/transaction/userTransact`,{
      plan: plan,
      amount: amount,
      image :image
    }, {
      headers:{
            'Content-Type': 'application/json',
      },
      withCredentials: true,
    })

    if (response.status === 200) {
      toast.success("Funded Request Received")
      navigate("/user")
    } else {
      toast.error("Request Failed")
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




  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prevTime) => {
        if (prevTime <= 0) {
          clearInterval(timer);
          return 0;
        }
        return prevTime - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${String(minutes).padStart(2, '0')}:${String(remainingSeconds).padStart(2, '0')}`;
  };

  function toggleNavigation() {
    setNavActive(!isNavActive);
  }

  function closeNavigation() {
    setNavActive(false);
  }

  function copyContent() {
    const inputField = document.getElementById("address");
    inputField.select();
    document.execCommand("copy");
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
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
                <path d="M0 96C0 78.3 14.3 64 32 64H416c17.7 0 32 14.3 32 32s-14.3 32-32 32H32C14.3 128 0 113.7 0 96zM0 256c0-17.7 14.3-32 32-32H416c17.7 0 32 14.3 32 32s-14.3 32-32 32H32c-17.7 0-32-14.3-32-32zM448 416c0 17.7-14.3 32-32 32H32c-17.7 0-32-14.3-32-32s14.3-32 32-32H416c17.7 0 32 14.3 32 32z" />
              </svg>
            </div>

            <div className="user1">
              <p>Welcome  {userData ? userData.fname : "User"}</p>
              <div className="user">
                <img src={cus1} alt="profile-photo" />
              </div>
            </div>
          </div>
          <div className="tab">
            <div className="bank">
            <div className="text5">
               <h2>Send Crypto</h2>
               <p>SEND {invoice} TO THE WALLET ADDRESS BELOW</p>
              </div>

              <div className="wallet">
                <span onClick={copyContent}>
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" width={'20px'}>
                    <path
                      d="M384 336H192c-8.8 0-16-7.2-16-16V64c0-8.8 7.2-16 16-16l140.1 0L400 115.9V320c0 8.8-7.2 16-16 16zM192 384H384c35.3 0 64-28.7 64-64V115.9c0-12.7-5.1-24.9-14.1-33.9L366.1 14.1c-9-9-21.2-14.1-33.9-14.1H192c-35.3 
                    0-64 28.7-64 64V320c0 35.3 28.7 64 64 64zM64 128c-35.3 0-64 28.7-64 64V448c0 35.3 28.7 64 64 64H256c35.3 0 64-28.7 64-64V416H272v32c0 8.8-7.2 16-16 16H64c-8.8 0-16-7.2-16-16V192c0-8.8 7.2-16 16-16H96V128H64z"
                    />
                  </svg>
                </span>
                <input
                  type="text"
                  id="address"
                  value={addresses[selectedCrypto] || ''}
                  readOnly
                />
              </div>
              <form onSubmit={handleTransaction}>
              <div className="buttons">
                <input type="file" onChange={handleImageChange} name="" className="btn3" id="" />
                 <br />
                <button type="submit" className="btn4">Submit</button>
              </div>
              </form>
              <div className="timer">
                <h3>{formatTime(timeLeft)}</h3>
              </div>
            </div>
          </div>
        </div>
   
      </div>
      )}
    </>
  );
}

export default Confirmation;
