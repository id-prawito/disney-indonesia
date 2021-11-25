import React from "react";
import PropTypes from "prop-types";
import { FaPlay, FaAngleRight } from "react-icons/fa";
import "./button.scss";

const Button = (props) => {
    return (
        <button
            className={`button ${props.className}`}
            onClick={props.onClick ? () => props.onClick() : null}
        >
            {props.children}
        </button>
    );
};

export const ButtonIcon = (props) => {
    return (
        <div
            className={`button ${props.className}`}
            onClick={props.onClick ? () => props.onClick() : null}
        >
            <FaPlay />
            {props.children}
        </div>
    );
};

export const ButtonIconLain = (props) => {
    return (
        <div
            className={`button ${props.className}`}
            onClick={props.onClick ? () => props.onClick() : null}
        >
            {props.children}
        </div>
    );
};

export const ButtonIconView = (props) => {
    return (
        <div
            className={`button ${props.className}`}
            onClick={props.onClick ? () => props.onClick() : null}
        >
            {props.children}
            <FaAngleRight />
        </div>
    );
};

Button.propTypes = {
    onClick: PropTypes.func,
};

export default Button;
