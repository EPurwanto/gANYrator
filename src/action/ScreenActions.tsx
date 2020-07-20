import React, {Component, ReactNode} from 'react';
import AppContext from "../AppContext";
import ConfirmPopup, {ConfirmProps} from "../structure/ConfirmPopup";
import {
    Action,
    ActionContent,
    createAction,
    findAction,
    isValidActionName,
    nextValidActionName,
    updateActionRefs
} from "../utility/ActionUtils";
import ResponsiveCardDeck from "../structure/ResponsiveCardDeck";
import {clone} from "../utility/Utils";
import ScreenEditAction from "./ScreenEditAction";

interface IProps {

}

interface IState {
    selected: string;
    confirmPop?: ConfirmProps
}

class ScreenActions extends Component<IProps, IState> {

    constructor(props: IProps) {
        super(props);
        this.state = {
            selected: "",
            confirmPop: undefined
        };

        this.handleCreate = this.handleCreate.bind(this);
        this.handleClone = this.handleClone.bind(this);
        this.handleSave = this.handleSave.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
    }

    handleSelect(name: string) {
        this.setState({selected: name});
    }

    handleCreate() {
        const act = createAction(nextValidActionName(this.context.actions));

        this.context.updateActions(act);
        this.handleSelect(act.name);
    }

    handleClone(oldAction: Action) {
        const copy = clone(oldAction);

        copy.name = nextValidActionName(this.context.actions);
        copy.desc = "Clone of " + oldAction.name + "\n" + oldAction.desc;

        this.context.updateActions(copy);
        this.handleSelect(copy.name);
    }

    handleSave(oldAction: Action, name: string, desc: string, group: string, contents: ActionContent[]) {
        if (oldAction.name !== name && !isValidActionName(name, this.context.actions)) {
            return "An action with that name already exists";
        }

        const act = createAction(name, desc, group, contents);

        const [oldAct, newAct, oldTabs, newTabs] = updateActionRefs(this.context.contentTables, oldAction, act);
        if (oldAct || newAct) {
            this.context.updateActions(newAct, oldAct);
        }

        if (oldTabs.length > 0 || newTabs.length > 0 ) {
            this.context.updateTables(newTabs, oldTabs);
        }
    }

    handleDelete(oldAction: Action) {
        const [oldAct, newAct, oldTabs, newTabs] = updateActionRefs(this.context.contentTables, oldAction);
        this.context.updateActions(newAct, oldAct);

        if (oldTabs.length > 0 || newTabs.length > 0 ) {
            this.context.updateTables(newTabs, oldTabs);
        }
    }

    useConfirm(props?: ConfirmProps) {
        this.setState({confirmPop: props});
    }

    render() {
        if (this.state.selected === "") {
            const acts = [];

            // Separate out the auto-created actions
            this.context.actions.forEach((a: Action) => {
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
                                    show: true,
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

            // Add a placeholder for creating new actions
            acts.push({
                name: "+ Add a new Action",
                desc: "Create a new custom action",
                onClick: this.handleCreate
            });

            let confirm: ReactNode;
            if (this.state.confirmPop) {
                confirm = <ConfirmPopup {...this.state.confirmPop}/>
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
                    action={findAction(this.state.selected, this.context.actions)!}
                    onSave={this.handleSave}
                    onCancel={() => {this.handleSelect("")}}/>
            )
        }
    }
}

ScreenActions.contextType = AppContext;

export default ScreenActions;
