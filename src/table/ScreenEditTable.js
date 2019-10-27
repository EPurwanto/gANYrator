import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Button from "react-bootstrap/esm/Button";
import Col from "react-bootstrap/esm/Col";
import Form from "react-bootstrap/esm/Form";
import Row from "react-bootstrap/esm/Row";
import TableContentsEditor from "./TableContentsEditor";

class ScreenEditTable extends Component {
    constructor(props, context) {
        super(props, context);

        this.state = {
            name: props.table.name,
            desc: props.table.desc,
            contents: props.table.contents,
            saved: false
        };

        this.handleNameChange = this.handleNameChange.bind(this);
        this.handleDescChange = this.handleDescChange.bind(this);
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

    handleContentsUpdate(list) {
        this.setState({contents: list});
    }

    handleSubmit(e) {
        e.preventDefault();
        if (this.props.onSave) {
            const message = this.props.onSave(this.props.table, this.state.name, this.state.desc, this.state.contents);

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
                        <Form.Group controlId="tableName">
                            <Form.Label column={false}>Table Name</Form.Label>
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
                        <Form.Group controlId="tableDesc">
                            <Form.Label column={false}>Table Description</Form.Label>
                            <Form.Control
                                as="textarea"
                                maxLength="400"
                                value={this.state.desc}
                                onChange={this.handleDescChange}/>
                        </Form.Group>
                    </Col>
                </Row>
                <TableContentsEditor
                    items={this.state.contents}
                    actions={this.props.actions}
                    contentTables={this.props.contentTables}
                    onListUpdate={this.handleContentsUpdate}
                    />
            </form>
        );
    }
}

ScreenEditTable.propTypes = {
    table: PropTypes.shape({
        name: PropTypes.string,
        desc: PropTypes.string,
        contents: PropTypes.array
    }),
    onSave: PropTypes.func
};

ScreenEditTable.defaultProps = {
    table: {
        name: "",
        desc: "",
        contents: []
    }
};

export default ScreenEditTable;