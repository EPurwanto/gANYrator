import React, {Component} from 'react';
import Button from "react-bootstrap/esm/Button";
import Col from "react-bootstrap/esm/Col";
import Form from "react-bootstrap/esm/Form";
import Row from "react-bootstrap/esm/Row";
import Table from "react-bootstrap/esm/Table";

class ScreenEditTable extends Component {
    constructor(props, context) {
        super(props, context);

        this.state = {
            name: "",
            desc: "",
            contents: [],
            saved: false
        };


        this.handleNameChange = this.handleNameChange.bind(this);
        this.handleDescChange = this.handleDescChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleReset = this.handleReset.bind(this);
    }

    componentDidMount() {
        if (this.props.table) {
            const contents = JSON.parse(JSON.stringify(this.props.table.contents));

            // Push a placeholder for adding new rows
            contents.push({
                weight: undefined,
                element: "",
                placeholder: true
            });

            this.setState({
                name: this.props.table.name,
                desc: this.props.table.desc,
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


        contents[index] = {
            weight: freq,
            element: elem
        };

        if (act) {  // don't add action prop if not present
            contents[index].action = act;
        }

        this.setState({contents: contents});
    }

    handleSubmit(e) {
        e.preventDefault();
        if (this.props.onSave) {
            // Cut off the placeholder row
            const contents = this.state.contents.slice(0, -1);
            const message = this.props.onSave(this.props.table, this.state.name, this.state.desc, contents);

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
                        {saveButton}
                        <Button variant="danger" size="sm" block type="reset" onClick={this.handleReset}>
                            Cancel <i className="fa fa-times"/>
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
                                                onChange={(e) => this.handleRowChange(ind, e.target.value, "")}
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