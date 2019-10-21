import React, {Component} from 'react';
import ContentTableCard from "./ContentTableCard";
import AddTableOverlay from "./AddTableOverlay";
import {fetchFromJson} from "../utility/Utils";

class ScreenEditTable extends Component {

    constructor(props, context) {
        super(props, context);
        this.state = {
            selected: ""
        };

        this.handleTableSelect = this.handleTableSelect.bind(this);
        this.handleLoadTables = this.handleLoadTables.bind(this);
    }

    handleTableSelect(table) {
        this.setState({selected: table});
    }

    handleLoadTables() {
        this.fetchTableFromJson("./content/TableScorched.json");
        this.fetchTableFromJson("./content/TableOtherRace.json");
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
        let tables = this.props.contentTables.slice();

        return (
            <React.Fragment>
                <div className="row p-2">
                    {
                        tables.map((table, index) => {
                            return (
                                <div className="col-sm-3 p-2"
                                     key={table.key}
                                >
                                    <ContentTableCard
                                        onClick={this.handleTableSelect}
                                        name={table.name}
                                        desc={table.desc}
                                        tableKey={table.key}
                                        className="w-100 h-100 align-items-center"
                                    />
                                </div>
                            )
                        })
                    }
                    <div className="col-sm-3 p-2">
                        <button className="card w-100 h-100 align-items-center" data-toggle="modal" data-target="#new-table-modal">
                            <div className="card-body">
                                <h5 className="card-title">+ Add a new Table</h5>
                                <p className="card-text">Create, upload or select a new table from our library</p>
                            </div>
                        </button>
                    </div>
                </div>

                <AddTableOverlay id="new-table-modal" onLoadTables={this.handleLoadTables}/>
            </React.Fragment>
        );
    }
}

export default ScreenEditTable;