import React, {Component} from 'react';
import ValueDisplay from "../utility/ValueDisplay";
import ActionSelect from "../action/ActionSelect";
import {findTable, findAction} from "../utility/Utils"

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
                const results = this.performAction(findAction(row.action, this.props.actions));
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
                    <div className="">
                        <div className="input-group">
                            <ActionSelect
                                className="form-control"
                                selected={this.state.selectedAction && this.state.selectedAction.key}
                                onActionSelect={this.handleActionSelect}
                                groups={actionGroups}/>
                            <div className="input-group-append">
                                <button className="btn btn-primary" onClick={this.performSelectedAction}>Roll</button>
                            </div>
                        </div>
                    </div>
                </div>
            </React.Fragment>
        );
    }
}

export default ScreenRollAction;