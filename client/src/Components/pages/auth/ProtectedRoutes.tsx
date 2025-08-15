import React from "react";
import { Navigate } from "react-router-dom";

type ProtectedRouteProps = {
    children: React.ReactNode;
};

function ProtectedRoutes({ children }: ProtectedRouteProps) : React.JSX.Element | null {
    const token = localStorage.getItem('token');

    if(!token){
        return <Navigate to='/login' />
    }

    return <>{children}</>
}

export default ProtectedRoutes;