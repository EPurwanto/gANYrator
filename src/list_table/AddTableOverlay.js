import React, {useState} from 'react';
import AccordianCardEntry from "../utility/AccordionCardEntry";
import {Modal, Button, Form} from "react-bootstrap";
import Accordion from "react-bootstrap/Accordion";

const AddTableOverlay = (props) => {
    const [name, setName] = useState("");
    const [desc, setDesc] = useState("");

    return (
        <Modal show={props.show} onHide={props.onClose}>
            <Modal.Header closeButton>
                <Modal.Title>Add a new table</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Accordion>
                    <AccordianCardEntry
                        eventKey="create"
                        heading="Create a new Table">
                        <form onSubmit={() => props.onTableCreate && props.onTableCreate(name, desc)}>
                            <Form.Group controlId="tableName">
                                <Form.Label column={false}>Table Name</Form.Label>
                                <Form.Control
                                    type="text"
                                    maxLength="60"
                                    value={name}
                                    onChange={e => setName(e.target.value)}/>
                            </Form.Group>
                            <Form.Group controlId="tableDesc">
                                <Form.Label column={false}>Table Description</Form.Label>
                                <Form.Control
                                    as="textarea"
                                    maxLength="400"
                                    value={desc}
                                    onChange={e => setDesc(e.target.value)}/>
                            </Form.Group>
                            <Button variant="primary" type="submit">
                                Create
                            </Button>
                        </form>
                    </AccordianCardEntry>
                    <AccordianCardEntry
                        eventKey="upload"
                        heading="Upload an existing table">
                        <span>These features are not yet complete</span>
                    </AccordianCardEntry>
                    <AccordianCardEntry
                        eventKey="select"
                        heading="Use a table from our library">
                        <span>These features are not yet complete</span>
                        <button className="btn btn-primary" onClick={props.onLoadTables} data-dismiss="modal">
                            Load the existing tables
                        </button>
                    </AccordianCardEntry>
                </Accordion>
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