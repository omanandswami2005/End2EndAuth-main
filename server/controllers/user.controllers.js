import bcrypt from "bcrypt";
import chalk from "chalk";
import jwt from "jsonwebtoken";
import { User } from "../models/User.js";
import { generateRandomNumbers } from "../utils/generateRandomNumbers.js";
import { sendVerificationCodeEmail, sendVerificationEmail } from "../utils/mailer.js";

// const registerUser = async (req, res) => {
//     // console.log(req.body);
//     const { fullName, username, email, password } = req.body;
//     console.log(chalk.greenBright.bold( fullName, username, email, password ));

//     try {
//         if(!fullName || !username || !email || !password){
//             res.status(400).json({ message: "please fill all the required fields!" });
//         }

//         const existingUser = await User.findOne({ email });
//         if(existingUser){
//             res.status(400).json({ message: "email already in use!!" });
//         }

//         const hashedPassword = await bcrypt.hash(password, 10);
//         const verficationCode = generateRandomNumbers();
//         const user = new User({
//             fullName,
//             username,
//             email, 
//             password: hashedPassword,
//             verificationCode: verficationCode,
//             verificationCodeExpiry: Date.now() + 1 * 60 * 1000,
//             verified: false 
//         });

//         user.save();

//         // send the verification email
//         await sendVerificationCodeEmail(email, verficationCode);

//         res.status(200).json({ message: "please check verification email in the mail box!!", userId: user._id });
        
//     } catch (error) {
//         console.log(chalk.redBright.bold(error));
//         res.status(400).json({ message: "some error occured in registerUser controller!" });
//     }
// }

const registerUser = async (req, res) => {
    const { fullName, username, email, password } = req.body;
    console.log(chalk.greenBright.bold(fullName, username, email, password));

    try {
        // Check if all required fields are provided
        if (!fullName || !username || !email || !password) {
            return res.status(400).json({ message: "Please fill all the required fields!" });
        }

        // Check if email or username is already in use
        const existingUser = await User.findOne({ $or: [{ email }, { username }] });
        if (existingUser) {
            if (existingUser.email === email) {
                return res.status(400).json({ message: "Email is already in use!" });
            }
            if (existingUser.username === username) {
                return res.status(400).json({ message: "Username is already taken!" });
            }
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Generate a verification code
        const verificationCode = generateRandomNumbers();

        // Create a new user
        const user = new User({
            fullName,
            username,
            email,
            password: hashedPassword,
            verificationCode,
            verificationCodeExpiry: Date.now() + 1 * 60 * 1000, // 1 minute expiry
            verified: false
        });

        // Save the user to the database
        await user.save();

        // Send the verification email
        await sendVerificationCodeEmail(email, verificationCode);

        res.status(200).json({ message: "Please check your email for verification instructions!", userId: user._id, userEmail: user.email });

    } catch (error) {
        console.log(chalk.redBright.bold(error));
        res.status(400).json({ message: "An error occurred while registering the user." });
    }
}


const loginUser = async (req, res) => {
    const { email, password } = req.body;
    console.log(email, password);
    

    try {
        const user = await User.findOne({ email });
        console.log(user);
        // if(!user) return res.status(400).send("Invalid User 😱");
        // if(!user.verified) return res.status(400).send("Please Verify Your Email first!");

        // const isMatch = await bcrypt.compare(password, user.password);
        // if(!isMatch) return res.status(400).send("Invalid Username & Password!");

        // token
        const tokenLogin = jwt.sign({ id: user._id }, "JWT_SECRET", { expiresIn: "2d" });

        console.log(chalk.greenBright.bold(tokenLogin));


        res.status(200).send({ tokenLogin });
    } catch (error) {
        console.log(chalk.redBright.bold(error));
        res.status(400).json({ message: "some error occured in loginUser controller!" });
    }
}

const verifyCode = async(req, res) => {
    const { userId, code } = req.body;
    // verification...
    if(!userId || !code){
        return res.status(400).send("Please provide verification code!");
    } 

    try {
        const user = await User.findById(userId);
        if(!user) return res.status(400).send("Invalid User Id!");

        if(Date.now() > user.verificationCodeExpiry){
            return res.status(400).send("Verification code is expired!");
        }

        if(user.verificationCode !== code){
            return res.status(400).send("Wrong verification code!");
        }

        user.verified = true;
        user.verificationCode = undefined;
        user.verificationCodeExpiry = undefined;

        await user.save();

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "1h" });

        // res.cookie("token-a", token, {
        //     httpOnly: true,
        //     secure: true,
        //     sameSite: "none",
        //     maxAge: 1000 * 60 * 30,
        //     domain: "localhost",
        //     path: "/"    
        // })

        res.status(200).send({ message: "Email Verification is Successfully Done!", userId: user._id });
    } catch (error) {
        console.log(chalk.redBright.bold(error));
        res.status(400).json({ message: "some error occured in verifyCode controller!" });
    }
}

const resendVerifyCode = async(req, res) => {
    const { email } = req.body;
    if(!email) return res.status(400).send("Please provide the email address");

    try {
        const user = await User.findOne({ email });
        if(!user) return res.status(400).send("User with this Email is not found!!");
        if(user.verified) return res.status(400).send("User with this Email is alredy verified!");

        const verification_code = generateRandomNumbers();
        const expiryTime = Date.now() + 1 * 60 * 1000;

        user.verificationCode = verification_code;
        user.verificationCodeExpiry = expiryTime;

        await user.save();

        // send the verification email
        await sendVerificationCodeEmail(email, verification_code);

        res.status(200).send("Verification code re-sended succssfully!");

    } catch (error) {
        console.log(chalk.redBright.bold(error));
        res.status(400).json({ message: "some error occured in resendVerifyCode controller!" });
    }
}

const forgotPassword = async(req, res) => {
    const { email } = req.body;

    try {
        const user = await User.findOne({ email });
        if(!user) return res.status(400).send("User not found with this email!");

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "1h" });

        const resetLink = `http://localhost:3000/reset-password/${token}`;

        // send the verification email
        await sendVerificationEmail(email, resetLink);

        res.status(200).send("Password reset email successfully send!");
    } catch (error) {
        console.log(chalk.redBright.bold(error));
        res.status(400).json({ message: "some error occured in forgotPassword controller!" });
    }
}

const resetPassword = async(req, res) => {
    const { token } = req.params;
    const { newPassword } = req.body;

    if(!newPassword)  return res.status(400).send("Please Provide your new password!!");

    try {
        const decodedTokenData = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findById(decodedTokenData.id);

        if(!user) return res.status(400).send("User Not Found!");

        const hashedPassword = await bcrypt.hash(newPassword, 10);
        user.password = hashedPassword;

        await user.save();

        res.status(200).send("Password Reset Successfully!");
    } catch (error) {
        console.log(chalk.redBright.bold(error));
        res.status(400).json({ message: "some error occured in resetpassword controller!" });
    }
}

const logoutUser = async(req, res) => {
    try {
        res.clearCookie("token", {
            httpOnly: true,
            secure: true,
            sameSite: "none",
            domain: "localhost",
            path: "/"  
        })

        res.status(200).send("User Logout Successfully!");
    } catch (error) {
        console.log(chalk.redBright.bold(error));
        res.status(400).json({ message: "some error occured in logout controller!" });
    }
}

export {
    registerUser,
    verifyCode,
    loginUser,
    resendVerifyCode,
    forgotPassword,
    resetPassword,
    logoutUser
}