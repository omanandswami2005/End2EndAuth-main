// src/actions/authActions.js
import axiosInstance from "../utils/axiosInstance";
// import { useNavigate } from "react-router-dom"; // Import useNavigate
import { USER_LOADED, AUTH_ERROR } from './types';
import { jwtDecode } from "jwt-decode";

export const checkAuthentication = () => async dispatch => {
  try {
    // Replace this with your actual client-side authentication check logic
    const token = localStorage.getItem('token');
    if (token) {
      // Assuming token is enough to verify user is authenticated
      dispatch({
        type: USER_LOADED,
        payload: { token } // Provide any necessary user data here
      });
    } else {
      dispatch({
        type: AUTH_ERROR
      });
    }
  } catch (err) {
    dispatch({
      type: AUTH_ERROR
    });
  }
};

export const loadUser = () => async (dispatch) => {
  if (localStorage.getItem("token")) {
    console.log("I go the token");
    
    const decodedToken = jwtDecode(localStorage.getItem("token"), "myfullsecret");
    console.log("thsi is hte decode toek",decodedToken);
    
    dispatch({
      type: "USER_LOADED",
      payload: decodedToken,
    });
  } else {
    dispatch({ type: "AUTH_ERROR" });
  }
};

export const login = (email, password) => async (dispatch) => {
  try {
    const res = await axiosInstance.post('/api/v1/user/login', { email, password });
    console.log(res.data.tokenLogin);
    console.log();
    
    
    localStorage.setItem('token', res.data.tokenLogin); // Store token
    dispatch({
      type: 'LOGIN_SUCCESS',
      payload: res.data,
    });
    dispatch(loadUser());
  } catch (err) {
    dispatch({
      type: 'LOGIN_FAIL',
    });
  }
};


export const signup = (fullName, username, email, password) => async (dispatch) => {
  try {
    console.log("from store signup", { fullName, username, email, password });    
    const res = await axiosInstance.post('/api/v1/user/register', { fullName, username, email, password });
    console.log("backend res", res.data.message);
    localStorage.setItem("user-id", res.data.userId);
    localStorage.setItem("user-email", res.data.userEmail);
    
    dispatch({
      type: "SIGNUP_SUCCESS",
      payload: res.data,
    });
    dispatch(loadUser());
  } catch (err) {
    dispatch({
      type: "SIGNUP_FAIL",
    });
  }
};

export const logout = () => (dispatch) => {
  localStorage.removeItem("token"); // Remove token
  dispatch({ type: "LOGOUT" });
};
