import React, {Component} from 'react';
import AppContext from "../AppContext";
import ConfirmPopup from "../structure/ConfirmPopup";
import ContentTableCardDeck from "../structure/ResponsiveCardDeck";
import {createTableAction} from "../utility/ActionUtils";
import {createTable, findTable, isValidTableName, nextValidTableName, updateTableRefs} from "../utility/TableUtils";
import {clone} from "../utility/Utils";
import ScreenEditTable from "./ScreenEditTable";

class ScreenTables extends Component {

    constructor(props, context) {
        super(props, context);
        this.state = {
            selected: "",
            confirmPop: undefined
        };

        this.handleTableCreate = this.handleTableCreate.bind(this);
        this.handleTableSave = this.handleTableSave.bind(this);
        this.handleModalClose = this.handleModalClose.bind(this);
        this.handleModalOpen = this.handleModalOpen.bind(this);
    }

    handleTableSelect(table) {
        this.setState({selected: table});
    }

    handleTableCreate() {
        const tab = createTable(nextValidTableName(this.context.contentTables));
        const tabAct = createTableAction(tab);

        this.context.updateTables(tab);
        this.context.updateActions(tabAct);

        this.handleTableSelect(tab.name);
    }

    handleTableClone(oldTab) {
        const copy = clone(oldTab);

        copy.name = nextValidTableName(this.context.actions);
        copy.desc = "Clone of " + oldTab.name + "\n" + oldTab.desc;

        this.context.updateTables(copy);
        this.handleTableSelect(copy.name);
    }

    handleTableSave(oldTable, name, desc, contents) {
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
    }

    handleTableDelete(oldTab) {
        const [oldActs, newActs, oldTabs, newTabs] = updateTableRefs(this.context.actions, this.context.contentTables, oldTab);
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

    handleModalClose() {
        this.setState({modalShow: false});
    }

    handleModalOpen() {
        this.setState({modalShow: true})
    }

    render() {
        // Copy tables but bind a "handleClick" prop
        const tables = this.context.contentTables.map(t => {
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
            name: "+ Add a new Table",
            desc: "Create a new table",
            onClick: this.handleTableCreate
        });

        let confirm = "";
        if (this.state.confirmPop) {
            confirm = <ConfirmPopup show {...this.state.confirmPop}/>
        }

        if (this.state.selected === "") {
            // Nothing selected, show table cards
            return (
                <React.Fragment>
                    {confirm}
                    <ContentTableCardDeck
                        items={tables}
                        rowSize="4"/>
                </React.Fragment>
            );
        } else {
            // Something selected, show table editor
            return (
                <ScreenEditTable
                    table={findTable(this.state.selected, this.context.contentTables)}
                    onCancel={() => this.handleTableSelect("")}
                    onSave={this.handleTableSave}
                />
            )
        }
    }
}

ScreenTables.contextType = AppContext;

export default ScreenTables;