import useInput from "../../hooks/use-input";
import classes from "./Checkout.module.css";

const Checkout = (props) => {
    const {
        value: nameValue,
        valueIsValid: nameIsValid,
        hasError: nameHasError,
        onInputChangeHandler: onNameChange,
        reset: resetName,
    } = useInput((value) => value.trim() !== "");
    const {
        value: streetValue,
        valueIsValid: streetIsValid,
        hasError: streetHasError,
        onInputChangeHandler: onStreetChange,
        reset: resetStreet,
    } = useInput((value) => value.trim() !== "");
    const {
        value: postalValue,
        valueIsValid: postalIsValid,
        hasError: postalHasError,
        onInputChangeHandler: onPostalChange,
        reset: resetPostal,
    } = useInput((value) => value.trim().length >= 6);
    const {
        value: cityValue,
        valueIsValid: cityIsValid,
        hasError: cityHasError,
        onInputChangeHandler: onCityChange,
        reset: resetCity,
    } = useInput((value) => value.trim() !== "");
    const nameClass = nameHasError ? classes.invalid : "";
    const streetClass = streetHasError ? classes.invalid : "";
    const postalClass = postalHasError ? classes.invalid : "";
    const cityClass = cityHasError ? classes.invalid : "";
    const isFormValid =
        nameIsValid && streetIsValid && postalIsValid && cityIsValid;
    const confirmHandler = (event) => {
        event.preventDefault();
        console.log(nameValue, streetValue, postalValue, cityValue);
        props.onConfirm({
            name: nameValue,
            street: streetValue,
            postal: postalValue,
            city: cityValue,
        });
        resetName();
        resetStreet();
        resetPostal();
        resetCity();
    };
    return (
        <form className={classes.form} onSubmit={confirmHandler}>
            <div className={`${classes.control} ${nameClass}`}>
                <label htmlFor="name">Your Name</label>
                <input
                    type="text"
                    id="name"
                    value={nameValue}
                    onChange={onNameChange}
                />
                {nameHasError && <label>Enter Valid Name!!</label>}
            </div>
            <div className={`${classes.control} ${streetClass}`}>
                <label htmlFor="street">Street</label>
                <input
                    type="text"
                    id="street"
                    value={streetValue}
                    onChange={onStreetChange}
                />
                {streetHasError && <label>Enter Valid street!!</label>}
            </div>
            <div className={`${classes.control} ${postalClass}`}>
                <label htmlFor="postal">Postal Code</label>
                <input
                    type="text"
                    id="postal"
                    value={postalValue}
                    onChange={onPostalChange}
                />
                {postalHasError && <label>Enter Valid postal!!</label>}
            </div>
            <div className={`${classes.control} ${cityClass}`}>
                <label htmlFor="city">City</label>
                <input
                    type="text"
                    id="city"
                    value={cityValue}
                    onChange={onCityChange}
                />
                {cityHasError && <label>Enter Valid city!!</label>}
            </div>
            <div className={classes.actions}>
                <button type="button" onClick={props.onCancel}>
                    Cancel
                </button>
                <button disabled={!isFormValid} className={classes.submit}>
                    Confirm
                </button>
            </div>
        </form>
    );
};

export default Checkout;
