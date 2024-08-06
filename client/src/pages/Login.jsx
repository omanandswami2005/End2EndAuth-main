import  { useState } from "react";
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
import { useDispatch } from "react-redux";
import { login } from "../actions/authActions";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { loginValidationSchema } from "@/utils/loginValidationSchema";


const Login = () => {
  const initialValues = { email: "", password: "" }
  const dispatch = useDispatch(); // Initialize dispatch
  const navigate = useNavigate(); // Initialize navigate

  // Password toggle use state
  const [passwordVisible, setPasswordVisible] = useState(false);

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  

  const handleSubmit = (values, { setSubmitting }) => {
    dispatch(login(values.email, values.password)).then(() => {
      navigate("/"); // Redirect after successful login
    }).catch(() => {
      setSubmitting(false);
    });
  };

  return (
    <>
      <div className="flex justify-center">
        <Card className="w-[350px] mt-5">
          <CardHeader>
            <CardTitle className="text-3xl">Login</CardTitle>
            <CardDescription>Unlock The World By Login</CardDescription>
          </CardHeader>

          <CardContent>
            <Formik
              initialValues={initialValues}
              validationSchema={loginValidationSchema}
              onSubmit={handleSubmit}
            >
              {({ isSubmitting, errors, touched }) => (
                <>
                  <Form>
                    <div className="grid w-full items-center gap-4">
                      <div className="flex flex-col space-y-1.5">
                        <Label htmlFor="email">Email</Label>
                        <Field
                          as={Input}
                          type="email"
                          id="email"
                          name="email"
                          placeholder="Enter Your Email"
                          className={`
                            ${errors.email && touched.email ? 'border-red-800 outline-red-900' : ''}
                          `}
                        />
                        <ErrorMessage
                          name="email"
                          component="div"
                          className="text-red-600"
                        />
                      </div>

                      <div className="flex flex-col space-y-1.5">
                        <div className="flex flex-row justify-between items-center">
                          <Label htmlFor="password">Password</Label>
                          <Label>
                            <Link
                              to="/forgot-password"
                              className="text-blue-900 underline"
                            >
                              Forgot Password
                            </Link>
                          </Label>
                        </div>

                        <div className="relative">
                          <Field
                            as={Input}
                            type={passwordVisible ? "text" : "password"}
                            id="password"
                            name="password"
                            placeholder="Enter Your Password"
                            className={`
                              ${errors.password && touched.password ? 'border-red-900 outline-red-900' : ''}
                              pr-10
                            `}
                          />
                          <button
                            type="button"
                            className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-600 h-[35px]"
                            onClick={togglePasswordVisibility}
                          >
                            {passwordVisible ? <FaEyeSlash /> : <FaEye />}
                          </button>
                          <ErrorMessage
                            name="password"
                            component="div"
                            className="text-red-600"
                          />
                        </div>
                      </div>
                    </div>
                    <CardFooter className="flex flex-col">
                      <br />
                      <Button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-[60%]"
                      >
                        Login
                      </Button>
                      <br />
                      {/* <GoogleLogin
                        clientId={clientId}
                        buttonText="Signin With Google"
                        onSuccess={onGoogleSuccess}
                        onError={onGoogleFailure}
                        cookiePolicy={"single_host_origin"}
                        isSignedIn={true}
                        scope="profile email"
                      /> */}
                    </CardFooter>
                  </Form>
                </>
              )}
            </Formik>
          </CardContent>

          <center>
            <p>
              Don&apos;t Have Account Yet!{" "}
              <Link to="/register" className="text-blue-900 underline">
                Register
              </Link>
            </p>
          </center>
        </Card>
      </div>
    </>
  );
};

export default Login;
