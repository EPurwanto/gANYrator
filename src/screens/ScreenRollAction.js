import React, {Component} from 'react';
import ContentTableAccordian from "../content_table/ContentTableAccordian";
import ValueDisplay from "../utility/ValueDisplay";

class ScreenRollAction extends Component {
    constructor(props) {
        super(props);

        this.state = {
            selectedAction: '',
            values: {},
        };

        this.handleChange = this.handleChange.bind(this);
        this.performAction = this.performAction.bind(this);
    }

    handleChange(event) {
        this.setState({selectedAction: event.target.value});
    }

    performAction() {
        const tables = this.props.contentTables;

        let values = {};

        tables.forEach((table) => {
            values[table.field] = this.rollOn(table);
        });

        this.setState({
            values: values,
        })
    }

    rollOn(table) {
        const roll = Math.floor(Math.random() * table.totalWeight);

        let counter = 0;
        for (let i = 0; i < table.contents.length; i++) {
            const row = table.contents[i];
            counter += row.weight;
            if (counter > roll) {
                return row.element;
            }
        }
    }

    render() {

        return (
            <div className="row">

                {/* Roll Dropdown */}
                <div className="col-sm-4">
                    <div className="input-group">
                        <div className="input-group-prepend">
                            <button className="btn btn-primary" onClick={this.performAction}>Roll</button>
                        </div>
                        <select name="roll-select" id="roll-select" className="form-control" value={this.state.selectedAction} onChange={this.handleChange}>
                            <option value="">Please select an action</option>
                            <optgroup label="Actions">
                                <option value="action_npc">a new NPC</option>
                                <option value="action_tavern">a new Tavern</option>
                            </optgroup>
                            <optgroup label="Tables">
                                {this.props.contentTables.map((table) => {
                                    return <option value={table.key} key={table.key}>{table.desc}</option>
                                })}
                            </optgroup>
                        </select>
                    </div>

                    {/* Last rolled field Values */}
                    {
                        Object.entries(this.state.values).map(([key, val]) => {
                            return <ValueDisplay key={key} label={key} value={val}/>
                        })
                    }
                </div>

                <div className="col-sm-8">
                    <ContentTableAccordian contentTables={this.props.contentTables}/>
                </div>
            </div>
        );
    }
}

export default ScreenRollAction;