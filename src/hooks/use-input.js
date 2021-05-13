import { useState } from "react";

const useInput = (validateValue) => {
    const [enteredValue, setEnteredValue] = useState("");
    const [isTouched, setIsTouched] = useState(false);
    const valueIsValid = validateValue(enteredValue);
    const hasError = !valueIsValid && isTouched;

    const onInputChangeHandler = (e) => {
        setIsTouched(true);
        setEnteredValue(e.target.value);
    };
    const reset = () => {
        setEnteredValue("");
        setIsTouched(false);
    };
    return {
        value: enteredValue,
        valueIsValid,
        hasError,
        onInputChangeHandler,
        reset,
    };
};
export default useInput;
