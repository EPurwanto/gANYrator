import React, {Component} from 'react';
import ValueDisplay from "../utility/ValueDisplay";
import ActionSelect from "../action/ActionSelect";

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
        this.setState({selectedAction: this.findAction(action)});
    }

    findAction(actionKey) {
        for (const act of this.props.actions) {
            if (act.key === actionKey) {
                return act;
            }
        }
        return undefined;
    }

    findTable(tableKey) {
        const tables = this.props.contentTables;

        for (const table of tables) {
            if (table.key === tableKey) {
                return table;
            }
        }
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
            const table = this.findTable(action.table);
            const row = this.rollOn(table);

            if (action.hasOwnProperty("field")) {
                values[action.field] = row.element;
            } else {
                values[table.defaultField] = row.element;
            }

            if(row.hasOwnProperty("action")) {
                const results = this.performAction(this.findAction(row.action));
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