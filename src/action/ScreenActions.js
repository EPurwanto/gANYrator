import React, {Component} from 'react';
import ResponsiveCardDeck from "../utility/ResponsiveCardDeck";
import {createAction, findAction, nextValidActionName} from "../utility/Utils";
import ScreenEditAction from "./ScreenEditAction";

class ScreenActions extends Component {

    constructor(props, context) {
        super(props, context);
        this.state = {
            selected: ""
        };

        this.handleSave = this.handleSave.bind(this);
        this.handleCreate = this.handleCreate.bind(this);
    }

    updateActionList(aAdd, aRemove) {
        const actions = this.props.actions.slice();

        // Remove existing copy if present
        if (aRemove) {
            const index = actions.indexOf(aRemove);
            if (index >= 0) {
                actions.splice(index, 1);
            }
        }

        // Add new copy if present
        if (aAdd) {
            actions.unshift(aAdd);
        }

        this.props.onActionListChange(actions);
    }

    handleSelect(name) {
        this.setState({selected: name});
    }

    handleCreate() {
        const action = createAction(nextValidActionName(this.props.actions));
        this.updateActionList(action);
        this.handleSelect(action.name);
    }

    handleSave() {

    }

    render() {
        if (this.state.selected === "") {
            const acts = [];

            this.props.actions.forEach(a => {
                if (a.group !== "Table") {
                    acts.push({
                        name: a.name,
                        sub: a.group,
                        desc: a.desc,
                        onClick: () => this.handleSelect(a.name)
                    });
                }
            });

            acts.push({
                name: "+ Add a new Action",
                desc: "Create a new custom action",
                onClick: this.handleCreate
            });

            return (
                <React.Fragment>
                    <ResponsiveCardDeck
                        items={acts}/>
                </React.Fragment>
            )
        } else {

            return (
                <ScreenEditAction
                    contentTables={this.props.contentTables}
                    action={findAction(this.state.selected, this.props.actions)}
                    onSave={this.handleSave}
                    onCancel={() => {this.handleSelect("")}}/>
            )
        }
    }
}

export default ScreenActions;