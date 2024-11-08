import mongoose from "mongoose";

const transactionSchema = new mongoose.Schema({
  username: { type: String, required: true },
  type: { type: String, required: true },
  amount: { type: Number, required: true },
  status: { type: String, required: true, enum: ["pending", "success", "failed", "progress"] },
},{
  timestamps: true
});

const transactionModel = mongoose.model("transaction", transactionSchema);

// Use ES6 export
export default transactionModel;
