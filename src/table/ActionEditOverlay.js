import PropTypes from 'prop-types';
import React, {Component} from 'react';
import Accordion from "react-bootstrap/esm/Accordion";
import Button from "react-bootstrap/esm/Button";
import Modal from "react-bootstrap/esm/Modal";
import AccordionCardEntry from "../utility/AccordionCardEntry";
import ActionSelect from "../utility/ActionSelect";


class ActionEditOverlay extends Component {
    constructor(props) {
        super(props);

        const action = this.props.action;
        const type = this.getActionType(action);
        if (type === "string") {
            this.state = {
                actStr: action,
                actObj: undefined
            };
        } else if (type === "object") {
            this.state = {
                actStr: "",
                actObj: action
            };
        } else {
            this.state = {
                actStr: "",
                actObj: undefined
            };
        }

        this.handleTypeChange = this.handleTypeChange.bind(this);
        this.handleStrChange = this.handleStrChange.bind(this);
    }

    getActionType(act) {
        const type = typeof act;
        if (type === "string" || type === "object") {
            return type;
        }
        return "none"
    }

    handleTypeChange() {
        this.setState({actStr: "", actObj: undefined})
    }

    handleStrChange(str) {
        this.setState({actStr: str})
    }

    render() {
        return (
            <Modal show={this.props.show}>
                <Modal.Header>
                    Action Config
                </Modal.Header>
                <Modal.Body>
                    <Accordion defaultActiveKey={this.getActionType(this.props.action)}>
                        <AccordionCardEntry
                            eventKey="none"
                            heading="None"
                            onClick={this.handleTypeChange}>
                            <span>No further actions will occur when this result is rolled.</span>
                        </AccordionCardEntry>
                        <AccordionCardEntry
                            eventKey="string"
                            heading="Existing Action"
                            onClick={this.handleTypeChange}>
                            <span>The selected action will occur whenever this result is rolled</span>
                            <ActionSelect
                                actions={this.props.allActions}
                                selected={this.state.actStr}
                                onChange={this.handleStrChange}/>
                        </AccordionCardEntry>
                        <AccordionCardEntry
                            eventKey="object"
                            heading="Custom Action"
                            onClick={this.handleTypeChange}>
                            <span>The following results will be rolled whenever this result is rolled</span>
                            <ActionSelect
                                actions={this.props.allActions}
                                selected={this.state.actStr}
                                onChange={this.handleStrChange}/>
                        </AccordionCardEntry>
                    </Accordion>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="primary" onClick={() => {
                        if (this.state.actStr) {
                            this.props.onSave(this.state.actStr);
                        } else if (this.state.actObj) {
                            this.props.onSave(this.state.actObj);
                        } else {
                            this.props.onSave();
                        }
                        this.props.onClose();
                    }}>
                        Save Changes
                    </Button>
                    <Button variant="danger" onClick={this.props.onClose}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
        )
    }
}

ActionEditOverlay.propTypes = {
    action: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.object
    ]),
    allActions: PropTypes.array,
    contentTables: PropTypes.array,
    show: PropTypes.bool,
    onSave: PropTypes.func,
    onClose: PropTypes.func,
};

ActionEditOverlay.defaultProps = {
    show: true
};

export default ActionEditOverlay;