// import { useState } from "react"
// import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card"
// import { Label } from "@/components/ui/label"
// import { Input } from "@/components/ui/input"
// import { Button } from "@/components/ui/button"
// import { FaEye, FaEyeSlash } from "react-icons/fa";


// export default function ResetPassword() {

//     // password toggle use state
//   const [newPasswordVisible, setNewPasswordVisible] = useState(false);
//   const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);

//   const toggleNewPasswordVisibility = () => {
//     setNewPasswordVisible(!newPasswordVisible);
//   };

//   const toggleConfirmedPasswordVisibility = () => {
//     setConfirmPasswordVisible(!confirmPasswordVisible);
//   };

//   return (
//     <Card className="w-full max-w-md mx-auto mt-5">
//       <CardHeader>
//         <CardTitle>Reset Password</CardTitle>
//         <CardDescription>Enter your email and a new password to reset your account password.</CardDescription>
//       </CardHeader>
//       <CardContent className="space-y-4">
//         <div className="space-y-2">
//           <Label htmlFor="password">New Password</Label>
//           <div className="relative">
//                     <Input
//                       type={newPasswordVisible ? "text" : "password"}
//                       id="password"
//                       placeholder="Enter Your Password"
//                       className="pr-10"
//                     />
//                     <button
//                       type="button"
//                       className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-600"
//                       onClick={toggleNewPasswordVisibility}
//                     >
//                       {newPasswordVisible ? <FaEyeSlash /> : <FaEye />}
//                     </button>
//                   </div>
//         </div>
       
//         <div className="space-y-2">
//           <Label htmlFor="confirmPassword">Confirm Password</Label>
//           <div className="relative">
//                     <Input
//                       type={confirmPasswordVisible ? "text" : "password"}
//                       id="confirmPassword"
//                       placeholder="Enter Your Password"
//                       className="pr-10"
//                     />
//                     <button
//                       type="button"
//                       className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-600"
//                       onClick={toggleConfirmedPasswordVisibility}
//                     >
//                       {confirmPasswordVisible ? <FaEyeSlash /> : <FaEye />}
//                     </button>
//                   </div>
//         </div>
//       </CardContent>
//       <CardFooter>
//         <Button className="w-full">Reset Password</Button>
//       </CardFooter>
//     </Card>
//   )
// }



import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { toast } from "react-toastify"; // Make sure to install and import react-toastify

export default function ResetPassword() {
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [newPasswordVisible, setNewPasswordVisible] = useState(false);
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);
  const navigate = useNavigate();
  const token = new URLSearchParams(window.location.search).get("token"); // Assuming token is passed as a query parameter

  const toggleNewPasswordVisibility = () => {
    setNewPasswordVisible(!newPasswordVisible);
  };

  const toggleConfirmedPasswordVisibility = () => {
    setConfirmPasswordVisible(!confirmPasswordVisible);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check if passwords match
    if (newPassword !== confirmPassword) {
      toast.error("Passwords do not match!");
      return;
    }

    try {
      const response = await fetch(`/api/v1/user/reset-password/${token}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ newPassword }),
      });

      if (response.ok) {
        toast.success("Password reset successfully!");
        navigate("/login");
      } else {
        const errorMessage = await response.text();
        toast.error(errorMessage || "Failed to reset password!");
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error("An error occurred. Please try again.");
    }
  };

  return (
    <Card className="w-full max-w-md mx-auto mt-5">
      <CardHeader>
        <CardTitle>Reset Password</CardTitle>
        <CardDescription>Enter your new password to reset your account password.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <form onSubmit={handleSubmit}>
          <div className="space-y-2">
            <Label htmlFor="password">New Password</Label>
            <div className="relative">
              <Input
                type={newPasswordVisible ? "text" : "password"}
                id="password"
                placeholder="Enter Your Password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className="pr-10"
              />
              <button
                type="button"
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-600"
                onClick={toggleNewPasswordVisibility}
              >
                {newPasswordVisible ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="confirmPassword">Confirm Password</Label>
            <div className="relative">
              <Input
                type={confirmPasswordVisible ? "text" : "password"}
                id="confirmPassword"
                placeholder="Confirm Your Password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="pr-10"
              />
              <button
                type="button"
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-600"
                onClick={toggleConfirmedPasswordVisibility}
              >
                {confirmPasswordVisible ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
          </div>

          <CardFooter>
            <Button type="submit" className="w-full">Reset Password</Button>
          </CardFooter>
        </form>
      </CardContent>
    </Card>
  );
}
