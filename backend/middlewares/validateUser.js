import jwt from "jsonwebtoken"
import userModel from "../models/User.js";

export const validateUser = async (req, res, next) => {
    const accessToken = req.cookies.accesstoken;
    const refreshToken = req.cookies.refreshtoken;
    
    if (!accessToken) {
        if (!refreshToken) {
            return res.status(401).json({ 
                success: false,
                message: "Session expired. Please login again"
            });
        } else {
            jwt.verify(refreshToken, process.env.JWT_SECRET_refresh, async (err, decoded) => {
                if (err) {
                    return res.status(403).json({
                        success: false,
                        message: "Session expired"
                    });
                } else {
                    const validUser = await userModel.findById(decoded.refreshToken).exec();

                    if(!validUser) {
                        res.status(403).json({
                            success: false,
                            message: "not found"
                        });
                        return;
                    }

                    const AccessToken = jwt.sign(
                        {accessToken: user._id},
                         process.env.JWT_SECRET_access, 
                        {expiresIn: process.env.accessTime}
                      );

                      res.cookie("accesstoken", AccessToken, {
                        httpOnly: true,
                         secure: false,
                         sameSite: 'Lax',
                         maxAge: 30 * 60 * 1000
                       })
                       const { password, ...rest } = validUser._doc;
                    req.user = rest;
            next();
                }
            })
        }
    } else{
            jwt.verify(accessToken, process.env.JWT_SECRET_access, async (err, decoded) => {
                if (err) {
                    res.status(403).json({
                        success:false,
                        message: "Session expired. Please login again"
                    })
                    return;
                } else{
                    const validUser = await userModel.findById(decoded.accessToken).exec();

                    if(!validUser) {
                        res.status(403).json({
                            success: false,
                            message: "not found"
                        });
                        return;
                    }
                    const { password, ...rest } = validUser._doc;
                    req.user = rest;
            next();
                }
            })
    }
}

