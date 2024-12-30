import transactionModel from "../models/Transact.js";

const transact = async (req, res) => {
    const  {plan, amount, image} = req.body;
    const validUser = req.user;

    if(!plan || !amount) {
        res.status(400).json({
            success: false,
            message: "Plan and amount are required"
        })
    }

    try {
        const newTransaction = new transactionModel({
            username: validUser._id,
             type: "Deposit",
             plan,
            amount,
             image
            });

      await newTransaction.save();

      res.status(200).json({
        success: true,
        message: "Transaction created successfully",
        data: newTransaction
      })
    } catch (error) {
            res.status(500).json({ 
                success:false,
                message: "Internal Server Error" +error.message 
            });
    }
}

export {transact}

    