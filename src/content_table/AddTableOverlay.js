import React from 'react';
import AccordianCardEntry from "../utility/AccordianCardEntry";

const AddTableOverlay = (props) => {
    return (
        <div className="modal" id={props.id} tabIndex="-1" role="dialog">
            <div className="modal-dialog" role="document">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">Add a new table</h5>
                        <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div className="modal-body">
                        <div className="accordion" id="create-options">
                            <AccordianCardEntry
                                id="create"
                                heading="Create a new Table"
                                parent="create-options"
                            >
                                <span>Here's some fields</span>
                            </AccordianCardEntry>
                            <AccordianCardEntry
                                id="upload"
                                heading="Upload an existing table"
                                parent="create-options"
                            >
                                <span>Here's some fields</span>
                            </AccordianCardEntry>
                            <AccordianCardEntry
                                id="select"
                                heading="Use a table from our library"
                                parent="create-options"
                            >
                                <span>Here's some fields</span>
                            </AccordianCardEntry>
                        </div>
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" data-dismiss="modal">Cancel</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AddTableOverlay;