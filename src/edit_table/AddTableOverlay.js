import React, {useState} from 'react';
import AccordianCardEntry from "../utility/AccordianCardEntry";
import {Modal, Button, Form} from "react-bootstrap";

const AddTableOverlay = (props) => {
    const [name, setName] = useState("");
    const [desc, setDesc] = useState("");

    return (
        <Modal show={props.show} onHide={props.onClose}>
            <Modal.Header closeButton>
                <Modal.Title>Add a new table</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div className="accordion" id="create-options">
                    <AccordianCardEntry
                        id="create"
                        heading="Create a new Table"
                        parent="create-options">
                        <form onSubmit={() => props.onTableCreate && props.onTableCreate(name, desc)}>
                            <Form.Group controlId="tableName">
                                <Form.Label column={false}>Table Name</Form.Label>
                                <Form.Control
                                    type="text"
                                    value={name}
                                    onChange={e => setName(e.target.value)}/>
                            </Form.Group>
                            <Form.Group controlId="tableDesc">
                                <Form.Label column={false}>Table Description</Form.Label>
                                <Form.Control
                                    type="text"
                                    value={desc}
                                    onChange={e => setDesc(e.target.value)}/>
                            </Form.Group>
                            <Button variant="primary" type="submit">
                                Create
                            </Button>
                        </form>
                    </AccordianCardEntry>
                    <AccordianCardEntry
                        id="upload"
                        heading="Upload an existing table"
                        parent="create-options">
                        <span>These features are not yet complete</span>
                    </AccordianCardEntry>
                    <AccordianCardEntry
                        id="select"
                        heading="Use a table from our library"
                        parent="create-options">
                        <span>These features are not yet complete</span>
                        <button className="btn btn-primary" onClick={props.onLoadTables} data-dismiss="modal">
                            Load the existing tables
                        </button>
                    </AccordianCardEntry>
                </div>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={props.onClose}>
                    Cancel
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default AddTableOverlay;