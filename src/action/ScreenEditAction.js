import React, {Component} from 'react';
import Button from "react-bootstrap/esm/Button";
import Col from "react-bootstrap/esm/Col";
import Form from "react-bootstrap/esm/Form";
import Row from "react-bootstrap/esm/Row";
import ActionContentsEditor from "./ActionContentsEditor";

class ScreenEditAction extends Component {
    constructor(props, context) {
        super(props, context);

        this.state = {
            name: "",
            desc: "",
            group: "",
            contents: [],
            saved: false
        };


        this.handleNameChange = this.handleNameChange.bind(this);
        this.handleDescChange = this.handleDescChange.bind(this);
        this.handleGroupChange = this.handleGroupChange.bind(this);
        this.handleRowChange = this.handleRowChange.bind(this);
        this.handleRowDelete = this.handleRowDelete.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleReset = this.handleReset.bind(this);
    }

    componentDidMount() {
        if (this.props.action) {
            let act = this.props.action;
            const contents = JSON.parse(JSON.stringify(act.contents));

            // Push a placeholder for adding new rows
            contents.push({
                table: "",
                field: "",
                placeholder: true
            });

            // push a random float as temporary key value, highly unlikely to clash
            contents.forEach(r => {r.key = Math.random()});

            this.setState({
                name: act.name,
                desc: act.desc,
                group: act.group,
                contents: contents
            });
        }
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

    handleRowChange(key, table = "", field = "") {
        const contents = this.state.contents.slice();
        const index = contents.findIndex(r => {return r.key === key});

        const row = contents[index];
        if (row.placeholder) {
            // push a new placeholder row
            contents.push({
                weight: undefined,
                element: "",
                key: Math.random(),
                placeholder: true
            });
        }


        contents[index] = {
            table: table,
            field: field,
            key: row.key
        };

        this.setState({contents: contents});
    }

    handleRowDelete(key) {
        const contents = this.state.contents.slice();
        const index = contents.findIndex(r => {return r.key === key});

        contents.splice(index, 1);
        this.setState({contents: contents});
    }

    handleSubmit(e) {
        e.preventDefault();
        if (this.props.onSave) {
            // Cut off the placeholder row
            const contents = this.state.contents.slice(0, -1);

            // strip out row keys
            contents.forEach(r => {delete r.key});

            const message = this.props.onSave(this.props.action, this.state.name, this.state.desc, this.state.group, contents);

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
                    contentTables={this.props.contentTables}
                    items={this.state.contents}
                    onRowChange={this.handleRowChange}
                    onRowDelete={this.handleRowDelete}/>
            </form>
        );
    }
}

export default ScreenEditAction;