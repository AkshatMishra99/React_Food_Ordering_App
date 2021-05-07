import React, { useContext, useRef, useState } from "react";
import AuthContext from "../../../Context/AuthContext";

import Input from "../../UI/Input";
import classes from "./MealItemForm.module.css";
const MealItemForm = (props) => {
    const CartContext = useContext(AuthContext);
    const inputref = useRef();
    const [amountIsValid, setAmountIsValid] = useState(true);
    const submitHandler = (e) => {
        e.preventDefault();
        const enteredAmount = inputref.current.value;
        const enteredAmountNumber = +enteredAmount;
        if (
            enteredAmount.trim().length === 0 ||
            enteredAmountNumber < 0 ||
            enteredAmountNumber > 5
        ) {
            setAmountIsValid(false);
            return;
        }
        const item = props.item;
        item.amount = enteredAmountNumber;
        CartContext.addItem(item);
    };

    return (
        <form className={classes.form} onSubmit={submitHandler}>
            <Input
                label="Amount"
                ref={inputref}
                input={{
                    ref: inputref,
                    id: "amount_" + props.item.id,
                    type: "number",
                    min: 1,
                    max: 5,
                    step: 1,
                    defaultValue: 1,
                }}
            />
            <button>+ Add</button>
            {!amountIsValid && <p>Please enter a valid amount!!</p>}
        </form>
    );
};

export default MealItemForm;
