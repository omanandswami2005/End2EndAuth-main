import  { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { checkAuthentication } from "./actions/authActions"; // Assume this action checks authentication from the client side
import Login from "./pages/Login";
import Register from "./pages/Register";
import VerifyCode from "./pages/VerifyCode";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";
import Profile from "./pages/Profile";
import Dashboard from "./pages/Dashboard";
import ProtectedRoute from "./components/ui/ProtectedRoute";
import Home from "./pages/Home";
// import { gapi } from "gapi-script";


function App() {
  const dispatch = useDispatch();
// console.log(isAuthenticated);

  useEffect(() => {
    // function start() {
    //   gapi.client.init({
    //     clientId: clientId,
    //     scope: "",
    //   });
    // }

    // gapi.load("client:auth2", start);

    dispatch(checkAuthentication()); // Replace loadUser with checkAuthentication
  }, [dispatch]);

  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/verify-code" element={<VerifyCode />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password" element={<ResetPassword />} />

        <Route  element={<ProtectedRoute />}>
          <Route path="/profile" element={<Profile />} />
          <Route path="/" element={<Home />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
