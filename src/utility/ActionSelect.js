import React, {Component} from 'react';
import FormControl from "react-bootstrap/FormControl";
import AppContext from "../AppContext";
import {groupActions} from "./ActionUtils";

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
        this.props.onChange && this.props.onChange(event.target.value);
    }

    render() {
        const groups = groupActions(this.context.actions);
        const optgroups = [];

        for (let grp of groups.keys()) {
            optgroups.push(
                <optgroup label={grp} key={grp}>
                    {
                        groups.get(grp)
                            .map((action) => {
                                return <option value={action.name} key={action.name}>{action.name}</option>;
                            })
                    }
                </optgroup>)
        }

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

ActionSelect.contextType = AppContext;

export default ActionSelect;
