import React from 'react';
import './App.css';
import ScreenRollAction from "./screens/ScreenRollAction";

class App extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            actions: [
                {
                    key: "action_roll_scorched",
                    desc: "Roll a scorched gang member",
                    contents: [
                        {table: "table_scorched_race"},
                        {table: "table_gender"}
                    ]
                }
            ],

            contentTables: [],
            screen: "roll"
        };

    this.fetchTableFromJson("./content/TableScorched.json");
    this.fetchTableFromJson("./content/TableOtherRace.json");
    this.fetchTableFromJson("./content/TableGender.json");
  }

    handleScreenChange(screen) {
        this.setState({screen: screen});
    }

  fetchTableFromJson(url) {
    fetch(url)
        .then(response => response.json(), error => console.log(error))
        .then(result => {
          result.totalWeight = 0;
          result.contents.forEach(row => result.totalWeight += row.weight);
          const tables = this.state.contentTables.concat([result]);
          this.setState({contentTables: tables});
        }, error => {
          console.log(error);
        })
  }

    render() {
        let screen = <div/>;
        if (this.state.screen === "roll") {
            screen = <ScreenRollAction contentTables={this.state.contentTables} actions={this.state.actions}/>
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
                    <nav className="row p-1">
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
