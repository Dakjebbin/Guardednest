import transactionModel from "../models/Transact.js";
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



export {transact}

    