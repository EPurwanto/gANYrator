import React, {Component} from 'react';
import Button from "react-bootstrap/esm/Button";
import Col from "react-bootstrap/esm/Col";
import Form from "react-bootstrap/esm/Form";
import Row from "react-bootstrap/esm/Row";
import ActionContentsEditor from "./ActionContentsEditor";

class ScreenEditAction extends Component {
    constructor(props, context) {
        super(props, context);

        let act = this.props.action;

        this.state = {
            name: act.name,
            desc: act.desc,
            group: act.group,
            contents: act.contents,
            saved: false
        };


        this.handleNameChange = this.handleNameChange.bind(this);
        this.handleDescChange = this.handleDescChange.bind(this);
        this.handleGroupChange = this.handleGroupChange.bind(this);
        this.handleContentsUpdate = this.handleContentsUpdate.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleReset = this.handleReset.bind(this);
    }

    handleNameChange(e) {
        this.setState({name: e.target.value})
    }

    handleDescChange(e) {
        this.setState({desc: e.target.value})
    }

    handleGroupChange(e) {
        this.setState({group: e.target.value})
    }

    handleContentsUpdate(list) {
        this.setState({contents: list});
    }

    handleSubmit(e) {
        e.preventDefault();
        if (this.props.onSave) {
            const message = this.props.onSave(this.props.action, this.state.name, this.state.desc, this.state.group, this.state.contents);

            if (message) {
                // todo handle error message
            } else {
                this.setState({saved: true});
                setTimeout(() => this.setState({saved: false}), 1000)
            }
        }
    }

    handleReset() {
        this.props.onCancel && this.props.onCancel();
    }

    render() {
        let saveButton = <Button variant="primary" size="sm" block className="mb-1" type="submit">Save <i className="fa fa-save"/></Button>;
        if (this.state.saved) {
            saveButton = <Button variant="success" size="sm" block className="mb-1" type="submit">Saved <i className="fa fa-check"/></Button>;
        }

        return (
            <form onSubmit={this.handleSubmit}>
                <Row>
                    <Col sm="10">
                        <Form.Group controlId="actionName">
                            <Form.Label column={false}>Action Name</Form.Label>
                            <Form.Control
                                type="text"
                                maxLength="60"
                                value={this.state.name}
                                onChange={this.handleNameChange}/>
                        </Form.Group>
                    </Col>
                    <Col sm="2">
                        <Button variant="danger" size="sm" block type="reset" onClick={this.handleReset}>
                            Back <i className="fa fa-arrow-left"/>
                        </Button>
                        {saveButton}
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Form.Group controlId="actionGroup">
                            <Form.Label column={false}>Action Group</Form.Label>
                            <Form.Control
                                maxLength="60"
                                value={this.state.group}
                                onChange={this.handleGroupChange}/>
                        </Form.Group>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Form.Group controlId="actionDesc">
                            <Form.Label column={false}>Action Description</Form.Label>
                            <Form.Control
                                as="textarea"
                                maxLength="400"
                                value={this.state.desc}
                                onChange={this.handleDescChange}/>
                        </Form.Group>
                    </Col>
                </Row>
                <ActionContentsEditor
                    items={this.state.contents}
                    onListUpdate={this.handleContentsUpdate}/>
            </form>
        );
    }
}

export default ScreenEditAction;