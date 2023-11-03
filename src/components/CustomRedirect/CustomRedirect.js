import React from 'react';
import { Navigate } from "react-router-dom";

const CustomRedirect = ({ component: Component, ...props  }) => {
  return (
    (!props.needRedirect) ? <Component {...props} /> : <Navigate to={props.redirectLink} replace/>
)}
    
export default CustomRedirect;