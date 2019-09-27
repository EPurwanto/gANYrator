import React, {Component} from 'react';
import ContentTableAccordian from "../content_table/ContentTableAccordian";
import ValueDisplay from "../utility/ValueDisplay";

class ScreenRollAction extends Component {
    constructor(props) {
        super(props);

        this.state = {
            selectedAction: '',
            values: [],
        };
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
                    {this.state.values.map((val) => {
                        return <ValueDisplay key={val.field} label={val.field} value={val.value}/>
                    })}
                </div>

                <div className="col-sm-8">
                    <ContentTableAccordian contentTables={this.props.contentTables}/>
                </div>
            </div>
        );
    }
}

export default ScreenRollAction;