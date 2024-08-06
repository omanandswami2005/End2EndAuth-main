// import React, { useState } from "react";
// import {
//   Card,
//   CardContent,
//   CardDescription,
//   CardFooter,
//   CardHeader,
//   CardTitle,
// } from "@/components/ui/card";
// import {
//   InputOTP,
//   InputOTPGroup,
//   InputOTPSeparator,
//   InputOTPSlot,
// } from "@/components/ui/input-otp";
// import { Label } from "@/components/ui/label";
// import { Input } from "@/components/ui/input";
// import { Button } from "@/components/ui/button";
// import { FaEye, FaEyeSlash } from "react-icons/fa";
// import { Link } from "react-router-dom";

// const VerifyCode = () => {
//   const [passwordVisible, setPasswordVisible] = useState(false);

//   const togglePasswordVisibility = () => {
//     setPasswordVisible(!passwordVisible);
//   };

//   return (
//     <div>
//       <div className="flex justify-center">
//         <Card className="w-[300px] mt-5">
//           <CardHeader>
//             <CardTitle className="text-3xl">Verification Code</CardTitle>
//             <CardDescription>Enter Code to Verify Your Email</CardDescription>
//           </CardHeader>

//           <CardContent>
//             <form>
//               <div className="grid w-full items-center gap-4">
//                 <Label>Enter Verification Code!</Label>
//                 <div>
//                   <InputOTP maxLength={6}>
//                     <InputOTPGroup>
//                       <InputOTPSlot index={0} />
//                       <InputOTPSlot index={1} />
//                       <InputOTPSlot index={2} />
//                     </InputOTPGroup>
//                     <InputOTPSeparator />
//                     <InputOTPGroup>
//                       <InputOTPSlot index={3} />
//                       <InputOTPSlot index={4} />
//                       <InputOTPSlot index={5} />
//                     </InputOTPGroup>
//                   </InputOTP>
//                 </div>
//               </div>
//             </form>
//           </CardContent>

//           <CardFooter className="flex flex-col space-y-1">
//             <Button className="w-[60%]">Verify</Button>
//             <Button className="w-[60%]">Resend</Button>
//           </CardFooter>
//         </Card>
//       </div>
//     </div>
//   );
// };

// import { useState } from 'react';
// import {
//   InputOTP,
//   InputOTPGroup,
//   InputOTPSeparator,
//   InputOTPSlot,
// } from "@/components/ui/input-otp";

// export default function VerifyCode() {
//   const [otp, setOtp] = useState('');

//   const handleOtpChange = (newOtp) => {
//     setOtp(newOtp);
//     console.log('OTP:', newOtp); // Log the OTP to the console
//   };

//   return (
//     <InputOTP maxLength={6} onComplete={handleOtpChange}>
//       <InputOTPGroup>
//         <InputOTPSlot index={0} />
//         <InputOTPSlot index={1} />
//         <InputOTPSlot index={2} />
//       </InputOTPGroup>
//       <InputOTPSeparator />
//       <InputOTPGroup>
//         <InputOTPSlot index={3} />
//         <InputOTPSlot index={4} />
//         <InputOTPSlot index={5} />
//       </InputOTPGroup>
//     </InputOTP>
//   );
// }

import React, { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import axios from "axios"; // Assuming you use axios for API requests
import { toast } from "react-toastify"; // Assuming you use react-toastify for toasts

import axiosInstance from "@/utils/axiosInstance";

const VerifyCode = () => {
  const navigate = useNavigate();

  const [countdown, setCountdown] = useState(0);
  const [resendDisabled, setResendDisabled] = useState(false);
  const [otp, setOtp] = useState("");


  const handleOtpChange = (newOtp) => {
    setOtp(newOtp);
    console.log("OTP:", newOtp); // Log the OTP to the console
    // console.log("payload ", {userId, otp});

  };



  useEffect(() => {
    let timer;
    if (countdown > 0) {
      timer = setInterval(() => {
        setCountdown((prevCountdown) => prevCountdown - 1);
      }, 1000);
    } else {
      setResendDisabled(false);
    }
    return () => clearInterval(timer);
  }, [countdown]);

  const handleResend = async () => {
    setResendDisabled(true);
    setCountdown(60);

    const userEmail = localStorage.getItem("user-email");
    const userId = localStorage.getItem("user-id");

    try {
      const response = await axios.post("/api/v1/user/resend-code", {
        email: userEmail,
        userId,
      });
      if (response.status === 200) {
        toast.success("Verification code resent successfully!");
      }
    } catch (error) {
      console.error("Error resending verification code:", error);
      toast.error("Failed to resend verification code.");
    }
  };

  const handleVerify = async (e) => {
    e.preventDefault();
    const userId = localStorage.getItem("user-id");
    // const code = 
    console.log("payload ", {userId, otp});

    try {
      // const res = await axios.post("/api/v1/user/verify", { userId, otp });
      const res = await axiosInstance.post('/api/v1/user/verify', { userId, code: otp });
      console.log("verify bg res ",res);
      
      if (res.status === 200) {
        toast.success("Email verification successful!");
        navigate("/login");
      }
    } catch (error) {
      console.error("Error verifying code:", error);
      toast.error(
        error.res?.data || "Verification failed. Please try again."
      );
    }
  };

  return (
    <div>
      <div className="flex justify-center">
        <Card className="w-[300px] mt-5">
          <CardHeader>
            <CardTitle className="text-3xl">Verification Code</CardTitle>
            <CardDescription>Enter Code to Verify Your Email</CardDescription>
          </CardHeader>

          <CardContent>
            <form onSubmit={handleVerify}>
              <div className="grid w-full items-center gap-4">
                <Label>Enter Verification Code!</Label>
                <div>
                  <InputOTP maxLength={6} onComplete={handleOtpChange}>
                    <InputOTPGroup>
                      <InputOTPSlot index={0} />
                      <InputOTPSlot index={1} />
                      <InputOTPSlot index={2} />
                    </InputOTPGroup>
                    <InputOTPSeparator />
                    <InputOTPGroup>
                      <InputOTPSlot index={3} />
                      <InputOTPSlot index={4} />
                      <InputOTPSlot index={5} />
                    </InputOTPGroup>
                  </InputOTP>
                </div>
              </div>
              <Button type="submit" className="w-[60%]">
                Verify
              </Button>
            </form>
          </CardContent>

          <CardFooter className="flex flex-col space-y-1">
            <Button
              className="w-[60%]"
              onClick={handleResend}
              disabled={resendDisabled}
            >
              Resend {resendDisabled && `(${countdown}s)`}
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default VerifyCode;
