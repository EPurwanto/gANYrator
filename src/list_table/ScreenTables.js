import React, {Component} from 'react';
import ScreenEditTable from "../edit_table/ScreenEditTable";
import {createTable, createTableAction, fetchFromJson, findTable, isValidTableName} from "../utility/Utils";
import AddTableOverlay from "./AddTableOverlay";
import ContentTableCardDeck from "../utility/ResponsiveCardDeck";

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

    handleTableCreate(name) {
        if (!isValidTableName(name, this.props.contentTables)) {
            return "A table with that name already exists";
        }

        const [table, action] = createTable(name);

        const contentTables = this.props.contentTables.slice();
        contentTables.unshift(table);

        this.props.onTableListChange(contentTables);

        const actionsList = this.props.actions.slice();
        actionsList.push(action);
        this.props.onActionListChange(actionsList);

        this.handleTableSelect(name)
    }

    handleTableLoad() {
        this.fetchTableFromJson("./content/TableScorched.json");
        this.fetchTableFromJson("./content/TableGeneralRace.json");
        this.fetchTableFromJson("./content/TableGender.json");
    }

    fetchTableFromJson(url) {
        fetchFromJson(url, (result) => {
            const tables = this.props.contentTables.slice();
            tables.unshift(result);
            this.props.onTableListChange(tables);

            const action = createTableAction(result);
            const actionsList = this.props.actions.slice();
            actionsList.push(action);
            this.props.onActionListChange(actionsList);
        }, (error) => console.log(error));
    }

    handleTableSave(table, name, desc, contents) {
        if (table.name !== name && !isValidTableName(name, this.props.contentTables)) {
            return "A table with that name already exists";
        }

        const tables = this.props.contentTables.slice();
        const index = tables.indexOf(table);
        tables.splice(index, 1);
        tables.unshift({
            name: name,
            desc: desc,
            contents: contents
        });

        this.props.onTableListChange(tables);
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
                handleClick: () => this.handleTableSelect(t.name)
            }
        });

        // Add a dummy entry for adding new tables, bind it to launch the overlay
        tables.push({
            name: "+ Add a new Table",
            desc: "Create, upload or select a new table from our library",
            handleClick: () => this.handleModalOpen()
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