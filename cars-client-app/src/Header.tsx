import React from "react";
import './Styles/HeaderStyle.css';
import logo_car from './logo_samochod.png';

export default function Header() {
    return (
        <div className="header">
            <img src={logo_car} alt="logo" className="header-logo" />
        </div>
    );
}
