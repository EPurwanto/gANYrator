import React, {Component} from 'react';
import AppContext from "../AppContext";
import ConfirmPopup from "../structure/ConfirmPopup";
import {
    createAction,
    findAction,
    isValidActionName,
    nextValidActionName,
    updateActionRefs
} from "../utility/ActionUtils";
import ResponsiveCardDeck from "../structure/ResponsiveCardDeck";
import {clone} from "../utility/Utils";
import ScreenEditAction from "./ScreenEditAction";

class ScreenActions extends Component {

    constructor(props, context) {
        super(props, context);
        this.state = {
            selected: "",
            confirmPop: undefined
        };

        this.handleCreate = this.handleCreate.bind(this);
        this.handleClone = this.handleClone.bind(this);
        this.handleSave = this.handleSave.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
    }

    handleSelect(name) {
        this.setState({selected: name});
    }

    handleCreate() {
        const act = createAction(nextValidActionName(this.context.actions));

        this.context.updateActions(act);
        this.handleSelect(act.name);
    }

    handleClone(oldAction) {
        const copy = clone(oldAction);

        copy.name = nextValidActionName(this.context.actions);
        copy.desc = "Clone of " + oldAction.name + "\n" + oldAction.desc;

        this.context.updateActions(copy);
        this.handleSelect(copy.name);
    }

    handleSave(oldAction, name, desc, group, contents) {
        if (oldAction.name !== name && !isValidActionName(name, this.context.actions)) {
            return "An action with that name already exists";
        }

        const act = createAction(name, desc, group, contents);

        const [oldActs, newActs, oldTabs, newTabs] = updateActionRefs(this.context.contentTables, oldAction, act);
        if (oldActs.length > 0 || newActs.length > 0 ) {
            this.context.updateActions(newActs, oldActs);
        }

        if (oldTabs.length > 0 || newTabs.length > 0 ) {
            this.context.updateTables(newTabs, oldTabs);
        }
    }

    handleDelete(oldAction) {
        const [oldActs, newActs, oldTabs, newTabs] = updateActionRefs(this.context.contentTables, oldAction);
        if (oldActs.length > 0 || newActs.length > 0 ) {
            this.context.updateActions(newActs, oldActs);
        }

        if (oldTabs.length > 0 || newTabs.length > 0 ) {
            this.context.updateTables(newTabs, oldTabs);
        }
    }

    useConfirm(props) {
        this.setState({confirmPop: props});
    }

    render() {
        if (this.state.selected === "") {
            const acts = [];

            this.context.actions.forEach(a => {
                if (a.group !== "Table") {
                    acts.push({
                        name: a.name,
                        sub: a.group,
                        desc: a.desc,
                        onClick: () => this.handleSelect(a.name),
                        links: [
                            {
                                name: "Clone",
                                icon: "copy",
                                variant: "primary",
                                onClick: () => {this.handleClone(a)}
                            },
                            {
                                name: "Delete",
                                icon: "trash",
                                variant: "danger",
                                onClick: () => {this.useConfirm({
                                    heading: "Delete " + a.name,
                                    children: <p>Are you sure you would like to delete {a.name}?</p>,
                                    onConfirm: () => {this.handleDelete(a)},
                                    onClose: () => {this.useConfirm()}
                                })}
                            }
                        ]
                    });
                }
            });

            acts.push({
                name: "+ Add a new Action",
                desc: "Create a new custom action",
                onClick: this.handleCreate
            });

            let confirm = "";
            if (this.state.confirmPop) {
                confirm = <ConfirmPopup show {...this.state.confirmPop}/>
            }

            return (
                <React.Fragment>
                    {confirm}
                    <ResponsiveCardDeck
                        items={acts}/>
                </React.Fragment>
            )
        } else {

            return (
                <ScreenEditAction
                    action={findAction(this.state.selected, this.context.actions)}
                    onSave={this.handleSave}
                    onCancel={() => {this.handleSelect("")}}/>
            )
        }
    }
}

ScreenActions.contextType = AppContext;

export default ScreenActions;