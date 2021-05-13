import React, { useContext, useState } from "react";
import AuthContext from "../../Context/AuthContext";
import useHttp from "../../hooks/use-http";
import Modal from "../UI/Modal";
import classes from "./Cart.module.css";
import CartItem from "./CartItem";
import Checkout from "./Checkout";
const Cart = ({ cartHideHandler }) => {
    const CartContext = useContext(AuthContext);
    const [isOrdering, setIsOrdering] = useState(false);
    const { error, sendRequest } = useHttp();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [didSubmit, setDidSubmit] = useState(false);
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
    const onOrderHandler = (e) => {
        setIsOrdering(true);
    };
    const onOrderCancelHandler = (e) => {
        setIsOrdering(false);
    };

    const onSubmitOrderHandler = async (userData) => {
        let resp = "";
        setIsSubmitting(true);
        await sendRequest(
            {
                url: "https://reactorders-17a3b-default-rtdb.firebaseio.com/orders.json",
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: { user: userData, items: CartContext.items },
            },
            (data) => {
                resp = data;
                console.log(resp);
            }
        );
        setIsSubmitting(false);
        setDidSubmit(true);
        CartContext.clearCart();
    };
    let cartContent = (
        <div className={classes.actions}>
            <button
                className={classes["buttons--alt"]}
                onClick={cartHideHandler}
            >
                Close
            </button>
            {hasItems && (
                <button className={classes.button} onClick={onOrderHandler}>
                    Order
                </button>
            )}
        </div>
    );
    if (isOrdering)
        cartContent = (
            <Checkout
                onConfirm={onSubmitOrderHandler}
                onCancel={onOrderCancelHandler}
            />
        );
    const cartModalContent = (
        <React.Fragment>
            {cartItems}
            <div className={classes.total}>
                <span>Total Amount:</span>
                <span>{totalAmount}</span>
            </div>
            {cartContent}
        </React.Fragment>
    );
    const isSubmittingModalContent = <p>Sending order data...</p>;
    const didSubmitModalContent = <p>Order submitted successfully!!!</p>;
    const errorContent = <p>{error}</p>;
    return (
        <Modal cartHideHandler={cartHideHandler}>
            {error && errorContent}
            {!error && !isSubmitting && !didSubmit && cartModalContent}
            {!error && !isSubmitting && didSubmit && didSubmitModalContent}
            {!error && isSubmitting && isSubmittingModalContent}
        </Modal>
    );
};

export default Cart;
