import React from "react";
import { FaPlay, FaAngleRight, FaMinus, FaPlus, FaPause } from "react-icons/fa";
import PropTypes from "prop-types";
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
export const ButtonIconTrailer = (props) => {
    return (
        <div
            className={`button ${props.className}`}
            onClick={props.onClick ? () => props.onClick() : null}
        >
            <FaPause />
            {props.children}
        </div>
    );
};

export const ButtonIconFaPlus = (props) => {
    return (
        <div
            className={`button ${props.className}`}
            onClick={props.onClick ? () => props.onClick() : null}
        >
            <FaPlus />
            {props.children}
        </div>
    );
};

export const ButtonIconFaMinus = (props) => {
    return (
        <div
            className={`button ${props.className}`}
            onClick={props.onClick ? () => props.onClick() : null}
        >
            <FaMinus />
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
