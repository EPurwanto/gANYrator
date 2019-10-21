import React from 'react';
import './App.css';
import ScreenRollAction from "./screens/ScreenRollAction";
import ScreenEditTable from "./screens/ScreenEditTable";
import {fetchFromJson} from "./utility/Utils";

class App extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            actions: [],
            contentTables: [],
            screen: "roll"
        };
    }

    componentDidMount() {
        this.fetchTableFromJson("./content/TableScorched.json");
        this.fetchTableFromJson("./content/TableOtherRace.json");
        this.fetchTableFromJson("./content/TableGender.json");

        this.fetchActionFromJson("./content/ActionRollScorched.json")
    }

    handleScreenChange(screen) {
        this.setState({screen: screen});
    }

    fetchTableFromJson(url) {
        fetchFromJson(url, (result) => {
            // Calculate total weight
            result.totalWeight = 0;
            result.contents.forEach(row => result.totalWeight += row.weight);

            // Create Auto Action
            const actions = this.state.actions.concat([{
                key:"action_" + result.key,
                desc: result.desc,
                group: "Table",
                contents: [{table:result.key}]
            }]);
            const tables = this.state.contentTables.concat([result]);

            // Update state
            this.setState({
                contentTables: tables,
                actions: actions
            });
        }, (error) => console.log(error));
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
                screen = <ScreenRollAction contentTables={this.state.contentTables} actions={this.state.actions}/>;
                break;
            case "tables":
                screen = <ScreenEditTable contentTables={this.state.contentTables} actions={this.state.actions}/>;
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
