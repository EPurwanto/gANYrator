import React from 'react';
import Form from "react-bootstrap/esm/Form";

/**
 * Properties
 * name
 * desc
 * onClick
 * @param props
 * @returns {*}
 * @constructor
 */
function TableSelect(props) {

    return (
        <Form.Control
            as="select"
            value={props.value}>
            <option value="">Select a table</option>
            {
                props.tables.map(t => {
                    return (
                        <option key={t.name} value={t.name}>{t.name}</option>
                    )
                })
            }
        </Form.Control>
    )
}

export default TableSelect;