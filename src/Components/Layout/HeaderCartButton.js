import React, { useContext, useEffect, useState } from "react";
import AuthContext from "../../Context/AuthContext";
import CartIcon from "../Cart/CartIcon";
import classes from "./HeaderCartButton.module.css";
const HeaderCartButton = ({ cartShowHandler }) => {
    const cartContext = useContext(AuthContext);
    const { items } = cartContext;
    const [btnIsHighlighted, setBtnIsHighlighted] = useState(false);
    const btnClasses = `${classes.button} ${btnIsHighlighted && classes.bump}`;
    useEffect(() => {
        if (items.length === 0) return;

        setBtnIsHighlighted(true);

        const timer = setTimeout(() => {
            setBtnIsHighlighted(false);
        }, 300);

        return () => {
            clearTimeout(timer);
        };
    }, [items]);
    return (
        <button className={btnClasses} onClick={cartShowHandler}>
            <span className={classes.icon}>
                <CartIcon />
            </span>
            <span>Your Cart</span>
            <span className={classes.badge}>{cartContext.items.length}</span>
        </button>
    );
};

export default HeaderCartButton;
