import React from "react";
import classes from "./Modal.module.css";
const Backdrop = (props) => {
    return (
        <div className={classes.backdrop} onClick={props.cartHideHandler}></div>
    );
};

export default Backdrop;
