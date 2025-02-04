import { Link, useParams } from "react-router-dom"; // Import useParams
import logo1 from "./assets/logosmall.png";
import xmark from "./assets/xmark.svg";
import "./admin.css";
import { useState, useEffect } from "react";
import axios from "axios";
import { useAuthContext } from "../context/Auth.Context";
import { toast, ToastContainer } from "react-toastify";

export default function AdminTransaction() {
  const [isNavActive, setNavActive] = useState(false);
  const [transactions, setTransactions] = useState([]);
  const [statusUpdates, setStatusUpdates] = useState({});
  const [balance, setBalance] = useState("");
  const [profit, setProfit] = useState("");
  const [loading,] = useState({}); // New loading state

  const { id } = useParams();
  const { userData } = useAuthContext();
  const baseUrl = import.meta.env.VITE_BASEURL;

  // Toggling navigation
  const toggleNavigation = () => setNavActive((prev) => !prev);
  const closeNavigation = () => setNavActive(false);

  // Fetching transactions
  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const response = await axios.get(`${baseUrl}/transaction/getTransact/${id}`, {
          withCredentials: true,
        });
        setTransactions(response.data.data);
      } catch (error) {
        console.error("Error fetching transactions:", error);
      }
    };
    fetchTransactions();
  }, [id]);

  // Handle logout
  const handleLogout = async () => {
    try {
      const response = await axios.post(`${baseUrl}/auth/logout`, { withCredentials: true });
      if (response.status === 200) {
        toast.success("Logout successful");
        window.location.assign("/");
      } else {
        toast.error("An error occurred. Please try again");
      }
    } catch (error) {
      console.error("Logout error", error);
    }
  };

  // Handle status update
  const handleStatusChange = async (transactionId) => {
    let newStatus = statusUpdates[transactionId];
  
    if (!newStatus) {
      toast.error("Please select a valid status.");
      return;
    }
  
    // Ensure status is in lowercase (adjust as per backend requirement)
    newStatus = newStatus.toLowerCase(); 
  
    try {
      const response = await axios.patch(
        `${baseUrl}/transaction/updateTransact/${transactionId}`, // Using transactionId
        { status: newStatus },
        { withCredentials: true }
      );
  
      console.log("Response from backend:", response.data);
  
      if (response.data.success) {
        toast.success("Status updated successfully");
  
        setTransactions((prev) =>
          prev.map((tx) => (tx._id === transactionId ? { ...tx, status: newStatus } : tx))
        );
  
        setStatusUpdates((prev) => ({ ...prev, [transactionId]: "" }));
      } else {
        toast.error("Error updating status: " + response.data.error || "Unknown error");
      }
    } catch (error) {
      console.error("Error response:", error.response?.data);
      toast.error("Error updating transaction.");
    }
  };
  

  // Handle status change selection
  const handleStatusChangeSelect = (transactionId, status) => {
    setStatusUpdates((prevUpdates) => ({
      ...prevUpdates,
      [transactionId]: status,
    }));
  };

  // Handle funding update
  const handleFunding = async (e) => {
    e.preventDefault();
    if (!balance) {
      return toast.error("Please enter a valid amount");
    }

    try {
      const response = await axios.post(
        `${baseUrl}/user/fundAdmin/${id}`,
        { balance },
        { withCredentials: true }
      );
      if (response.status === 201) {
        toast.success("Funding successful");
      } else {
        toast.error("An error occurred. Please try again");
      }
    } catch (error) {
      console.error("Funding error:", error);
      toast.error("Error funding user.");
    }
  };

  // Handle profit update
  const handleProfitUpdates = async (e) => {
    e.preventDefault();
    if (!profit) {
      return toast.error("Please enter a valid amount");
    }

    try {
      const response = await axios.post(
        `${baseUrl}/user/Profits/${id}`,
        { profit },
        { withCredentials: true }
      );
      if (response.status === 201) {
        toast.success("Profit added successfully");
        setProfit("");
      }
    } catch (error) {
      console.error("Profit update error:", error);
      toast.error("Error updating profit.");
    }
  };

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
                <Link to={"/admin"} className="text-gray-800 hover:text-blue-600">
                  <span className="icon">
                    <ion-icon name="home-outline"></ion-icon>
                  </span>
                  <span className="title">Dashboard</span>
                </Link>
              </li>
             
              <li>
                <Link onClick={handleLogout} className="text-gray-800 hover:text-blue-600">
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
                <p>Welcome {userData.fname}</p>
              </div>
            </div>

            <div className="details">
              <div className="cardHeader p-4 bg-white shadow-lg rounded-lg">
                <h2 className="text-2xl font-semibold text-gray-800 mb-4">Transactions</h2>
                <div className="recentTransact overflow-x-auto">
                  {transactions.length === 0 ? (
                    <p className="text-center text-gray-500">No Transactions</p>
                  ) : (
                    <div className="overflow-x-auto">
                      <table className="min-w-full table-auto">
                        <thead>
                          <tr className="border-b">
                            <th className="py-2 px-4 text-left text-gray-600">Transaction</th>
                            <th className="py-2 px-4 text-left text-gray-600">Type</th>
                            <th className="py-2 px-4 text-left text-gray-600">Amount</th>
                            <th className="py-2 px-4 text-left text-gray-600">Status</th>
                            <th className="py-2 px-4 text-left text-gray-600">Image</th>
                            <th className="py-2 px-4 text-left text-gray-600">Update Status</th>
                          </tr>
                        </thead>
                        <tbody>
                          {transactions.map((transaction) => (
                            <tr key={transaction._id} className="border-b">
                              <td className="py-2 px-4">{transaction.username}</td>
                              <td className="py-2 px-4">{transaction.type}</td>
                              <td className="py-2 px-4">${transaction.amount}</td>
                              <td className="py-2 px-4">{transaction.status}</td>
                              <td className="py-2 px-4">
                                <a
                                  href={transaction.image}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="text-blue-500 hover:underline"
                                >
                                  View Image
                                </a>
                              </td>
                              <td className="py-2 px-4">
                                <select
                                  className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                                  value={statusUpdates[transaction._id] || transaction.status}
                                  onChange={(e) =>
                                    handleStatusChangeSelect(transaction._id, e.target.value)
                                  }
                                >
                                  <option value="">Select Status</option>
                                  <option value="Success">Success</option>
                                  <option value="Failed">Failed</option>
                                  <option value="Pending">Pending</option>
                                </select>
                                <button
                                  className="mt-2 w-full py-2 px-4 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50"
                                  onClick={() => handleStatusChange(transaction._id)}
                                  disabled={loading[transaction._id]}
                                >
                                  {loading[transaction._id] ? "Updating..." : "Update"}
                                </button>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  )}
                </div>
              </div>

              <div>
                <form onSubmit={handleFunding} className="max-w-lg mx-auto p-6 bg-white shadow-md rounded-lg space-y-4">
                  <label className="block text-lg font-medium text-gray-700">Fund User</label>
                  <input
                    type="number"
                    value={balance}
                    onChange={(e) => setBalance(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter amount"
                  />
                  <button
                    type="submit"
                    className="w-full py-2 px-4 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    Submit
                  </button>
                </form>

                <form onSubmit={handleProfitUpdates} className="max-w-lg mx-auto p-6 bg-white shadow-md rounded-lg space-y-4 mt-6">
                  <label className="block text-lg font-medium text-gray-700">Add Profit</label>
                  <input
                    type="number"
                    value={profit}
                    onChange={(e) => setProfit(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                    placeholder="Enter profit amount"
                  />
                  <button
                    type="submit"
                    className="w-full py-2 px-4 bg-green-500 text-white rounded-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500"
                  >
                    Submit
                  </button>
                </form>
              </div>
            </div>
          </div>
          <ToastContainer />
        </div>
      )}
    </>
  );
}
