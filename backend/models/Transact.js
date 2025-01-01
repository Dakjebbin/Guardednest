import mongoose from "mongoose";

const transactionSchema = new mongoose.Schema({
  username: { type: String, required: true },
  plan: { type: String},
  type: { type: String, required: true, enum: ["Deposit", "Profit", "Withdrawal"]  },
  amount: { type: Number, required: true },
  status: { type: String, required: true, enum: ["Pending", "Successfull", "Failed", "Progress"],
     default: "Pending" },
     image: { type: String},
     optimizedImageUrl: { type: String },
     croppedImageUrl: { type: String },
},{
  timestamps: true
});

const transactionModel = mongoose.model("transaction", transactionSchema);

// Use ES6 export
export default transactionModel;
