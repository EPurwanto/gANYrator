import React, {Component} from 'react';
import ContentTableCard from "../content_table/ContentTableCard";
import {findTable} from "../utility/Utils";
import AddTableOverlay from "../content_table/AddTableOverlay";

class ScreenEditTable extends Component {

    constructor(props, context) {
        super(props, context);
        this.state = {
            selected: ""
        };

        this.handleTableSelect = this.handleTableSelect.bind(this);
    }

    handleTableSelect(table) {
        this.setState({selected: table});
    }

    render() {
        let tables = this.props.contentTables.slice();

        return (
            <React.Fragment>
                <div className="row p-2">
                    {
                        tables.map((table, index) => {
                            return (
                                <div className="col-sm-3 p-2">
                                    <ContentTableCard
                                        onClick={this.handleTableSelect}
                                        name={table.name}
                                        desc={table.desc}
                                        key={table.key}
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

            </div>
            </React.Fragment>
        );
    }
}

export default ScreenEditTable;