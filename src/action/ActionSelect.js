import React, {Component} from 'react';

/**
 * Properties:
 * groups: Object containing property labels -> Action objects
 * > label: Array of Action objects
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
        this.props.onActionSelect && this.props.onActionSelect(event.target.value);
    }

    render() {
        const groups = this.props.groups;
        const optgroups = [];
        for(const prop in groups) {
            if (Object.prototype.hasOwnProperty.call(groups, prop)) {
                optgroups.push(<optgroup label={prop} key={prop}>
                    {groups[prop].map((action) => {
                        return <option value={action.key} key={action.key}>{action.desc}</option>
                    })}
                </optgroup>)
            }
        }

        return (
            <select name="roll-select" id="roll-select" className={this.props.className} value={this.props.selected} onChange={this.handleChange}>
                <option value="">Please select an action</option>
                {
                    optgroups
                }
            </select>
        );
    }
}

export default ActionSelect;