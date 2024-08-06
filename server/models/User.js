import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    fullName: {
        type: String,
        required: true,
        unique: true   
    }, 
    username: {
        type: String,
        required: true,
        unique: true  
    },
    email: {
        type: String,
        required: true,
        unique: true   
    },
    password: {
        type: String,
        required: true  
    },
    verificationCode: {
        type: String 
    },
    verificationCodeExpiry: {
        type: Date 
    },
    verified: {
        type: Boolean,
        default: false 
    }
}, {
    timestamps: true 
});

export const User = mongoose.model("User", userSchema);