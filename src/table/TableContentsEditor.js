import PropTypes from 'prop-types';
import React, {Component} from 'react';
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import AppContext from "../AppContext";
import ContentsListManager from "../structure/ContentListManager";
import ContentsEditor from "../structure/ContentsEditor";
import ActionEditOverlay from "./ActionEditOverlay";

function safeNumber(val) {
    const i = parseInt(val, 10);
    if (isNaN(i)) {
        return "";
    }
    return i;
}

class BareTableContentsEditor extends Component {
    constructor(props) {
        super(props);

        this.state  = {
            selected: undefined
        }
    }

    handleSelect(row) {
        this.setState({selected: row})
    }

    render() {
        const {onRowChange, ...other} = this.props;

        let overlay = "";
        if (this.state.selected) {
            overlay = <ActionEditOverlay
                action={this.state.selected.action}
                onSave={(act) => {
                    onRowChange(this.state.selected.key, this.state.selected.weight, this.state.selected.element, act)
                }}
                onClose={() => this.handleSelect(undefined)}/>
        }

        return (
            <React.Fragment>
                <ContentsEditor
                    headings={
                        <React.Fragment>
                            <th className="w-50">Frequency</th>
                            <th className="w-50">Value</th>
                            <th>Action</th>
                        </React.Fragment>
                    }
                    content={row => {
                        return (
                            <React.Fragment>
                                <td>
                                    <Form.Control
                                        type="number"
                                        value={row.weight}
                                        onChange={(e) => onRowChange(row.key, safeNumber(e.target.value), row.element, row.action)}
                                        min="1"
                                        required/>
                                </td>
                                <td>
                                    <Form.Control
                                        value={row.element}
                                        onChange={(e) => onRowChange(row.key, row.weight, e.target.value, row.action)}
                                        required/>
                                </td>
                                <td>
                                    <Button
                                        variant={row.action ? "success" : "primary"}
                                        className="action-button"
                                        onClick={() => {
                                            this.handleSelect(row)
                                        }}>
                                        {row.action ? "yes" : "no"}
                                    </Button>
                                </td>
                            </React.Fragment>
                        )
                    }}
                    placeholder={row => {
                        return (
                            <React.Fragment>
                                <td>
                                    <Form.Control
                                        type="number"
                                        value={row.weight}
                                        onChange={(e) => onRowChange(row.key, safeNumber(e.target.value), row.element, row.action)}
                                        min="1"/>
                                </td>
                                <td>
                                    <Form.Control
                                        placeholder="Add a new row"
                                        value={row.element}
                                        onChange={(e) => onRowChange(row.key, 1, e.target.value)}/>
                                </td>
                                <td>
                                    <div className="action-button"/>
                                </td>
                            </React.Fragment>
                        )
                    }}
                    {...other}
                />
                {overlay}
            </React.Fragment>
        );
    }
}

BareTableContentsEditor.propTypes = {
    items: PropTypes.array.isRequired,
    onRowDelete: PropTypes.func.isRequired
};

BareTableContentsEditor.contextType = AppContext;

const getNewItem = (weight = "", element = "", act) => {
    const item =  {
        weight: weight,
        element: element,
    };

    if (act) {
        item.action = act;
    }
    return item;
};

const TableContentsEditor = ContentsListManager(BareTableContentsEditor, getNewItem);

TableContentsEditor.propTypes = {
    items: PropTypes.array,
    onListUpdate: PropTypes.func,
    onCancel: PropTypes.func
};

export {TableContentsEditor as default, BareTableContentsEditor};