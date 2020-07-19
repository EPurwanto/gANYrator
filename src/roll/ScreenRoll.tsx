import React, {Component} from 'react';
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import InputGroup from "react-bootstrap/InputGroup";
import Row from "react-bootstrap/Row";
import AppContext from "../AppContext";
import ActionSelect from "../utility/ActionSelect";
import {Action, findAction} from "../utility/ActionUtils"
import {findTable, Table} from "../utility/TableUtils";
import ValueDisplay from "./ValueDisplay";
import {string} from "prop-types";

interface IProps {

}

interface IState {
    selectedAction?: Action;
    values: Map<string, string>;
}

class ScreenRoll extends Component<IProps, IState> {
    constructor(props: {}) {
        super(props);

        this.state = {
            selectedAction: undefined,
            values: new Map<string, string>(),
        };

        this.handleActionSelect = this.handleActionSelect.bind(this);
        this.performSelectedAction = this.performSelectedAction.bind(this);
    }

    handleActionSelect(action: string) {
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

    performAction(action: Action) {
        let values: any = {};

        action.contents.forEach((act) => {
            const table = findTable(act.table, this.context.contentTables);

            if (table) {
                const row = this.rollOn(table);

                if (!row) {
                    return;
                }

                if (act.hasOwnProperty("field") && act.field) {
                    values[act.field] = row.element;
                } else {
                    values[table.name] = row.element;
                }

                let childAct: Action | undefined;
                if(typeof row.action === "string") {
                    childAct = findAction(row.action, this.context.actions);
                } else {
                    childAct = row.action;
                }

                if (childAct){
                    const results = this.performAction(childAct);
                    values = {...values, ...results};
                }
            } else {
                console.log("Unable to find table " + act.table)
            }
        });

        return values;
    }

    rollOn(table: Table) {
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
                    <Col sm="12">
                        <h3>What's a gANYrator?</h3>
                    </Col>
                    <Col sm="12">
                        <p>gANYrator is a content generation system for tabletop RPG's such as Dungeons and Dragons. Build
                            tables of content, link them together with actions, and then use them to roll random NPC's,
                            Towns, Loot or more. You can get started by creating your own tables or playing around with
                            the default tables.</p>
                    </Col>
                </Row>

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
                                <Button variant="primary" onClick={this.performSelectedAction}>Roll <i className="fa fa-dice"/></Button>
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
