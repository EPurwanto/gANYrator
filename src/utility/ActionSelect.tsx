import React, {ChangeEvent, FormEvent, useContext} from 'react';
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

interface IProps {
    selected?: string;
    onChange: (selected: string) => void
    className?: string;
}

function handleChange(event: ChangeEvent, callback: (value: string)=> void) {
    if (event.currentTarget instanceof HTMLSelectElement)
        callback && callback(event.currentTarget.value);
}

export default function ActionSelect(props: IProps) {
    const context = useContext(AppContext);

    const optgroups = [];
    for (let [key, list] of groupActions(context.actions)) {
        optgroups.push(
            <optgroup label={key} key={key}>
                {
                    list.map((action) => {
                            return <option value={action.name} key={action.name}>{action.name}</option>;
                        })
                }
            </optgroup>
        )
    }

    return (
        <FormControl as="select" value={props.selected} onChange={event => handleChange(event, props.onChange)}>
            <option value="">Please select an action</option>
            {
                optgroups
            }
        </FormControl>
    );
}

ActionSelect.contextType = AppContext;

// export default ActionSelect;
