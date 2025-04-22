import React from "react";
import { Outlet } from "react-router-dom";
import NavBar from "./NavBar";
import Header from "./Header";
import './Styles/App.css';
import { AuthProvider } from "./Login/AuthContext";

export default function App() {
    return (
        <AuthProvider>
            <div className="app-container">
            <Header />
            <NavBar />
            <div className="content-container">
                <Outlet />
            </div>
        </div>
        </AuthProvider>
        
    );
}
