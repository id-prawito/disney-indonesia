import React, { useRef, useEffect } from "react";
import { Link, NavLink } from "react-router-dom";
import logoNav from "../../assets/images/logoNav.svg";
import logoProfile from "../../assets/images/pikachu.png";
import { FaHome, FaPlus, FaSearch, FaStar } from "react-icons/fa";
import { MdMovie, MdVideoLibrary } from "react-icons/md";
import "./header.scss";

const Header = () => {
    const headerRef = useRef(null);

    useEffect(() => {
        const shrinkHeader = () => {
            if (
                document.body.scrollTop > 150 ||
                document.documentElement.scrollTop > 150
            ) {
                headerRef.current.classList.add("shrink");
            } else {
                headerRef.current.classList.remove("shrink");
            }
        };
        window.addEventListener("scroll", shrinkHeader);
        return () => {
            window.removeEventListener("scroll", shrinkHeader);
        };
    }, []);
    return (
        <>
            <div ref={headerRef} className="header__disney">
                <div className="header__container">
                    <div className="header__logo_link">
                        <Link to="/" className="header__logo">
                            <img
                                alt="logo_header"
                                src={logoNav}
                                className="logo__img"
                            />
                        </Link>
                        <div className="header__menu">
                            <div className="header__item">
                                <FaHome />
                                <NavLink
                                    exact={true}
                                    to="/"
                                    activeClassName="active"
                                    className="header__item-link"
                                >
                                    Home
                                </NavLink>
                            </div>
                            <div className="header__item">
                                <MdVideoLibrary />
                                <NavLink
                                    to="/tv"
                                    activeClassName="active"
                                    className="header__item-link"
                                >
                                    Series
                                </NavLink>
                            </div>
                            <div className="header__item">
                                <MdMovie />
                                <NavLink
                                    to="/movie"
                                    className="header__item-link"
                                >
                                    Movies
                                </NavLink>
                            </div>
                            <div className="header__item">
                                <FaStar />
                                <NavLink
                                    to="/original"
                                    className="header__item-link"
                                >
                                    Originals
                                </NavLink>
                            </div>
                        </div>
                    </div>
                    <div className="header__profile_link">
                        <div className="header__menu">
                            <div className="header__item">
                                <FaSearch />
                                <NavLink to="/5" className="header__item-link">
                                    Search
                                </NavLink>
                            </div>
                            <div className="header__item">
                                <FaPlus />
                                <NavLink to="/5" className="header__item-link">
                                    Add
                                </NavLink>
                            </div>
                        </div>
                        <Link to="/" className="header__logo-profile">
                            <img
                                alt="logo_profile"
                                src={logoProfile}
                                className="logo__img-profile"
                            />
                        </Link>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Header;
