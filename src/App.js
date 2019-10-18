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
      contentTables: []
    };

    this.fetchTableFromJson("./content/TableScorched.json");
    this.fetchTableFromJson("./content/TableOtherRace.json");
    this.fetchTableFromJson("./content/TableGender.json");
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
    return (
        <div className="root">
          <main className="container content">
            {/* Headings */}
            <div className="row">
              <div className="col-sm">
                <h1 className="display-1 text-center">gANYrator</h1>
                <h2 className="text-center">Generate Anything.</h2>
              </div>
            </div>

            <ScreenRollAction contentTables={this.state.contentTables} actions={this.state.actions}/>
          </main>
        </div>
    );
  }
}

export default App;
