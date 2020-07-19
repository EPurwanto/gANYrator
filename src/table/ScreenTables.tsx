import React, {Component, ReactNode} from 'react';
import AppContext, {IContext} from "../AppContext";
import ConfirmPopup from "../structure/ConfirmPopup";
import ResponsiveCardDeck from "../structure/ResponsiveCardDeck";
import {createTableAction} from "../utility/ActionUtils";
import {
    createTable,
    findTable,
    isValidTableName,
    nextValidTableName,
    Table,
    TableContent,
    updateTableRefs
} from "../utility/TableUtils";
import {clone} from "../utility/Utils";
import ScreenEditTable from "./ScreenEditTable";
import {ConfirmProps} from "../App";

interface IProps {

}

interface IState {
    selected: string;
    confirmPop?: ConfirmProps;
    modalShow: boolean;
}

class ScreenTables extends Component<IProps, IState, IContext> {
    constructor(props: IProps) {
        super(props);
        this.state = {
            selected: "",
            confirmPop: undefined,
            modalShow: false
        };

        this.handleTableCreate = this.handleTableCreate.bind(this);
        this.handleTableSave = this.handleTableSave.bind(this);
        this.handleModalClose = this.handleModalClose.bind(this);
        this.handleModalOpen = this.handleModalOpen.bind(this);
    }

    handleTableSelect(table: string) {
        this.setState({selected: table});
    }

    handleTableCreate() {
        const tab = createTable(nextValidTableName(this.context.contentTables));
        const tabAct = createTableAction(tab);

        this.context.updateTables(tab);
        this.context.updateActions(tabAct);

        this.handleTableSelect(tab.name);
    }

    handleTableClone(oldTab: Table) {
        const copy = clone(oldTab);

        copy.name = nextValidTableName(this.context.actions);
        copy.desc = "Clone of " + oldTab.name + "\n" + oldTab.desc;

        this.context.updateTables(copy);
        this.handleTableSelect(copy.name);
    }

    handleTableSave(oldTable: Table, name: string, desc: string, contents: TableContent[]): string | null {
        if (oldTable.name !== name && !isValidTableName(name, this.context.contentTables)) {
            return "A table with that name already exists";
        }

        const tab = createTable(name, desc, contents);

        const [oldActs, newActs, oldTabs, newTabs] = updateTableRefs(this.context.actions, this.context.contentTables, oldTable, tab);

        if (oldActs.length > 0 || newActs.length > 0 ) {
            this.context.updateActions(newActs, oldActs);
        }

        if (oldTabs.length > 0 || newTabs.length > 0 ) {
            this.context.updateTables(newTabs, oldTabs);
        }
        return null;
    }

    handleTableDelete(oldTab: Table) {
        const [oldActs, newActs, oldTabs, newTabs] = updateTableRefs(this.context.actions, this.context.contentTables, oldTab);
        if (oldActs.length > 0 || newActs.length > 0 ) {
            this.context.updateActions(newActs, oldActs);
        }

        if (oldTabs.length > 0 || newTabs.length > 0 ) {
            this.context.updateTables(newTabs, oldTabs);
        }
    }

    useConfirm(props?: ConfirmProps) {
        this.setState({confirmPop: props});
    }

    handleModalClose() {
        this.setState({modalShow: false});
    }

    handleModalOpen() {
        this.setState({modalShow: true})
    }

    render() {
        // Copy tables but bind a "handleClick" prop
        const tables = this.context.contentTables.map((t: Table) => {
            return {
                name: t.name,
                desc: t.desc,
                onClick: () => this.handleTableSelect(t.name),
                links: [
                {
                    name: "Clone",
                    icon: "copy",
                    variant: "primary",
                    onClick: () => {this.handleTableClone(t)}
                },
                {
                    name: "Delete",
                    icon: "trash",
                    variant: "danger",
                    onClick: () => {this.useConfirm({
                        show: true,
                        heading: "Delete " + t.name,
                        children: <p>Are you sure you would like to delete {t.name}?</p>,
                        onConfirm: () => {this.handleTableDelete(t)},
                        onClose: () => {this.useConfirm()}
                    })}
                }
            ]
            }
        });

        // Add a dummy entry for adding new tables, bind it to launch the overlay
        tables.push({
            links: [],
            name: "+ Add a new Table",
            desc: "Create a new table",
            onClick: this.handleTableCreate
        });

        let confirm: ReactNode;
        if (this.state.confirmPop) {
            confirm = <ConfirmPopup {...this.state.confirmPop}/>
        }

        if (this.state.selected === "") {
            // Nothing selected, show table cards
            return (
                <React.Fragment>
                    {confirm}
                    <ResponsiveCardDeck
                        items={tables}
                        rowSize="4"/>
                </React.Fragment>
            );
        } else {
            // Something selected, show table editor
            return (
                <ScreenEditTable
                    table={findTable(this.state.selected, this.context.contentTables)!}
                    onCancel={() => this.handleTableSelect("")}
                    onSave={this.handleTableSave}
                />
            )
        }
    }
}

ScreenTables.contextType = AppContext;

export default ScreenTables;
