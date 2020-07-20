import PropTypes from 'prop-types';
import React, {Component, ReactNode} from 'react';
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import AppContext from "../AppContext";
import ContentsListManager from "../structure/ContentListManager";
import ActionEditOverlay from "./ActionEditOverlay";
import {TableContent} from "../utility/TableUtils";
import {Action} from "../utility/ActionUtils";
import ContentsEditor from "../structure/ContentsEditor";

type EditRow = TableContent & {key: number};

interface IProps {
    items: TableContent[];
    onRowChange: (key: number, weight: number, element?: string, act?: Action | string) => void;
    onRowDelete: (key: number, weight: number, element?: string, act?: Action | string) => void;
}

interface IState {
    selected?: EditRow;
}

function safeNumber(val: string, def= 1) {
    const i = parseInt(val, 10);
    if (isNaN(i)) {
        return def;
    }
    return i;
}

class BareTableContentsEditor extends Component<IProps, IState> {
    constructor(props: IProps) {
        super(props);

        this.state  = {
            selected: undefined
        }
    }

    handleSelect(row?: EditRow) {
        this.setState({selected: row})
    }

    render() {
        const {onRowChange, ...other} = this.props;

        let overlay: ReactNode;
        if (this.state.selected) {
            overlay = <ActionEditOverlay
                show={true}
                action={this.state.selected.action}
                onSave={(act?: string | Action) => {
                    onRowChange(this.state.selected!.key, this.state.selected!.weight, this.state.selected!.element, act)
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

BareTableContentsEditor.contextType = AppContext;

const getNewItem = (weight = "", element = "", act: Action) => {
    const item: TableContent =  {
        weight: safeNumber(weight),
        element: element,
        action: act
    };

    return item;
};

const TableContentsEditor : any = ContentsListManager(BareTableContentsEditor, getNewItem);

TableContentsEditor.propTypes = {
    items: PropTypes.array,
    onListUpdate: PropTypes.func,
    onCancel: PropTypes.func
};

export {TableContentsEditor as default, BareTableContentsEditor};
