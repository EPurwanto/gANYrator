import React, {ChangeEvent, Component, FormEvent} from 'react';
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import TableContentsEditor from "./TableContentsEditor";
import {Table, TableContent} from "../utility/TableUtils";

interface IProps {
    table: Table;
    onSave: (oldTable: Table, name: string, desc: string, contents: TableContent[]) => string | null;
    onCancel: () => void;
}

interface IState {
    name: string;
    desc: string;
    contents: TableContent[];
    saved: boolean;
}

class ScreenEditTable extends Component<IProps, IState> {
    constructor(props: IProps) {
        super(props);

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

    handleNameChange(e: ChangeEvent) {
        if (e.currentTarget instanceof HTMLInputElement)
            this.setState({name: e.currentTarget.value})
    }

    handleDescChange(e: ChangeEvent) {
        if (e.currentTarget instanceof HTMLInputElement)
            this.setState({desc: e.currentTarget.value})
    }

    handleContentsUpdate(list: TableContent[]) {
        this.setState({contents: list});
    }

    handleSubmit(e: FormEvent<HTMLFormElement>) {
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
                                maxLength={60}
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
                                maxLength={400}
                                value={this.state.desc}
                                onChange={this.handleDescChange}/>
                        </Form.Group>
                    </Col>
                </Row>
                <TableContentsEditor
                    items={this.state.contents}
                    onListUpdate={this.handleContentsUpdate}/>
            </form>
        );
    }
}

// ScreenEditTable.propTypes = {
//     table: PropTypes.shape({
//         name: PropTypes.string,
//         desc: PropTypes.string,
//         contents: PropTypes.array
//     }),
//     onSave: PropTypes.func
// };
//
// ScreenEditTable.defaultProps = {
//     table: {
//         name: "",
//         desc: "",
//         contents: []
//     }
// };

export default ScreenEditTable;
