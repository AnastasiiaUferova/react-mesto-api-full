import React from "react";
import logo from "../images/logo.svg";
import { NavLink, useLocation } from "react-router-dom";

function Header(props) {
    let { email } = props.userData;

    let location = useLocation();

    return (
        <header className="header root__header">
            <img className="header__logo" src={logo} alt="логотип Mesto" />

            {location.pathname === "/signup" && (
                <NavLink to="/signin" className="header__info">
                    Войти
                </NavLink>
            )}
            {location.pathname === "/signin" && (
                <NavLink to="/signup" className="header__info">
                    Регистрация
                </NavLink>
            )}
            {location.pathname === "/" && (
                <div className="header__info-container">
                    <p className="header__email">{email}</p>
                    <button onClick={props.signOut} className="header__info header__info_sign-out">
                        Выйти
                    </button>
                </div>
            )}
        </header>
    );
}

export default Header;