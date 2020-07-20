import PropTypes from 'prop-types';
import React from 'react';
import Form from "react-bootstrap/Form";
import ContentsListManager from "../structure/ContentListManager";
import ContentsEditor from "../structure/ContentsEditor";
import TableSelect from "../utility/TableSelect";
import {ActionContent} from "../utility/ActionUtils";

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
    items: ActionContent[];
    onRowChange: (key: number, table: string, field?: string) => void;
    onRowDelete: (key: number, table: string, field?: string) => void;
}


const BareActionContentsEditor = (props: IProps) => {
    const {onRowChange, ...other} = props;
    return (
        <ContentsEditor
            headings={
                <React.Fragment>
                    <th className="w-50">Table</th>
                    <th className="w-50">Field</th>
                </React.Fragment>
            }
            content={row => { return (
                <React.Fragment>
                    <td>
                        <TableSelect
                            value={row.table}
                            onChange={(e) => {onRowChange(row.key, e.target.value, row.field)}}
                            includeEmpty={true}/>

                    </td>
                    <td>
                        <Form.Control
                            value={row.field}
                            onChange={(e) => {onRowChange(row.key, row.table, e.target.value)}}
                            placeholder={row.table}/>
                    </td>
                </React.Fragment>
            )}}
            placeholder={row => { return (
                <React.Fragment>
                    <td>
                        <TableSelect
                            includeEmpty={true}
                            value={row.table}
                            onChange={(e) => {onRowChange(row.key, e.target.value, row.field)}}/>
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

BareActionContentsEditor.propTypes = {
    items: PropTypes.array.isRequired,
    onRowDelete: PropTypes.func.isRequired,
    onRowChange: PropTypes.func.isRequired
};

const getNewItem = (table = "", field = "") => {
    return {
        table: table,
        field: field,
    }
};

const ActionContentsEditor = ContentsListManager(BareActionContentsEditor, getNewItem);

// ActionContentsEditor.propTypes = {
//     items: PropTypes.array,
//     onListUpdate: PropTypes.func
// };

export {ActionContentsEditor as default, BareActionContentsEditor};
