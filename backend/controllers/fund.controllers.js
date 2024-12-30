import fundModel from "../models/Fund.js";
import userModel from "../models/User.js";

const fundData = async (req, res) => {
    const validUser = req.user
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
        { username: validUser.username },                   
        { amount, plan },               
        { new: true, upsert: true }      
      );
  
        // const updateBalance = await userModel.findOneAndUpdate(
        //     { username: validUser.username },
        //    {$inc: { balance: amount}},
        //     {new: true, upsert: true}
        // )



      res.status(201).json({
        success: true,
        message: "Fund updated successfully",
        data: updatedFund
        });
    } catch (error) {
      console.error("Error updating or creating fund:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  };

  export {fundData}