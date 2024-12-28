import bcrypt from "bcrypt";
import userModel from "../models/User.js";
import validator from "validator";
import jwt from "jsonwebtoken";

// Registration endpoint
const registerUser = async (req, res) => {
    const {
      username,
      fname,
      lname,
      date,
      address,
      country,
      phone,
      email,
      password,
    } = req.body;

    if (!username || !fname || !lname || !date || !address || !country || !phone || !email || !password) {
        res.status(404).json({
            success:false,
            message: "All fields are required"
        })
        return;
    }
  
    try {
      // Check if email or username already exists
      const existingEmail = await userModel.findOne({ email });
      const existingUser = await userModel.findOne({ username });
  
      if (existingEmail) {
        return res.status(400).json({ success: false, message: "Email already in use" });
      }
      if (existingUser) {
        return res.status(409).json({ success: false, message: "Username not available" });
      }
  
      // Validate email format
      if (!validator.isEmail(email)) {
        return res.status(400).json({ success: false, message: "Please enter a valid email" });
      }
  
      // Validate password length
      if (password.length < 8) {
        return res.status(400).json({ success: false, message: "Please enter a strong password (min. 8 characters)" });
      }
  
      // Hash password
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);
  
      // Create a new user
      const newUser = await userModel.create({
        username,
        fname,
        lname,
        date,
        address,
        country,
        phone,
        email,
        password: hashedPassword,
      });
  
     res.status(200).json({
        success:true,
        message: "User registered successfully",
        user: newUser,
     })
    } catch (error) {
      console.error("Signup error:", error);
      res.status(500).json({ success: false, message: "Internal Server Error" });
    }
  };


// Login endpoint
const loginUser = async (req, res) => {
    const { username, password } = req.body;
  
    if(!username || !password) {
        res.status(404).json({
          success: false,
          message: "All Fields Required"
        })
        return;
    }

    try {
      const user = await userModel.findOne({ username });
  
      if (!user) {
        return res.status(400).json({ success:false, message: "User Not Found" });
      }
      const passwordMatch = await bcrypt.compare(password, user.password);
      if (!passwordMatch) {
        return res.status(409).json({ success:false, message: "invalid password" });
      }
 
  
      const AccessToken = jwt.sign(
        {accessToken: user._id},
         process.env.JWT_SECRET_access, 
        {expiresIn: process.env.accessTime}
      );
  
      const RefreshToken = jwt.sign(
        {refreshToken: user._id},
         process.env.JWT_SECRET_refresh, 
        {expiresIn: process.env.refreshTime}
      );
  
    res.cookie("accesstoken", AccessToken, {
     // httpOnly: true,
     // secure: true,
      sameSite: 'none',
      maxAge: 30 * 60 * 1000
    })
    res.cookie("refreshtoken", RefreshToken, {
      //httpOnly: true,
      //secure: true,
      sameSite: 'none',
      maxAge: 2 * 60 * 60 * 1000
    })
      
    res.status(200).json({
      success: true,
      message: "login successful",
     
    });
      
    } catch (error) {
      console.log(error);
      res.json({ success:false, message: "Internal Server Error" });
    }
  };
  

 const allUsers = async (req, res) => {
    try {
      const users = await userModel.find({}); // Fetch all users
      res.json({ status: 'ok', data: users });
    } catch (error) {
      res.status(500).json({ status: 'error', message: 'Error fetching users: ' + error.message });
    }
  };

  const validate = async (req, res) => {

    const validuser = req.user;
    
        
      if (validuser) {
        res.status(200).json({
          success: true,
          message: "User valid",
          user: validuser,
        });
      } else {
        res.status(403).json({
          success: false,
          message: "Session expired",
        });
      }
    }

  export {registerUser, loginUser, allUsers, validate}