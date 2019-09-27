import React from 'react';
import './App.css';
import ScreenRollAction from "./screens/ScreenRollAction";

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      contentTables: [
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
        },
        {
          key: "table_other_race",
          desc: "Other Race.",
          field: "Race",
          contents: [
            {weight: 1, element: "Halfling"},
            {weight: 2, element: "Gnome"},
            {weight: 3, element: "Aasimar"},
            {weight: 4, element: "Goblin"},
            {weight: 5, element: "Half-Elf"},
            {weight: 6, element: "Half Orc"},
            {weight: 7, element: "Dwarf"},
            {weight: 8, element: "Tiefling"},
            {weight: 8, element: "Human"},
            {weight: 7, element: "Elf"},
            {weight: 6, element: "Dragonborn"},
            {weight: 5, element: "Tabaxi"},
            {weight: 4, element: "Bugbear"},
            {weight: 3, element: "Hobgoblin"},
            {weight: 2, element: "Lizardman"},
            {weight: 1, element: "Orc"},
          ],
          totalWeight: 20,
        },
      ],
    };

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
    const table = this.state.contentTables[0];

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

            <ScreenRollAction contentTables={this.state.contentTables}/>
          </main>
        </div>
    );
  }
}

export default App;
