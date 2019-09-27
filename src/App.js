import React from 'react';
import './App.css';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedAction: '',
      values: [],
    };

    this.tables = [
      {
        key: "table_scorched_race",
        desc: "The race of a member of the Scorched Gang.",
        field: "Race",
        contents: [
          {weight: 7, element: "Dragonborn"},
          {weight: 7, element: "Tiefling"},
          {weight: 3, element: "Tabaxi"},
          {weight: 2, element: "Human"},
          {weight: 1, element: "Other"},
        ],
        totalWeight: 20,
      }
    ];

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.performAction = this.performAction.bind(this);
  }

  handleChange(event) {
    this.setState({selectedAction: event.target.value});
  }

  handleSubmit(event) {
    alert('A name was submitted: ' + this.state.selectedAction);
    event.preventDefault();
  }

  performAction() {
    const table = this.tables[0];

    const value = this.rollOn(table);

    this.setState({
      values: [
        {field: table.field, value: value}
      ]
    })
  }

  rollOn(table) {
    const roll = Math.floor(Math.random() * table.totalWeight);

    let counter = 0;
    for (let i = 0; i < table.contents.length; i++) {
      const row = table.contents[i];
      counter += row.weight;
      if (counter > roll) {
        return row.element;
      }
    }
  }

  render() {

    let values = null;
    if (this.state.values) {
      values = <div className="row">
        {
          this.state.values.map((val) => {
            return(
                <div className="col-sm-4 form-group" key={val.field}>
                  <label htmlFor="value">{val.field}</label>
                  <span id="value" className="form-control-plaintext">{val.value}</span>
                </div>
            )
          })
        }
      </div>
    }

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

            {/* Roll Dropdown */}
            <div className="row">
              <div className="col-sm-4">
                <div className="input-group">
                  <div className="input-group-prepend">
                    <button className="btn btn-primary" onClick={this.performAction}>Roll</button>
                  </div>
                  <select name="roll-select" id="roll-select" className="form-control" value={this.state.selectedAction} onChange={this.handleChange}>
                    <option value="">Please select an action</option>
                    <optgroup label="Actions">
                      <option value="action_npc">a new NPC</option>
                      <option value="action_tavern">a new Tavern</option>
                    </optgroup>
                    <optgroup label="Tables">
                      {this.tables.map((table) => {
                        return <option value={table.key} key={table.key}>{table.desc}</option>
                      })}
                    </optgroup>
                  </select>
                </div>
              </div>
            </div>

            {/* Last rolled field Values */}
            {values}

          </main>
        </div>
    );
  }
}

export default App;
