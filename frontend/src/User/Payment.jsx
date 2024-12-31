import { Link, useLocation, useNavigate } from "react-router-dom";
import logo1 from "../assets/logosmall.png";
import xmark from "../assets/xmark.svg";
import "../style/dash.css";
import { useState, useEffect } from "react";
import { useAuthContext } from "../context/auth.context";
import { toast } from "react-toastify";

export default function Payment() {
  const [isNavActive, setNavActive] = useState(false);
  const [selectedCrypto, setSelectedCrypto] = useState("");
  const [cryptoRates, setCryptoRates] = useState({});
  const [invoice, setInvoice] = useState(""); 
  const navigate = useNavigate();
  const location = useLocation();
  const amount = location.state?.amount
  const plan = location.state?.plan

  const { userData } = useAuthContext();

  function toggleNavigation() {
    setNavActive(!isNavActive);
  }

  useEffect(() => {
    if (!userData) {
      toast.error("Please Login");
      navigate("/"); 
    }
  }, [userData, navigate]);

  useEffect(() => {
    // Fetch cryptocurrency rates when the component mounts
   const response = fetch("https://api.coingecko.com/api/v3/simple/price?ids=bitcoin,ethereum,tether&vs_currencies=usd")
      .then((res) => res.json())
      .then((data) => {
        setCryptoRates(data); // Set the cryptocurrency rates in state
      });
      console.log(response);
  
  }, []);
 

  useEffect(() => {
    // Perform conversion when the selected cryptocurrency or amount changes
    if (selectedCrypto && cryptoRates[selectedCrypto]) {
      const rate = cryptoRates[selectedCrypto]?.usd;
      const conversionResult = amount / rate; 
      setInvoice(conversionResult.toFixed(4)); 
    }
  }, [selectedCrypto, cryptoRates, amount]);
  
  function closeNavigation() {
    setNavActive(false);
  }

  

  return (
    <>
      
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
              <Link to={`/user/`}>
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
              <Link to={"/login"}>
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
            </div>
          </div>
          <div className="tab">
            <div className="bank">
              <div className="text5">
                <h2>Pay ${amount}</h2>
                <p>Make Payment</p>
                <p>{invoice && ` ${invoice} ${selectedCrypto.toUpperCase()}`}</p> 
              </div>

              <form>
                <label htmlFor="crypt">Select Crypto</label>
                <br />
                <select
                  name="crypt"
                  id="crypt"
                  value={selectedCrypto}
                  onChange={(e) => setSelectedCrypto(e.target.value)}
                >
                  <option value="">Select Crypto</option>
                  <option value="bitcoin">Bitcoin BTC</option>
                  <option value="ethereum">Ethereum ETH</option>
                  <option value="tether">Tether USDT</option>
                </select>
                <button
                  type="button"
                  className="go"
                onClick={() => {navigate("/user/fund/payment/confirmation", {state: {invoice,plan, amount, selectedCrypto}})}}
                >
                  Proceed
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
      
    
    </>
  );
}
