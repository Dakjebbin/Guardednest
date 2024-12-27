import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    username: { type: String, unique: true, required: true },
    fname: String,
    lname: String,
    date: String,
    address: String,
    country: String,
    phone: Number,
    email: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    balance: { type: Number, default: 0 },
    profit: { type: Number, default: 0 },
    isAdmin: {
        type: String,
        default: "USER",       
    }
},{
    timestamps: true
});

const userModel = mongoose.models.users || mongoose.model("users", userSchema);

// Use ES6 export
export default userModel;
