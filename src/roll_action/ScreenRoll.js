import React, {Component} from 'react';
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import InputGroup from "react-bootstrap/InputGroup";
import Row from "react-bootstrap/Row";
import {findAction, findTable} from "../utility/Utils"
import ActionSelect from "./ActionSelect";
import ValueDisplay from "./ValueDisplay";

class ScreenRoll extends Component {
    constructor(props) {
        super(props);

        this.state = {
            selectedAction: undefined,
            values: {},
        };

        this.handleActionSelect = this.handleActionSelect.bind(this);
        this.performSelectedAction = this.performSelectedAction.bind(this);
    }

    handleActionSelect(action) {
        this.setState({selectedAction: findAction(action, this.props.actions)});
    }

    performSelectedAction() {
        if (this.state.selectedAction) {
            const values = this.performAction(this.state.selectedAction);

            this.setState({
                values: values,
            })
        }
    }

    performAction(action) {
        let values = {};

        action.contents.forEach((action) => {
            const table = findTable(action.table, this.props.contentTables);
            const row = this.rollOn(table);

            if (action.hasOwnProperty("field")) {
                values[action.field] = row.element;
            } else {
                values[table.name] = row.element;
            }

            if(row.hasOwnProperty("action")) {
                action = row.action;
                if (typeof action === "string") {
                    action = findAction(action, this.props.actions);
                }

                const results = this.performAction(action);
                values = {...values, ...results};
            }
        });

        return values;
    }

    rollOn(table) {
        if (table.totalWeight === 0) {
            return;
        }

        const roll = Math.floor(Math.random() * table.totalWeight);

        let counter = 0;
        for (let i = 0; i < table.contents.length; i++) {
            const row = table.contents[i];
            counter += row.weight;
            if (counter > roll) {

                return row;
            }
        }
    }

    render() {
        const actionGroups = {};

        this.props.actions.forEach(act => {
           if (!actionGroups.hasOwnProperty(act.group)) {
               actionGroups[act.group] = [];
           }
           actionGroups[act.group].push(act)
        });

        return (
            <React.Fragment>

                <Row>
                    {/* Last rolled field Values */}
                    {
                        Object.entries(this.state.values).map(([key, val]) => {
                            return (
                                <Col
                                    key={key}
                                    sm="2">
                                    <ValueDisplay
                                        label={key}
                                        value={val}/>
                                </Col>
                            )
                        })
                    }
                </Row>

                <Row>
                    <Col sm={{span: 6, offset: 3}}>
                        {/* Roll Dropdown */}
                        <InputGroup>
                            <ActionSelect
                                className="form-control form-control-action"
                                selected={this.state.selectedAction && this.state.selectedAction.key}
                                onActionSelect={this.handleActionSelect}
                                groups={actionGroups}/>
                            <InputGroup.Append>
                                <Button varient="primary" onClick={this.performSelectedAction}>Roll</Button>
                            </InputGroup.Append>
                        </InputGroup>
                    </Col>
                </Row>
            </React.Fragment>
        );
    }
}

export default ScreenRoll;