import React, {Component} from 'react';
import AppContext from "../AppContext";
import {createTableAction} from "../utility/ActionUtils";
import ContentTableCardDeck from "../utility/ResponsiveCardDeck";
import {createTable, findTable, isValidTableName, nextValidTableName} from "../utility/TableUtils";
import {fetchFromJson} from "../utility/Utils";
import ScreenEditTable from "./ScreenEditTable";

class ScreenTables extends Component {

    constructor(props, context) {
        super(props, context);
        this.state = {
            selected: ""
        };

        this.handleTableCreate = this.handleTableCreate.bind(this);
        this.handleTableLoad = this.handleTableLoad.bind(this);
        this.handleTableSave = this.handleTableSave.bind(this);
        this.handleTableSelect = this.handleTableSelect.bind(this);
        this.handleModalClose = this.handleModalClose.bind(this);
        this.handleModalOpen = this.handleModalOpen.bind(this);
    }

    updateTableList(tAdd, tRemove) {
        const tables = this.context.contentTables.slice();

        // Remove existing copy if present
        if (tRemove) {
            const index = tables.indexOf(tRemove);
            if (index >= 0) {
                tables.splice(index, 1);
            }
        }

        // Add new copy if present
        if (tAdd) {
            tables.unshift(tAdd);
        }

        this.props.onTableListChange(tables);
    }

    updateActionList(aAdd, aRemove) {
        const list = this.context.actions.slice();

        // Remove existing copy if present
        if (aRemove) {
            const index = list.indexOf(aRemove);
            if (index >= 0) {
                list.splice(index, 1);
            }
        }

        // Add new copy if present
        if (aAdd) {
            list.unshift(aAdd);
        }

        this.props.onActionListChange(list);
    }

    handleTableCreate() {
        const tab = createTable(nextValidTableName(this.context.contentTables));

        this.updateTableList(tab);
        this.updateActionList(createTableAction(tab));
        this.handleTableSelect(tab.name);
    }

    handleTableLoad() {
        this.fetchTableFromJson("./content/TableScorched.json");
        this.fetchTableFromJson("./content/TableGeneralRace.json");
        this.fetchTableFromJson("./content/TableGender.json");
    }

    fetchTableFromJson(url) {
        fetchFromJson(url, (result) => {
            const tab = createTable(result.name, result.desc, result.contents);

            this.updateTableList(tab);
            this.updateActionList(createTableAction(tab))
        }, (error) => console.log(error));
    }

    handleTableSave(oldTable, name, desc, contents) {
        if (oldTable.name !== name && !isValidTableName(name, this.context.contentTables)) {
            return "A table with that name already exists";
        }

        const tab = createTable(name, desc, contents);

        this.updateTableList(tab, oldTable);
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