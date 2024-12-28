import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import cookieParser from "cookie-parser";


import jwt from "jsonwebtoken";
import userModel from "./models/User.js";
import fundModel from "./models/Fund.js";
import transactionModel from "./models/Transact.js";
import withdrawModel from "./models/Withdraw.js";
import dotenv from "dotenv"
import authRoutes from "./routes/user.routes.js"

dotenv.config()


//Middleware
const app = express();
const port = process.env.PORT || 2006;
const dataBase = process.env.MONGODB_URL
app.use(express.json());
app.use(cors({
   origin: ['http://localhost:5173', 'http://localhost:5174'],
   credentials: true,
 }));
app.use(cookieParser());
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: "Something went wrong" });
});

app.use("/auth", authRoutes)


// db connect
mongoose.connect(dataBase).then(() => {
  console.log("DB Connected");
  app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
  }); 
})



// app.get('/users/:username', async (req, res) => {
//   const { username } = req.params;  // Get username from route parameters
//   try {
//     const user = await userModel.findOne({ username });
//     if (!user) {
//       return res.status(404).json({ status: 'error', message: 'User not found' });
//     }

//     // req.session.username = user.username;

//     res.json({ status: 'ok', data: user });
//   } catch (error) {
//     res.status(500).json({ status: 'error', message: 'Error fetching user: ' + error.message });
//   }
// });

app.post("/saveData",  async (req, res) => {
  const { balance, profit } = req.body;
  // Save balance and profit to the database
  try {
    const updatedData = await userModel.updateOne(
      { username: req.username }, // Use username from verified token
      { balance, profit },
      { new: true, upsert: true }
    );
    res.json({ status: "ok", data: updatedData });
  } catch (error) {
    res.json({ status: "error", error: "Failed to save user data" });
  }
});

//   const { token } = req.body;
//   console.log("Received token:", token);
//   try {
//     if (!token) {
//       return res.status(400).json({ error: "Token not provided" });
//     }

//     // Verify the token
//     const user = jwt.verify(token, JWT_SECRET);
//     console.log("Decoded user from token:", user);

//     const username = user.username;
//     const data = await userModel.findOne({ username: username });

//     if (data) {
//       return res.status(200).json({ status: "ok", data: data });
//     } else {
//       return res
//         .status(404)
//         .json({ status: "error", error: "User data not found" });
//     }
//   } catch (error) {
//     console.error("Error:", error);
//     return res.status(400).json({ error: "Invalid token" });
//   }
// });


// Endpoint to add funds

app.post("/userData", async (req, res) => {
  try {
    const data = await userModel.findOne({ username: req.username });
    if (data) {
      return res.status(200).json({ status: "ok", data });
    } else {
      return res.status(404).json({ status: "error", error: "User data not found" });
    }
  } catch (error) {
    console.error("Error:", error);
    return res.status(400).json({ error: "Invalid token" });
  }
});

// app.post("/user/fund", async (req, res) => {
//   const { token, amount, plan } = req.body;

//   try {
//     if (!amount || !plan) {
//       return res.status(400).json({ error: "Amount and plan are required" });
//     }

//     if (amount <= 0) {
//       return res.status(400).json({ error: "Invalid amount" });
//     }

//     // Decode the token to get the user ID
//     const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
//     const userId = decodedToken.id; // Assuming the token contains user ID

//     // Fetch the user by ID to get the username
//     const user = await userModel.findById(userId);
//     if (!user) {
//       return res.status(404).json({ error: "User not found" });
//     }
//     const username = user.username;

//     // Use findOneAndUpdate to either update an existing document or create a new one
//     const updatedFund = await fundModel.findOneAndUpdate(
//       { username },                   
//       { amount, plan },               
//       { new: true, upsert: true }      
//     );

//     res.status(201).json(updatedFund);
//   } catch (error) {
//     console.error("Error updating or creating fund:", error);
//     res.status(500).json({ error: "Internal Server Error" });
//   }
// });



// Endpoint to retrieve fund data

app.post("/user/fund",  async (req, res) => {
  const { amount, plan } = req.body;

  try {
    if (!amount || !plan) {
      return res.status(400).json({ error: "Amount and plan are required" });
    }

    if (amount <= 0) {
      return res.status(400).json({ error: "Invalid amount" });
    }

    // Use findOneAndUpdate to either update an existing document or create a new one
    const updatedFund = await fundModel.findOneAndUpdate(
      { username: req.username },                   
      { amount, plan },               
      { new: true, upsert: true }      
    );

    res.status(201).json(updatedFund);
  } catch (error) {
    console.error("Error updating or creating fund:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});


// app.post("/fundData", async (req, res) => {
//   const { token } = req.body;
//   try {
//     const decodedToken = jwt.verify(token, JWT_SECRET);
//     const username = decodedToken.username;
//     const fund = await fundModel.findOne({ username });

//     if (fund) {
//       return res.status(200).json({ status: "ok", data: fund });
//     } else {
//       return res
//         .status(404)
//         .json({ status: "error", error: "Fund data not found for the user" });
//     }
//   } catch (error) {
//     console.error("Error:", error);
//     return res.status(400).json({ error: "Invalid token" });
//   }
// });


app.post("/fundData", async (req, res) => {
  try {
    const fund = await fundModel.findOne({ username: req.username });

    if (fund) {
      return res.status(200).json({ status: "ok", data: fund });
    } else {
      return res.status(404).json({ status: "error", error: "Fund data not found for the user" });
    }
  } catch (error) {
    console.error("Error:", error);
    return res.status(400).json({ error: "Invalid token" });
  }
});

 app.post("/transactions", async (req, res) => {
  const { username, type, status, amount } = req.body;
   try {
    const newTransaction = new transactionModel({
      username,
       type,
      amount,
       status,
    });
    await newTransaction.save();
    res.json({ status: "ok", data: newTransaction });
  } catch (error) {
    console.error("Error creating transaction:", error);
    res.status(500).json({ status: "error", error: "Failed to create transaction" });
   }
 });



// Backend - Express.js route for fetching transactions by username

/*
app.post("/transactions", async (req, res) => {
  const { type, status, amount } = req.body;
  try {
    const newTransaction = new transactionModel({
      username: req.username,
      type,
      amount,
      status,
    });
    await newTransaction.save();
    res.json({ status: "ok", data: newTransaction });
  } catch (error) {
    console.error("Error creating transaction:", error);
    res.status(500).json({ status: "error", error: "Failed to create transaction" });
  }
});
*/

app.get("/transactions/:username", async (req, res) => {
  const { username } = req.params;
  try {
    // Find transactions by username
    const transactions = await transactionModel.find({ username });

    if (transactions.length > 0) {
      res.json({ status: "ok", data: transactions });
    } else {
      res.status(404).json({ status: "error", error: "No transactions found" });
    }
  } catch (error) {
    console.error("Error fetching transactions:", error);
    res.status(500).json({ status: "error", error: "Failed to fetch transactions" });
  }
});


//for the admin panel to update status
app.patch("/transactions-update/:id", async (req, res) => {
  const { id } = req.params; // Get the transaction ID from the URL parameters
  const { status } = req.body;

  try {
    const updatedTransaction = await transactionModel.findByIdAndUpdate(
      id, // Update the transaction using the ID from the URL
      { status },
      { new: true } // Return the updated document
    );

    if (!updatedTransaction) {
      return res.status(404).json({ status: "error", error: "Transaction not found" });
    }

    res.json({ status: "ok", data: updatedTransaction });
  } catch (error) {
    console.error("Error updating transaction status:", error);
    res.status(500).json({ status: "error", error: "Failed to update status" });
  }
});
// Add this route to your backend


// Update transaction status
/*
app.patch("/transactions-update/:id", verifyToken, async (req, res) => {
  const { id } = req.params; // Use id from route parameters
  const { status } = req.body;
  try {
    const updatedTransaction = await transactionModel.findByIdAndUpdate(
      id,
      { status },
      { new: true }
    );
    if (!updatedTransaction) {
      return res.status(404).json({ status: "error", error: "Transaction not found" });
    }
    res.json({ status: "ok", data: updatedTransaction });
  } catch (error) {
    console.error("Error updating transaction status:", error);
    res.status(500).json({ status: "error", error: "Failed to update status" });
 }
 });
*/
app.post("/transactions-add", async (req, res) => {

  try {
    const { username, type, amount, status } = req.body; // Extract transaction details from the request body

    // Check if the required fields are present
    if (!username || !type || !amount || !status) {
      return res.status(400).json({ status: "error", error: "Missing required fields" });
    }

    // Create a new transaction
    const newTransaction = new transactionModel({
      username,
      type,
      amount,
      status,
    });

    await newTransaction.save(); // Save the new transaction to the database

    res.json({ status: "ok", data: newTransaction });
  } catch (error) {
    console.error("Error adding transaction:", error);
    res.status(500).json({ status: "error", error: "Failed to add transaction" });
  }
});



// app.post("/withdraw", async (req, res) => {
//   const token = req.headers["authorization"]?.split(" ")[1]; // Extract token from Authorization header

//   if (!token) {
//     console.error("No token provided");
//     return res
//       .status(401)
//       .json({ success: false, message: "No token provided" });
//   }

//   try {
//     const decodedToken = jwt.verify(token, JWT_SECRET);
//     const username = decodedToken.username;


//     const { acctnum, amount, acctname, bank, paypal, wallet, cashtag } = req.body;
//     const newWithdrawal = new withdrawModel({
//       username,
//       acctname,
//       acctnum,
//       amount,
//       bank,
//       paypal,
//       wallet,
//       cashtag 
//     });

//     await newWithdrawal.save();

//     res.json({ status: "ok", data: newWithdrawal });
//   } catch (error) {
//     console.error("Error creating newWithdrawal:", error);
//     res
//       .status(500)
//       .json({ status: "error", error: "Failed to create newWithdrawal" });
//   }
// });


app.post("/withdraw",  async (req, res) => {
  const { acctnum, amount, acctname, bank, paypal, wallet, cashtag } = req.body;
  if (!req.username) {
    return res.status(400).json({ status: "error", message: "Username is missing" });
  }

  try {
    const newWithdrawal = new withdrawModel({
      username: req.username,
      acctname,
      acctnum,
      amount,
      bank,
      paypal,
      wallet,
      cashtag
    });

    await newWithdrawal.save();
    res.json({ status: "ok", data: newWithdrawal });
  } catch (error) {
    console.error("Error creating newWithdrawal:", error);
    res.status(500).json({ status: "error", message: "Failed to create newWithdrawal" });
  }
});

app.post("/withdraw-cashapp", async (req, res) => {
  const token = req.headers["authorization"]?.split(" ")[1]; // Extract token from Authorization header

  if (!token) {
    console.error("No token provided");
    return res
      .status(401)
      .json({ success: false, message: "No token provided" });
  }

  try {
    const decodedToken = jwt.verify(token, JWT_SECRET);
    const username = decodedToken.username;


    const { cashtag, amount, } = req.body;
    const newCashapp = new cashAppModel({
      username,
      cashtag,
      amount
    });

    await newCashapp.save();

    res.json({ status: "ok", data: newCashapp });
  } catch (error) {
    console.error("Error creating newCashapp:", error);
    res
      .status(500)
      .json({ status: "error", error: "Failed to create newCashapp" });
  }
});

app.post("/withdraw-crypto", async (req, res) => {
  const token = req.headers["authorization"]?.split(" ")[1]; // Extract token from Authorization header

  if (!token) {
    console.error("No token provided");
    return res
      .status(401)
      .json({ success: false, message: "No token provided" });
  }

  try {
    const decodedToken = jwt.verify(token, JWT_SECRET);
    const username = decodedToken.username;


    const { wallet, amount, } = req.body;
    const newCrypto = new cryptoModel({
      username,
      wallet,
      amount
    });

    await newCrypto.save();

    res.json({ status: "ok", data: newCrypto });
  } catch (error) {
    console.error("Error creating newCrypto:", error);
    res
      .status(500)
      .json({ status: "error", error: "Failed to create newCrypto" });
  }
});

app.post("/withdraw-paypal", async (req, res) => {
  const token = req.headers["authorization"]?.split(" ")[1]; // Extract token from Authorization header

  if (!token) {
    console.error("No token provided");
    return res
      .status(401)
      .json({ success: false, message: "No token provided" });
  }

  try {
    const decodedToken = jwt.verify(token, JWT_SECRET);
    const username = decodedToken.username;


    const { paypal, amount, } = req.body;
    const newPayPal = new payPalModel({
      username,
      paypal,
      amount
    });

    await newPayPal.save();

    res.json({ status: "ok", data: newPayPal });
  } catch (error) {
    console.error("Error creating newPayPal:", error);
    res
      .status(500)
      .json({ status: "error", error: "Failed to create newPayPal" });
  }
});


app.get('/',(req, res) => {
  res.send('API Working')
});


