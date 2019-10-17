import React, {Component} from 'react';

/**
 * Properties:
 * groups: Array of objects
 * > label: String to display
 * > actions: Array of Action objects
 * -> key: String unique ID for action
 * -> desc: String descriptive text for action
 * selected: String unique id for selected action
 * handleChange: Method Pointer to handle updates to selection
 */
class ActionSelect extends Component {
    constructor(props) {
        super(props);

        this.handleChange().bind(this);
    }

    handleChange(event) {
        if (this.props.handleChange) {
            this.props.handleChange(this.findAction(event.target.value));
        }
    }

    findAction(id) {
        for (let grp in this.props.groups) {
            for (let action in grp) {
                if (action.key === id) {
                    return action;
                }
            }
        }
        return null;
    }

    render() {
        return (
            <select name="roll-select" id="roll-select" value={this.props.selected} onChange={this.props.handleChange}>
                <option value="">Please select an action</option>
                {this.props.groups.map(group => {
                    return (
                        <optgroup label={group.label}>
                            {group.actions.map((action) => {
                                return <option value={action.key} key={action.key}>{action.desc}</option>
                            })}
                        </optgroup>
                    )
                })}
            </select>
        );
    }
}

export default ActionSelect;