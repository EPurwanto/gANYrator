import React, {Component} from 'react';

/**
 * Properties:
 * groups: Array of objects
 * > label: String to display
 * > actions: Array of Action objects
 * -> key: String unique ID for action
 * -> desc: String descriptive text for action
 * selected: String unique id for selected action
 * onActionSelect: Method Pointer to handle updates to selection
 */
class ActionSelect extends Component {
    constructor(props) {
        super(props);

        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(event) {
        this.props.onActionSelect && this.props.onActionSelect(this.findAction(event.target.value));
    }

    findAction(id) {
        for (const grp of this.props.groups) {
            for (const action of grp.actions) {
                if (action.key === id) {
                    return action;
                }
            }
        }
        return null;
    }

    render() {
        return (
            <select name="roll-select" id="roll-select" className={this.props.className} value={this.props.selected} onChange={this.handleChange}>
                <option value="">Please select an action</option>
                {
                    this.props.groups.map((grp) => {
                        return (
                            <optgroup label={grp.label} key={grp.label}>
                                {grp.actions && grp.actions.map((action) => {
                                    return <option value={action.key} key={action.key}>{action.desc}</option>
                                })}
                            </optgroup>
                        )
                    })
                }
            </select>
        );
    }
}

export default ActionSelect;