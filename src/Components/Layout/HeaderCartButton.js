import React, { useContext } from "react";
import AuthContext from "../../Context/AuthContext";
import CartIcon from "../Cart/CartIcon";
import classes from "./HeaderCartButton.module.css";
const HeaderCartButton = ({ cartShowHandler }) => {
    const cartContext = useContext(AuthContext);
    return (
        <button className={classes.button} onClick={cartShowHandler}>
            <span className={classes.icon}>
                <CartIcon />
            </span>
            <span>Your Cart</span>
            <span className={classes.badge}>{cartContext.items.length}</span>
        </button>
    );
};

export default HeaderCartButton;
