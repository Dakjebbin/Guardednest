import transactionModel from "../models/Transact.js";
import userModel from "../models/User.js";
import cloudinary from "../utils/cloudinary.js";

const transact = async (req, res) => {
    const  {plan, amount, image} = req.body;
    const validUser = req.user;

    if(!plan || !amount || !image) {
        res.status(400).json({
            success: false,
            message: "Plan and amount are required"
        })
        return;
    }

    try {

        const result = await cloudinary.uploader.upload(image, {
            folder: 'payments/proofs',
            public_id: validUser.email,
        });

        const optimizeUrl = cloudinary.url(result.public_id, {
            fetch_format: 'auto',
            quality: 'auto'
        });

        const autoCropUrl = cloudinary.url(result.public_id, {
            crop: 'auto',
            gravity: 'auto',
            width: 500,
            height: 500,
        });


        const newTransaction = new transactionModel({
            username: validUser._id,
             type: "Deposit",
             plan,
            amount,
            image: result.secure_url,
            optimizedImageUrl: optimizeUrl,  // Optimized image URL
            croppedImageUrl: autoCropUrl,
            });

      await newTransaction.save();

      res.status(200).json({
        success: true,
        message: "Transaction created successfully",
        data: newTransaction
      })
    } catch (error) {
        if (error.response && error.response.error) {
            // Handle Cloudinary specific errors
            return res.status(500).json({
                success: false,
                message: `Cloudinary upload error: ${error.response.error.message}`
            });
        }

            res.status(500).json({ 
                success:false,
                message: "Internal Server Error" + error.message 
            });
    }
}

const updateTransactionStatus = async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  if (!status) {
    return res.status(400).json({ status: "error", error: "Status is required" });
  }

  try {
    const transaction = await transactionModel.findById(id).exec()

    if (!transaction) {
      return res.status(404).json({ status: "error", error: "Transaction not found" });
    }
  

  transaction.status = status;
    await transaction.save();

    res.status(200).json({ 
      success:true,
      message: "Status updated successfully"
    })
  } catch (error) {
    
    res.status(500).json({ 
      success:false,
      message: "Internal Server Error" + error.message 
  });
  }
}


const getTransaction = async (req, res) => {
    const validUser = req.user;
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
      };



export {transact, getTransaction, updateTransactionStatus};

    