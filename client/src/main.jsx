import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { Provider } from "react-redux";
import store from "./store.js";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

ReactDOM.createRoot(document.getElementById("root")).render(
 <GoogleOAuthProvider clientId=""> 
  <React.StrictMode>
  <Provider store={store}>
    <App />
    <ToastContainer />
  </Provider>
</React.StrictMode>
</GoogleOAuthProvider>
);


