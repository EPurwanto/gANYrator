import React, {Component} from 'react';
import Accordion from "react-bootstrap/Accordion";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import ActionContentsEditor from "../action/ActionContentsEditor";
import AppContext from "../AppContext";
import AccordionCardEntry from "../structure/AccordionCardEntry";
import ActionSelect from "../utility/ActionSelect";
import {Action, ActionContent} from "../utility/ActionUtils";

interface IProps {
    show: boolean;
    action?: string | Action;
    onSave: (action?: string | Action) => void;
    onClose: () => void;
}

interface IState {
    actStr: string;
    actObj?: Action;
}

class ActionEditOverlay extends Component<IProps, IState> {
    constructor(props: IProps) {
        super(props);

        const state : IState = {
            actStr: "",
            actObj: undefined
        };

        const action = this.props.action;
        if (typeof action === "string") {
            state.actStr = action;
        } else if (action) {
            state.actObj = action as Action;
        }

        this.state = state;

        this.handleTypeChange = this.handleTypeChange.bind(this);
        this.handleStrChange = this.handleStrChange.bind(this);
        this.handleContentsUpdate = this.handleContentsUpdate.bind(this);
    }

    handleTypeChange() {
        this.setState({actStr: "", actObj: undefined})
    }

    handleStrChange(str: string) {
        this.setState({actStr: str})
    }

    handleContentsUpdate(list: ActionContent[]) {
        this.setState({
            actObj: {
                name: "",
                desc: "",
                group: "",
                contents: list
            }
        });
    }

    render() {
        let state = "none";
        if (this.state.actStr)
            state = "string";
        else if (this.state.actObj)
            state = "object";

        return (
            <Modal show={this.props.show}>
                <Modal.Header>
                    Action Config
                </Modal.Header>
                <Modal.Body>
                    <Accordion defaultActiveKey={state}>
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
                                selected={this.state.actStr}
                                onChange={this.handleStrChange}/>
                        </AccordionCardEntry>
                        <AccordionCardEntry
                            eventKey="object"
                            heading="Custom Action"
                            onClick={this.handleTypeChange}>
                            <span>The following results will be rolled whenever this result is rolled</span>
                            <ActionContentsEditor
                                items={this.state.actObj ? this.state.actObj.contents : []}
                                onListUpdate={this.handleContentsUpdate}/>
                        </AccordionCardEntry>
                    </Accordion>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="primary" onClick={() => {
                        if (this.state.actStr) {
                            this.props.onSave(this.state.actStr);
                        } else if (this.state.actObj && this.state.actObj.contents.length > 0) {
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

// ActionEditOverlay.propTypes = {
//     action: PropTypes.oneOfType([
//         PropTypes.string,
//         PropTypes.object
//     ]),
//     show: PropTypes.bool,
//     onSave: PropTypes.func,
//     onClose: PropTypes.func,
// };

// ActionEditOverlay.defaultProps = {
//     show: true
// };

ActionEditOverlay.contextType = AppContext;

export default ActionEditOverlay;
