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
          field: "OtherRace",
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
