import PropTypes from 'prop-types';
import React from 'react';
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

function ConfirmPopup(props) {
    return (
        <Modal show={props.show}>
            <Modal.Header>
                {props.heading}
            </Modal.Header>
            <Modal.Body>
                {props.children}
            </Modal.Body>
            <Modal.Footer>
                <Button variant="primary" onClick={() => {props.onConfirm(); props.onClose()}}>
                    {props.confirmMessage}
                </Button>
                <Button variant="danger" onClick={props.onClose}>
                    {props.cancelMessage}
                </Button>
            </Modal.Footer>
        </Modal>
    );
}

ConfirmPopup.propTypes = {
    show: PropTypes.bool.isRequired,
    heading: PropTypes.string,
    children: PropTypes.element,
    confirmMessage: PropTypes.string,
    cancelMessage: PropTypes.string,
    onConfirm: PropTypes.func.isRequired,
    onClose: PropTypes.func.isRequired,
};


ConfirmPopup.defaultProps = {
    confirmMessage: "Confirm",
    cancelMessage: "Cancel"
};

export default ConfirmPopup;