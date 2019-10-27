import React, {Component} from 'react';
import AppContext from "../AppContext";
import {createTableAction} from "../utility/ActionUtils";
import ContentTableCardDeck from "../utility/ResponsiveCardDeck";
import {createTable, findTable, isValidTableName, nextValidTableName, updateTableRefs} from "../utility/TableUtils";
import ScreenEditTable from "./ScreenEditTable";

class ScreenTables extends Component {

    constructor(props, context) {
        super(props, context);
        this.state = {
            selected: ""
        };

        this.handleTableCreate = this.handleTableCreate.bind(this);
        this.handleTableSave = this.handleTableSave.bind(this);
        this.handleTableSelect = this.handleTableSelect.bind(this);
        this.handleModalClose = this.handleModalClose.bind(this);
        this.handleModalOpen = this.handleModalOpen.bind(this);
    }

    handleTableCreate() {
        const tab = createTable(nextValidTableName(this.context.contentTables));
        const tabAct = createTableAction(tab);

        this.context.updateTables(tab);
        this.context.updateActions(tabAct);

        this.handleTableSelect(tab.name);
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

    handleTableSelect(table) {
        this.setState({selected: table});
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
                onClick: () => this.handleTableSelect(t.name)
            }
        });

        // Add a dummy entry for adding new tables, bind it to launch the overlay
        tables.push({
            name: "+ Add a new Table",
            desc: "Create a new table",
            onClick: this.handleTableCreate
        });

        if (this.state.selected === "") {
            // Nothing selected, show table cards
            return (
                <React.Fragment>
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