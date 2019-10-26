import React from 'react';
import Button from "react-bootstrap/esm/Button";
import Form from "react-bootstrap/esm/Form";
import Table from "react-bootstrap/esm/Table";
import TableSelect from "../utility/TableSelect";

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
                    <th className="button-column"/>
                </tr>
                </thead>
                <tbody>
                {
                    props.items.map((row, ind) => {
                        if (row.placeholder) {
                            return (
                                <tr key={row.key}>
                                    <td>
                                        <TableSelect
                                            tables={props.contentTables}
                                            includeEmpty={true}
                                            onChange={(e) => {props.onRowChange(ind, e.target.value)}}/>
                                    </td>
                                    <td>
                                        <span className="text-muted">
                                            Field Name
                                        </span>
                                    </td>
                                    <td/>
                                </tr>
                            );
                        }
                        return (
                            <tr key={row.key}>
                                <td>
                                    <TableSelect
                                        tables={props.contentTables}
                                        onChange={(e) => {props.onRowChange(ind, e.target.value, row.field)}}
                                        value={row.table}/>
                                </td>
                                <td>
                                    <Form.Control
                                        onChange={(e) => {props.onRowChange(ind, row.table, e.target.value)}}
                                        value={row.field}
                                        placeholder={row.table}/>
                                </td>
                                <td>
                                    <Button variant="danger" onClick={() => {props.onRowDelete(ind)}}><i className="fa fa-trash"/></Button>
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