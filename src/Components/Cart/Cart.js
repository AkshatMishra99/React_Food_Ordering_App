import React, { useContext, useState } from "react";
import AuthContext from "../../Context/AuthContext";
import Modal from "../UI/Modal";
import classes from "./Cart.module.css";
import CartItem from "./CartItem";
const Cart = ({ cartHideHandler }) => {
    const CartContext = useContext(AuthContext);
    const totalAmount = `$${CartContext.totalAmount.toFixed(2)}`;
    const hasItems = CartContext.items.length > 0;
    const cartItemRemoveHandler = (id) => {
        CartContext.removeItem(id);
    };
    const cartItemAddHandler = (item) => {
        item["amount"] = 1;
        CartContext.addItem(item);
    };
    const cartItems = (
        <ul className={classes["cart-items"]}>
            {CartContext.items.map((cartItem) => {
                return (
                    <CartItem
                        key={cartItem.id}
                        item={cartItem}
                        onRemove={cartItemRemoveHandler.bind(null, cartItem.id)}
                        onAdd={cartItemAddHandler.bind(null, {
                            ...cartItem,
                            amount: 1,
                        })}
                    />
                );
            })}
        </ul>
    );
    return (
        <Modal cartHideHandler={cartHideHandler}>
            {cartItems}
            <div className={classes.total}>
                <span>Total Amount:</span>
                <span>{totalAmount}</span>
            </div>
            <div className={classes.actions}>
                <button
                    className={classes["buttons--alt"]}
                    onClick={cartHideHandler}
                >
                    Close
                </button>
                {hasItems && <button className={classes.button}>Order</button>}
            </div>
        </Modal>
    );
};

export default Cart;
