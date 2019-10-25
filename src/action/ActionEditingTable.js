import React from 'react';
import Form from "react-bootstrap/esm/Form";
import Table from "react-bootstrap/esm/Table";
import TableSelect from "./TableSelect";

/**
 * Properties
 * name
 * desc
 * onClick
 * @param props
 * @returns {*}
 * @constructor
 */
const ActionEditingTable = (props) => {
    return (
        <Table>
            <Table striped size="sm">
                <thead>
                <tr>
                    <th>Table</th>
                    <th>Field</th>
                </tr>
                </thead>
                <tbody>
                {
                    props.items.map((row, ind) => {
                        if (row.placeholder) {
                            return (
                                <tr key={ind}>
                                    <td>
                                        <TableSelect
                                            tables={props.contentTables}/>
                                    </td>
                                    <td>
                                        <span className="text-muted">
                                            Field Name
                                        </span>
                                    </td>
                                </tr>
                            );
                        }
                        return (
                            <tr key={ind}>
                                <td>
                                    <TableSelect
                                        tables={props.contentTables}
                                        value={row.table}/>
                                </td>
                                <td>
                                    <Form.Control
                                        value={row.field}
                                        placeholder={row.table}/>
                                </td>
                            </tr>
                        );
                    })
                }
                </tbody>
            </Table>
        </Table>
    );
};

export default ActionEditingTable;