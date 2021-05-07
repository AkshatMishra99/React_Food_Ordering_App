import React, { useContext, useReducer } from "react";

const AuthContext = React.createContext({
    items: [],
    totalAmount: 0,
    addItem: (item) => {},
    removeItem: (id) => {},
});
const defaultCartState = {
    items: [],
    totalAmount: 0,
};
const cartReducer = (state, action) => {
    console.log(action);
    if (action.type === "ADD_TO_CART") {
        const updatedTotalAmount =
            state.totalAmount + action.item.price * action.item.amount;
        const existingItemIndex = state.items.findIndex(
            (item) => item.id === action.item.id
        );
        const existingItem = state.items[existingItemIndex];
        let updatedItem;
        let updatedItems;
        if (existingItem) {
            updatedItem = {
                ...existingItem,
                amount: existingItem.amount + action.item.amount,
            };

            updatedItems = [...state.items];
            updatedItems[existingItemIndex] = updatedItem;
        } else updatedItems = state.items.concat(action.item);
        return {
            items: updatedItems,
            totalAmount: updatedTotalAmount,
        };
    }
    if (action.type === "REMOVE_FROM_CART") {
        let { items } = state;
        let tempItem = null;
        let updatedItems = [];
        for (let i = 0; i < items.length; i++) {
            if (items[i].id === action.item.id) {
                tempItem = items[i];
            } else updatedItems.push(items[i]);
        }
        return {
            items: updatedItems,
            totalAmount: state.totalAmount - tempItem.amount * tempItem.price,
        };
    }
    return defaultCartState;
};
export const AuthProvider = (props) => {
    const [cartState, dispatchCart] = useReducer(cartReducer, defaultCartState);
    const addItemToCartHandler = (item) => {
        dispatchCart({ type: "ADD_TO_CART", item: item });
    };
    const removeItemFromCartHandler = (id) => {
        dispatchCart({ type: "REMOVE_FROM_CART", id: id });
    };
    return (
        <AuthContext.Provider
            value={{
                items: cartState.items,
                totalAmount: cartState.totalAmount,
                addItem: addItemToCartHandler,
                removeItem: removeItemFromCartHandler,
            }}
        >
            {props.children}
        </AuthContext.Provider>
    );
};

export default AuthContext;
