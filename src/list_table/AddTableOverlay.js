import React, {Component} from 'react';
import Accordion from "react-bootstrap/Accordion";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import AccordionCardEntry from "../utility/AccordionCardEntry";

// todo change form submit to handle closing overlay, move this to a class


class AddTableOverlay extends Component {
    constructor(props, context) {
        super(props, context);

        this.state = {
            name: "",
            message: ""
        };

        this.handleNameChange = this.handleNameChange.bind(this);
        this.handleTableLoad = this.handleTableLoad.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleNameChange(e) {
        this.setState({name: e.target.value})
    }

    handleTableLoad() {
        this.props.onLoadTables();
        this.props.onClose();
    }

    handleSubmit() {
        const message = this.props.onTableCreate(this.state.name);
        if (message) {
            this.setState({message: message});
        } else {
            this.props.onClose();
        }
    }

    render() {
        return (
            <Modal show={this.props.show} onHide={this.props.onClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Add a new table</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Accordion>
                        <AccordionCardEntry
                            eventKey="create"
                            heading="Create a new Table">
                            <form onSubmit={this.handleSubmit}>
                                <Form.Group controlId="tableName">
                                    <Form.Label column={false}>Table Name</Form.Label>
                                    <Form.Control
                                        type="text"
                                        isInvalid={this.state.message !== ""}
                                        maxLength="60"
                                        value={this.state.name}
                                        onChange={this.handleNameChange}/>
                                    <Form.Control.Feedback type="invalid">{this.state.message}</Form.Control.Feedback>
                                </Form.Group>
                                <Button variant="primary" type="submit">
                                    Create
                                </Button>
                            </form>
                        </AccordionCardEntry>
                        <AccordionCardEntry
                            eventKey="upload"
                            heading="Upload an existing table">
                            <span>These features are not yet complete</span>
                        </AccordionCardEntry>
                        <AccordionCardEntry
                            eventKey="select"
                            heading="Use a table from our library">
                            <span>These features are not yet complete</span>
                            <button className="btn btn-primary" onClick={this.handleTableLoad} data-dismiss="modal">
                                Load the existing tables
                            </button>
                        </AccordionCardEntry>
                    </Accordion>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={this.props.onClose}>
                        Cancel
                    </Button>
                </Modal.Footer>
            </Modal>
        );
    }
}
export default AddTableOverlay;