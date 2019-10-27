import PropTypes from 'prop-types';
import React, {useState} from 'react';
import Button from "react-bootstrap/esm/Button";
import Form from "react-bootstrap/esm/Form";
import ContentsEditor from "../utility/ContentsEditor";
import ActionEditOverlay from "./ActionEditOverlay";

/**
 * Properties
 * name
 * desc
 * onClick
 * @param props
 * @returns {*}
 * @constructor
 */
const TableContentsEditor = (props) => {
    const {actions, contentTables, onRowChange, ...other} = props;

    const[selected, setSelected] = useState();

    let overlay = "";
    if (selected) {
        overlay = <ActionEditOverlay
                    action={selected.action}
                    allActions={actions}
                    contentTables={contentTables}
                    onSave={(act) => {onRowChange(selected.key, selected.value, selected.element, act)}}
                    onClose={() => setSelected(undefined)}
        />
    }

    return (
        <React.Fragment>
            <ContentsEditor
                headings={
                    <React.Fragment>
                        <th>Frequency</th>
                        <th>Value</th>
                    </React.Fragment>
                }
                content={row => { return (
                    <React.Fragment>
                        <td>
                            <Form.Control
                                type="number"
                                value={row.weight}
                                onChange={(e) => onRowChange(row.key, e.target.value, row.element, row.action)}
                                min="1"
                                required/>
                        </td>
                        <td>
                            <Form.Control
                                value={row.element}
                                onChange={(e) => onRowChange(row.key, row.weight, e.target.value, row.action)}
                                required/>
                        </td>
                    </React.Fragment>
                )}}
                placeholder={row => { return (
                    <React.Fragment>
                        <td>
                            <Form.Control
                                type="number"
                                placeholder="1"
                                onChange={(e) => onRowChange(row.key, e.target.value, "")}
                            />
                        </td>
                        <td>
                            <Form.Control
                                placeholder="Add a new row"
                                onChange={(e) => onRowChange(row.key, 1, e.target.value)}/>
                        </td>
                    </React.Fragment>
                )}}
                buttons={row => { return (
                    <Button
                        variant={row.action ? "success": "primary"}
                        className="action-button"
                        onClick={() => {setSelected(row)}}>
                        {row.action ? "yes": "no"}
                    </Button>
                )}}
                {...other}
            />
            {overlay}
        </React.Fragment>
    );
};

TableContentsEditor.propTypes = {
    items: PropTypes.array.isRequired,
    actions: PropTypes.array.isRequired,
    contentTables: PropTypes.array.isRequired,
    onRowDelete: PropTypes.func.isRequired
};


export default TableContentsEditor;