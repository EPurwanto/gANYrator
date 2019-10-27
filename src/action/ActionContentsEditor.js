import React from 'react';
import Button from "react-bootstrap/esm/Button";
import Form from "react-bootstrap/esm/Form";
import Table from "react-bootstrap/esm/Table";
import ContentsEditor from "../utility/ContentsEditor";
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
const ActionContentsEditor = (props) => {
    const {contentTables, onRowChange, ...other} = props;
    return (
        <ContentsEditor
            headings={
                <React.Fragment>
                    <th>Table</th>
                    <th>Field</th>
                </React.Fragment>
            }
            content={row => { return (
                <React.Fragment>
                    <td>
                        <TableSelect
                            tables={contentTables}
                            onChange={(e) => {onRowChange(row.key, e.target.value, row.field)}}
                            value={row.table}/>
                    </td>
                    <td>
                        <Form.Control
                            onChange={(e) => {onRowChange(row.key, row.table, e.target.value)}}
                            value={row.field}
                            placeholder={row.table}/>
                    </td>
                </React.Fragment>
            )}}
            placeholder={row => { return (
                <React.Fragment>
                    <td>
                        <TableSelect
                            tables={props.contentTables}
                            includeEmpty={true}
                            onChange={(e) => {onRowChange(row.key, e.target.value)}}/>
                    </td>
                    <td>
                        <span className="text-muted">
                            Field Name
                        </span>
                    </td>
                </React.Fragment>
            )}}
            {...other}
        />
    );
};

export default ActionContentsEditor;