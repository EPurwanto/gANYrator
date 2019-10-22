import React, {Component} from 'react';
import ValueDisplay from "../utility/ValueDisplay";
import ActionSelect from "./ActionSelect";
import {findTable, findAction} from "../utility/Utils"
import {Button, InputGroup} from "react-bootstrap";

class ScreenRollAction extends Component {
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
                const results = this.performAction(row.action);
                values = {...values, ...results};
            }
        });

        return values;
    }

    rollOn(table) {
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

                <div className="row">
                    {/* Last rolled field Values */}
                    {
                        Object.entries(this.state.values).map(([key, val]) => {
                            return <ValueDisplay className="col-sm" key={key} uniqueId={key} label={key} value={val}/>
                        })
                    }
                </div>

                <div className="mx-auto text-center col-sm-5">
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
                </div>
            </React.Fragment>
        );
    }
}

export default ScreenRollAction;