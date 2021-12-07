import React, { useRef, useEffect, useContext } from "react";
import { FaHome, FaPlus, FaDice } from "react-icons/fa";
import { Link, NavLink } from "react-router-dom";
import logoProfile from "../../assets/images/pikachu.png";
import { MdMovie, MdVideoLibrary } from "react-icons/md";
import logoNav from "../../assets/images/logoNav.svg";

import "./header.scss";
import Search from "./search";
import { GlobalContext } from "../../config/GlobalState";

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

    const { watchlist, watchlistTv } = useContext(GlobalContext);

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
                                <FaDice />
                                <NavLink
                                    to="/genres"
                                    className="header__item-link"
                                >
                                    Genres
                                </NavLink>
                            </div>
                        </div>
                    </div>
                    <div className="header__profile_link">
                        <div className="header__menu">
                            <Search />
                            <div className="header__item">
                                <FaPlus />
                                <NavLink
                                    to="/watchlist"
                                    className="header__item-link"
                                >
                                    Watchlist
                                    <span className="text_jumlah">
                                        {watchlist.length + watchlistTv.length}
                                    </span>
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
