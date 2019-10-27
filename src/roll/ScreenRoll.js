import React, {Component} from 'react';
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import InputGroup from "react-bootstrap/InputGroup";
import Row from "react-bootstrap/Row";
import AppContext from "../AppContext";
import ActionSelect from "../utility/ActionSelect";
import {findAction} from "../utility/ActionUtils"
import {findTable} from "../utility/TableUtils";
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
        this.setState({selectedAction: findAction(action, this.context.actions)});
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

        action.contents.forEach((act) => {
            const table = findTable(act.table, this.context.contentTables);
            const row = this.rollOn(table);

            if (!row) {
                return;
            }

            if (act.hasOwnProperty("field") && act.field) {
                values[act.field] = row.element;
            } else {
                values[table.name] = row.element;
            }

            if(row.hasOwnProperty("action")) {
                let childAct = row.action;
                if (typeof childAct === "string") {
                    childAct = findAction(childAct, this.context.actions);
                }

                const results = this.performAction(childAct);
                values = {...values, ...results};
            }
        });

        return values;
    }

    rollOn(table) {
        if (!table.totalWeight) {
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
                                selected={this.state.selectedAction && this.state.selectedAction.name}
                                onChange={this.handleActionSelect}/>
                            <InputGroup.Append>
                                <Button varient="primary" onClick={this.performSelectedAction}>Roll <i className="fa fa-dice"/></Button>
                            </InputGroup.Append>
                        </InputGroup>
                    </Col>
                </Row>
            </React.Fragment>
        );
    }
}

ScreenRoll.contextType = AppContext;

export default ScreenRoll;