import React from 'react';

/**
 * Properties:
 * uniqueId: String value property
 * label: String value title label
 * value: String value literal
 * @param props
 * @returns {*}
 * @constructor
 */
function ValueDisplay(props) {
    return (
        <div className={props.className ? props.className + " form-group" : "form-group"} key={props.uniqueId}>
            <label htmlFor="value">{props.label}</label>
            <span id="value" className="form-control-plaintext">{props.value}</span>
        </div>
    );
}

export default ValueDisplay;