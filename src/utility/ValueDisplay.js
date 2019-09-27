import React from 'react';

function ValueDisplay(props) {
    return (
        <div className="col-sm-4 form-group" key={props.key}>
            <label htmlFor="value">{props.label}</label>
            <span id="value" className="form-control-plaintext">{props.value}</span>
        </div>
    );
}

export default ValueDisplay;