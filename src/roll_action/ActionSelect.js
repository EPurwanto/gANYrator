import React, {Component} from 'react';
import FormControl from "react-bootstrap/FormControl";
import {groupActions} from "../utility/Utils";

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
        const groups = groupActions(this.props.actions);
        const optgroups = [];

        groups.forEach(grp => {
            optgroups.push(
                <optgroup label={grp.name} key={grp.name}>
                    {
                        grp.list
                            .map((action) => {
                                return <option value={action.key} key={action.key}>{action.desc}</option>;
                            })
                    }
                </optgroup>)
        });

        return (
            <FormControl as="select" value={this.props.selected} onChange={this.handleChange}>
                <option value="">Please select an action</option>
                {
                    optgroups
                }
            </FormControl>
        );
    }
}

export default ActionSelect;