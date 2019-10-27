import React, {Component} from 'react';
import Button from "react-bootstrap/esm/Button";
import Col from "react-bootstrap/esm/Col";
import Form from "react-bootstrap/esm/Form";
import Row from "react-bootstrap/esm/Row";
import TableContentsEditor from "./TableContentsEditor";

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
        this.handleRowChange = this.handleRowChange.bind(this);
        this.handleRowDelete = this.handleRowDelete.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleReset = this.handleReset.bind(this);
        this.handleRowTypeChange = this.handleRowTypeChange.bind(this);
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

            // push a random float as temporary key value, highly unlikely to clash
            contents.forEach(r => {r.key = Math.random()});

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

    handleRowDelete(key) {
        const contents = this.state.contents.slice();
        const index = contents.findIndex(r => {return r.key === key});

        contents.splice(index, 1);
        this.setState({contents: contents});
    }

    handleRowSelect(row) {
        this.setState({selectedRow: row, selectedRowType: this.getRowType(row)});
    }

    handleRowTypeChange(type) {
        this.setState({selectedRowType: type});
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
                    onRowChange={this.handleRowChange}
                    onRowDelete={this.handleRowDelete}
                    />
            </form>
        );
    }
}

export default ScreenEditTable;