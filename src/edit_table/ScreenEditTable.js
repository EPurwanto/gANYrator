import React, {Component} from 'react';
import Button from "react-bootstrap/esm/Button";
import Col from "react-bootstrap/esm/Col";
import Form from "react-bootstrap/esm/Form";
import Row from "react-bootstrap/esm/Row";
import Table from "react-bootstrap/esm/Table";

class ScreenEditTable extends Component {
    constructor(props, context) {
        super(props, context);

        if (this.props.table) {
            const contents = JSON.parse(JSON.stringify(props.table.contents));

            // Push a placeholder for adding new rows
            contents.push({
                weight: undefined,
                element: "",
                placeholder: true
            });

            this.state = {
                name: this.props.table.name,
                desc: this.props.table.desc,
                contents: contents
            }
        } else {
            this.state = {
                name: "",
                desc: "",
                contents: []
            }
        }
        this.handleNameChange = this.handleNameChange.bind(this);
        this.handleDescChange = this.handleDescChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleReset = this.handleReset.bind(this);
    }

    handleNameChange(e) {
        this.setState({name: e.target.value})
    }

    handleDescChange(e) {
        this.setState({desc: e.target.value})
    }

    handleRowChange(index, freq, elem, act) {
        const contents = this.state.contents.slice();
        const row = contents[index];
        if (row.placeholder) {
            // push a new placeholder row
            contents.push({
                weight: undefined,
                element: "",
                placeholder: true
            });
        }

        if (act) {  // No action
            contents[index] = {
                weight: freq,
                element: elem,
                action: act
            };
        } else {    // No action
            contents[index] = {
                weight: freq,
                element: elem
            };
        }

        this.setState({contents: contents});
    }

    handleSubmit() {
        this.props.onTableSave && this.props.onTableSave(this.props.table, this.state.name, this.state.desc, this.contents);
    }

    handleReset() {
        this.props.onCancel && this.props.onCancel();
    }

    render() {
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
                        <Button variant="primary" size="sm" block className="mb-1" type="submit">
                            Save
                        </Button>
                        <Button variant="danger" size="sm" block type="reset">
                            Cancel
                        </Button>
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
                <Table striped size="sm">
                    <thead>
                    <tr>
                        <th>Frequency</th>
                        <th className="w-75">Value</th>
                        <th>Action</th>
                    </tr>
                    </thead>
                    <tbody>
                    {
                        this.state.contents.map((row, ind) => {
                            if (row.placeholder) {
                                return (
                                    <tr key={ind}>
                                        <td>
                                            <Form.Control
                                                type="number"
                                                placeholder="1"
                                                onChange={(e) => this.handleRowChange(ind, e.target.value, row.element, row.action)}
                                            />
                                        </td>
                                        <td>
                                            <Form.Control
                                                placeholder="Add a new row"
                                                onChange={(e) => this.handleRowChange(ind, 1, e.target.value)}/>
                                        </td>
                                        <td/>
                                    </tr>
                                );
                            }
                            return (
                                <tr key={ind}>
                                    <td>
                                        <Form.Control
                                            type="number"
                                            value={row.weight}
                                            onChange={(e) => this.handleRowChange(ind, e.target.value, row.element, row.action)}
                                            min="1"
                                            required/>
                                    </td>
                                    <td>
                                        <Form.Control
                                            value={row.element}
                                            onChange={(e) => this.handleRowChange(ind, row.weight, e.target.value, row.action)}
                                            required/>
                                    </td>
                                    <td><Button block variant={row.action ? "success": "primary"}>{row.action ? "yes": "no"}</Button></td>
                                </tr>
                            );
                        })
                    }
                    </tbody>
                </Table>
            </form>
        );
    }
}

export default ScreenEditTable;