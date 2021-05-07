import { Fragment, useState } from "react";
import Cart from "./Components/Cart/Cart";
import Header from "./Components/Layout/Header";
import Meals from "./Components/Meals/Meals";

function App() {
    const [cartIsShown, setCartIsShown] = useState(false);
    const cartShowHandler = () => {
        setCartIsShown(true);
    };
    const cartHideHandler = () => {
        setCartIsShown(false);
    };
    return (
        <Fragment>
            {cartIsShown && <Cart cartHideHandler={cartHideHandler} />}

            <Header cartShowHandler={cartShowHandler} />
            <main>
                <Meals />
            </main>
        </Fragment>
    );
}

export default App;
