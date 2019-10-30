import PropTypes from 'prop-types';
import React from 'react';
import Button from "react-bootstrap/Button";
import Table from "react-bootstrap/Table";

const ContentsEditor = (props) => {
    return (
        <Table striped size="sm">
            <thead>
            <tr>
                {props.headings}
                <th className="button-column"/>
            </tr>
            </thead>
            <tbody>
            {
                props.items.map((row) => {
                    if (row.placeholder) {
                        return (
                            <tr key={row.key}>
                                {props.placeholder(row)}
                                <td/>
                            </tr>
                        );
                    }
                    return (
                        <tr key={row.key}>
                            {props.content(row)}
                            <td>
                                {props.buttons(row)}
                                <Button variant="danger" onClick={() => {props.onRowDelete(row.key)}}><i className="fa fa-trash"/></Button>
                            </td>
                        </tr>
                    );
                })
            }
            </tbody>
        </Table>
    );
};

ContentsEditor.propTypes = {
    items: PropTypes.array.isRequired,
    headings: PropTypes.element.isRequired,
    content: PropTypes.func.isRequired,
    placeholder: PropTypes.func,
    buttons: PropTypes.func,
    onRowDelete: PropTypes.func.isRequired
};

ContentsEditor.defaultProps = {
    placeholder: () => {return ""},
    buttons: () => {return ""}
};


export default ContentsEditor;