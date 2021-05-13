import React, { Fragment } from "react";
import ReactDom from "react-dom";

import Backdrop from "./Backdrop";
import ModalOverlay from "./ModalOverlay";
const Modal = (props) => {
    const portalElement = document.getElementById("overlays");
    return (
        <Fragment>
            {ReactDom.createPortal(
                <Backdrop cartHideHandler={props.cartHideHandler} />,
                portalElement
            )}
            {ReactDom.createPortal(
                <ModalOverlay>{props.children}</ModalOverlay>,
                portalElement
            )}
        </Fragment>
    );
};

export default Modal;
