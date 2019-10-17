import React, {Component} from 'react';
import ValueDisplay from "../utility/ValueDisplay";
import ActionSelect from "../action/ActionSelect";

class ScreenRollAction extends Component {
    constructor(props) {
        super(props);

        this.state = {
            selectedAction: {},
            values: {},
        };

        this.handleActionSelect = this.handleActionSelect.bind(this);
        this.performSelectedAction = this.performSelectedAction.bind(this);
    }

    handleActionSelect(action) {
        this.setState({selectedAction: action});
    }

    findAction(actionKey) {
        const autoActions = [];
        this.props.contentTables.forEach((table) => {
            autoActions.push({
                key:"action_auto_" + table.key,
                desc: table.desc,
                contents: [{table:table.key}]
            })
        });

        for (const act of autoActions) {
            if (act.key === actionKey) {
                return act;
            }
        }

        for (const act of this.props.actions) {
            if (act.key === actionKey) {
                return act;
            }
        }
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
        const values = this.performAction(this.state.selectedAction);

        this.setState({
            values: values,
        })
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
        const autoActions = [];
        this.props.contentTables.forEach((table) => {
            autoActions.push({
                key:"action_auto_" + table.key,
                desc: table.desc,
                contents: [{table:table.key}]
            })
        });

        const actionGroups = [
            {label: "Actions", actions: this.props.actions},
            {label: "Tables", actions: autoActions}
        ];

        return (
            <div className="mx-auto text-center col-sm-5">
                {/* Roll Dropdown */}
                <div className="">
                    <div className="input-group">
                        <div className="input-group-prepend">
                            <button className="btn btn-primary" onClick={this.performSelectedAction}>Roll</button>
                        </div>
                        <ActionSelect
                            className="form-control"
                            selected={this.state.selectedAction && this.state.selectedAction.key}
                            onActionSelect={this.handleActionSelect}
                            groups={actionGroups}/>
                    </div>

                    {/* Last rolled field Values */}
                    {
                        Object.entries(this.state.values).map(([key, val]) => {
                            return <ValueDisplay key={key} uniqueId={key} label={key} value={val}/>
                        })
                    }
                </div>

                <span className="">
                    OR
                </span>

                <div className="input-group">
                    <button className="btn btn-primary form-control" onClick={this.performAction}>Edit Tables and Actions</button>
                </div>
            </div>
        );
    }
}

export default ScreenRollAction;