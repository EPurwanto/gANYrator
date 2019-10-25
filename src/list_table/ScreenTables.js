import React, {Component} from 'react';
import ScreenEditTable from "../edit_table/ScreenEditTable";
import ContentTableCardDeck from "../utility/ResponsiveCardDeck";
import {createTable, findTable, isValidTableName} from "../utility/TableUtils";
import {createTableAction, fetchFromJson} from "../utility/Utils";
import AddTableOverlay from "./AddTableOverlay";

class ScreenTables extends Component {

    constructor(props, context) {
        super(props, context);
        this.state = {
            selected: "",
            modalShow: false
        };

        this.handleTableCreate = this.handleTableCreate.bind(this);
        this.handleTableLoad = this.handleTableLoad.bind(this);
        this.handleTableSave = this.handleTableSave.bind(this);
        this.handleTableSelect = this.handleTableSelect.bind(this);
        this.handleModalClose = this.handleModalClose.bind(this);
        this.handleModalOpen = this.handleModalOpen.bind(this);
    }

    updateTableList(tAdd, tRemove) {
        const tables = this.props.contentTables.slice();

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

    handleTableCreate(name) {
        if (!isValidTableName(name, this.props.contentTables)) {
            return "A table with that name already exists";
        }

        const tab = createTable(name);

        this.updateTableList(tab);
        this.updateActionList(createTableAction(tab))
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
        if (oldTable.name !== name && !isValidTableName(name, this.props.contentTables)) {
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
        const tables = this.props.contentTables.map(t => {
            return {
                name: t.name,
                desc: t.desc,
                onClick: () => this.handleTableSelect(t.name)
            }
        });

        // Add a dummy entry for adding new tables, bind it to launch the overlay
        tables.push({
            name: "+ Add a new Table",
            desc: "Create, upload or select a new table from our library",
            onClick: () => this.handleModalOpen()
        });

        if (this.state.selected === "") {
            // Nothing selected, show table cards
            return (
                <React.Fragment>
                    <ContentTableCardDeck
                        items={tables}
                        rowSize="4"/>
                    <AddTableOverlay
                        id="new-table-modal"
                        show={this.state.modalShow}
                        onClose={this.handleModalClose}
                        onTableCreate={this.handleTableCreate}
                        onLoadTables={this.handleTableLoad}/>
                </React.Fragment>
            );
        } else {
            // Something selected, show table editor
            return (
                <ScreenEditTable
                    table={findTable(this.state.selected, this.props.contentTables)}
                    onCancel={() => this.handleTableSelect("")}
                    onSave={this.handleTableSave}
                />
            )
        }
    }
}

export default ScreenTables;