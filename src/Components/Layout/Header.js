import React from "react";
import classes from "./Header.module.css";
import mealsImage from "../../Assets/meals.jpg";
import HeaderCartButton from "./HeaderCartButton";
const Header = ({ cartShowHandler }) => {
    return (
        <React.Fragment>
            <header className={classes.header}>
                <h2>ReactOrders</h2>
                <HeaderCartButton cartShowHandler={cartShowHandler} />
            </header>
            <div className={classes["main-image"]}>
                <img src={mealsImage} alt="A table full of delicious food!" />
            </div>
        </React.Fragment>
    );
};

export default Header;
