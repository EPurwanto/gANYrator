import React from 'react';
import Form from "react-bootstrap/Form";
import AppContext from "../AppContext";

/**
 * Properties
 * name
 * desc
 * onClick
 * @param props
 * @returns {*}
 * @constructor
 */

interface IProps {
    value: string;
    onChange: ()=>void;
    includeEmpty: boolean;
}

function TableSelect(props: IProps) {

    return (
        <AppContext.Consumer>
            {
                context => { return (
                    <Form.Control
                        as="select"
                        value={props.value}
                        onChange={props.onChange}>

                        {props.includeEmpty ? <option value="">Select a table</option> : ""}
                        {
                            context.contentTables.map(t => {
                                return (
                                    <option key={t.name} value={t.name}>{t.name}</option>
                                )
                            })
                        }
                    </Form.Control>
                )}
            }
        </AppContext.Consumer>
    )
}

export default TableSelect;