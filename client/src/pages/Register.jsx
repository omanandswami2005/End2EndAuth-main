import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import { registerValidationSchema } from "@/utils/registerValidationSchema";
import { useDispatch } from "react-redux";
import { signup } from "../actions/authActions";
import Loader from "@/components/ui/Loader";
import { toast } from "react-toastify";

const Register = () => {
  const dispatch = useDispatch(); // Initialize dispatch
  const navigate = useNavigate(); // Initialize navigate

  // Password toggle state
  const [passwordVisible, setPasswordVisible] = useState(false);

  // Loader state
  const [isLoading, setIsLoading] = useState(false);

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  // Formik setup
  const formik = useFormik({
    initialValues: {
      firstname: '',
      lastname: '',
      username: '',
      email: '',
      password: '',
    },
    validationSchema: registerValidationSchema,
    onSubmit: async (values) => {
      setIsLoading(true); // Show loader
      const fullName = `${values.firstname} ${values.lastname}`;
      const user = {
        fullName,
        username: values.username,
        email: values.email,
        password: values.password,
      };

      try {
        // Send the signup request
        await dispatch(signup(user.fullName, user.username, user.email, values.password));
        setIsLoading(false); // Hide loader after response
        toast.success("Check your email to fill verification code!");
        navigate('/verify-code'); // Redirect to inputOtp component
      } catch (error) {
        setIsLoading(false); // Hide loader
        console.log("Error:", error);
      }
    },
  });

  const { errors, touched, handleSubmit, getFieldProps, handleChange, handleBlur, values } = formik;

  return (
    <>
      {isLoading && <Loader />}
      <div className="flex justify-center">
        <Card className="w-[350px] mt-5">
          <CardHeader>
            <CardTitle className="text-3xl">Register</CardTitle>
            <CardDescription>Create Your Account Below</CardDescription>
          </CardHeader>

          <CardContent>
            <form onSubmit={handleSubmit}>
              <div className="grid w-full items-center gap-4">
                <div className="flex flex-row space-x-1.5">
                  <div>
                    <Label htmlFor="firstname">First Name</Label>
                    <Input
                      type="text"
                      id="firstname"
                      placeholder="Enter Your First Name"
                      className={`${errors.firstname && touched.firstname ? 'border-red-800 outline-red-900' : ''}`}
                      {...getFieldProps('firstname')}
                    />
                    {touched.firstname && errors.firstname ? (
                      <div className="text-red-500 text-sm">{errors.firstname}</div>
                    ) : null}
                  </div>

                  <div>
                    <Label htmlFor="lastname">Last Name</Label>
                    <Input
                      type="text"
                      id="lastname"
                      placeholder="Enter Your Surname"
                      className={`${errors.lastname && touched.lastname ? 'border-red-800 outline-red-900' : ''}`}
                      {...getFieldProps('lastname')}
                    />
                    {touched.lastname && errors.lastname ? (
                      <div className="text-red-500 text-sm">{errors.lastname}</div>
                    ) : null}
                  </div>
                </div>

                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="username">Username</Label>
                  <Input
                    type="text"
                    id="username"
                    placeholder="Enter Your Username"
                    className={`${errors.username && touched.username ? 'border-red-800 outline-red-900' : ''}`}
                    {...getFieldProps('username')}
                  />
                  {touched.username && errors.username ? (
                    <div className="text-red-500 text-sm">{errors.username}</div>
                  ) : null}
                </div>

                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    type="email"
                    id="email"
                    placeholder="Enter Your Email"
                    className={`${errors.email && touched.email ? 'border-red-800 outline-red-900' : ''}`}
                    {...getFieldProps('email')}
                  />
                  {touched.email && errors.email ? (
                    <div className="text-red-500 text-sm">{errors.email}</div>
                  ) : null}
                </div>

                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="password">Password</Label>
                  <div className="relative">
                    <Input
                      type={passwordVisible ? "text" : "password"}
                      id="password"
                      placeholder="Enter Your Password"
                      className="pr-10"
                      {...getFieldProps('password')}
                    />
                    <button
                      type="button"
                      className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-600"
                      onClick={togglePasswordVisibility}
                    >
                      {passwordVisible ? <FaEyeSlash /> : <FaEye />}
                    </button>
                  </div>
                  {touched.password && errors.password ? (
                    <div className="text-red-500 text-sm">{errors.password}</div>
                  ) : null}
                </div>
              </div>
              {formik.serverError && (
                <div className="text-red-500 text-sm mt-2">{formik.serverError}</div>
              )}
              <CardFooter className="flex flex-col">
                <Button type="submit" className="w-[60%]" disabled={isLoading}>
                  Register
                </Button>
              </CardFooter>
            </form>
          </CardContent>

          <center>
            <p>
              Already Have Account!!{" "}
              <Link to="/login" className="text-blue-900 underline">
                Login
              </Link>
            </p>
          </center>
        </Card>
      </div>
    </>
  );
};

export default Register;
