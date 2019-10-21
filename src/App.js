import React from 'react';
import './App.css';
import ScreenRollAction from "./roll_action/ScreenRollAction";
import ScreenEditTable from "./edit_table/ScreenEditTable";
import {fetchFromJson} from "./utility/Utils";

class App extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            actions: [],
            contentTables: [],
            screen: "roll"
        };

        this.addTable = this.addTable.bind(this);
    }

    componentDidMount() {
        const tableStore = localStorage.getItem("tables");
        if (tableStore) {
            const tables = JSON.parse(tableStore);

            this.setState({contentTables: tables});
        }

        const actionStore = localStorage.getItem("actions");
        if (actionStore) {
            const actions = JSON.parse(actionStore);

            this.setState({actions: actions});
        } else {
            this.fetchActionFromJson("./content/ActionRollScorched.json")
        }
    }

    handleScreenChange(screen) {
        this.setState({screen: screen});
    }

    validateTable(table) {
        // Calculate total weight
        table.totalWeight = 0;
        table.contents.forEach(row => table.totalWeight += row.weight);

        return true;
    }

    addTable(table) {
        if (!this.validateTable(table)) {
            // todo?
        }

        // Create Auto Action
        const actions = this.state.actions.concat([{
            key:"action_" + table.key,
            desc: table.desc,
            group: "Table",
            contents: [{table:table.key}]
        }]);
        const tables = this.state.contentTables.concat([table]);

        // Update state
        this.setState({
            contentTables: tables,
            actions: actions
        });

        localStorage.setItem("tables", JSON.stringify(tables));
        localStorage.setItem("actions", JSON.stringify(actions));
    }

    fetchActionFromJson(url) {
        fetchFromJson(url, (result) => {
            const actions = this.state.actions.concat([result]);

            // Update state
            this.setState({
                actions: actions
            });
        }, (error) => console.log(error));
    }

    render() {
        let screen = <div/>;
        switch (this.state.screen) {
            case "roll":
                screen = <ScreenRollAction
                            contentTables={this.state.contentTables}
                            actions={this.state.actions}/>;
                break;
            case "tables":
                screen = <ScreenEditTable
                            contentTables={this.state.contentTables}
                            actions={this.state.actions}
                            onTableAdd={this.addTable}/>;
                break;
            default:
                break;
        }
        return (
            <div className="root pt-2">
                <main className="container content">
                    {/* Headings */}
                    <div className="row">
                        <div className="col-sm">
                            <h1 className="display-1 text-center">gANYrator</h1>
                            <h2 className="text-center">Generate Anything.</h2>
                        </div>
                    </div>
                    <nav className="row p-3">
                        <ul className="col-sm nav nav-tabs">
                            <li className="nav-item">
                                {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
                                <a
                                    className={this.state.screen === "roll" ? "nav-link active" : "nav-link"}
                                    onClick={() => this.handleScreenChange("roll")}
                                    href="#">
                                    Roll
                                </a>
                            </li>
                            <li className="nav-item">
                                {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
                                <a
                                    className={this.state.screen === "tables" ? "nav-link active" : "nav-link"}
                                    onClick={() => this.handleScreenChange("tables")}
                                    href="#">
                                    Tables
                                </a>
                            </li>
                            <li className="nav-item">
                                {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
                                <a
                                    className={this.state.screen === "actions" ? "nav-link active" : "nav-link"}
                                    onClick={() => this.handleScreenChange("actions")}
                                    href="#">
                                    Actions
                                </a>
                            </li>
                        </ul>
                    </nav>
                    {screen}
                </main>
            </div>
        );
    }
}

export default App;
