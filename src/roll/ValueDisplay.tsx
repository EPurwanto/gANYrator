import React from 'react';
import Form from "react-bootstrap/Form";

/**
 * Properties:
 * uniqueId: String value property
 * label: String value title label
 * value: String value literal
 * @param props
 * @returns {*}
 * @constructor
 */
function ValueDisplay(props : {key?:string; label:string; value:number;}) {
    return (
        <Form.Group controlId={props.key}>
            <Form.Label>{props.label}</Form.Label>
            <Form.Control plaintext readOnly value={props.value}/>
        </Form.Group>
    )
}

export default ValueDisplay;
