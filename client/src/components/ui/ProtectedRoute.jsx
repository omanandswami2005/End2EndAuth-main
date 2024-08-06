// import  { useState,  } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';

const ProtectedRoute = () => {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  

  return(
    
  <div className='App'>
  {isAuthenticated === true ? (
    <Outlet />
  ) : isAuthenticated === false ? (
    // console.log("Not authenticated"),
    <Navigate to="/login" />
  ) : (
    <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            background: 'rgba(255, 255, 255, 0.3)',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            zIndex: 1000,
          }}
        >
          <h4 className="mx-3 font-italic" >Checking authentication Status...</h4>
        </div>
  )}
</div>
  )

 
};

export default ProtectedRoute;
