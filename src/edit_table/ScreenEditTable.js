import React, {Component} from 'react';
import AddTableOverlay from "./AddTableOverlay";
import {fetchFromJson} from "../utility/Utils";
import ContentTableCardDeck from "./ContentTableCardDeck";

class ScreenEditTable extends Component {

    constructor(props, context) {
        super(props, context);
        this.state = {
            selected: "",
            modalShow: false
        };

        this.handleTableSelect = this.handleTableSelect.bind(this);
        this.handleLoadTables = this.handleLoadTables.bind(this);
        this.handleModalClose = this.handleModalClose.bind(this);
        this.handleModalOpen = this.handleModalOpen.bind(this);
        this.createTable = this.createTable.bind(this);
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

    createTable(name, desc) {
        if (this.props.contentTables.some(t => t.name === name)) {
            console.log("Table already exists")
            return;
        }

        const table = {
            name: name,
            desc: desc,
            contents: [
                {
                    weight: 1,
                    element: "Dummy Data"
                }
            ]
        };

        if (this.props.onTableAdd) {
            this.props.onTableAdd(table);
        }
        this.handleModalClose()
    }

    handleLoadTables() {
        this.fetchTableFromJson("./content/TableScorched.json");
        this.fetchTableFromJson("./content/TableGeneralRace.json");
        this.fetchTableFromJson("./content/TableGender.json");
    }

    fetchTableFromJson(url) {
        fetchFromJson(url, (result) => {
            if (this.props.onTableAdd) {
                this.props.onTableAdd(result)
            }
        }, (error) => console.log(error));
    }

    render() {
        const tables = this.props.contentTables.map(t => {
            return {
                name: t.name,
                desc: t.desc,
                handleClick: () => this.handleTableSelect(t.name)
            }
        });

        tables.push({
            name: "+ Add a new Table",
            desc: "Create, upload or select a new table from our library",
            handleClick: () => this.handleModalOpen()
        });

        return (
            <React.Fragment>
                <ContentTableCardDeck
                    tables={tables}/>
                <AddTableOverlay
                    id="new-table-modal"
                    show={this.state.modalShow}
                    onClose={this.handleModalClose}
                    onTableCreate={this.createTable}
                    onLoadTables={this.handleLoadTables}/>
            </React.Fragment>
        );
    }
}

export default ScreenEditTable;