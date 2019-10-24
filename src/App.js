import 'bootstrap/dist/css/bootstrap.min.css';

import React from 'react';
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import './App.css';
import ScreenTables from "./list_table/ScreenTables";
import ScreenRoll from "./roll_action/ScreenRoll";
import {fetchFromJson} from "./utility/Utils";

class App extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            actions: [],
            contentTables: [],
            screen: "Roll"
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
            key:"action_" + table.name,
            desc: table.name,
            group: "Table",
            contents: [{table:table.name}]
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
        return (
            <div className="root pt-2">
                <Container className="content">
                    <Row>
                        <Col>
                            <h1 className="display-1 text-center">gANYrator</h1>
                            <h2 className="text-center">Generate Anything.</h2>
                        </Col>
                    </Row>
                    <Tabs
                        className="mb-3"
                        activeKey={this.state.screen}
                        onSelect={k => this.handleScreenChange(k)}
                        unmountOnExit={true}>
                        <Tab eventKey="Roll" title="Roll">
                            <ScreenRoll
                                contentTables={this.state.contentTables}
                                actions={this.state.actions}/>
                        </Tab>
                        <Tab eventKey="Tables" title="Tables">
                            <ScreenTables
                                contentTables={this.state.contentTables}
                                actions={this.state.actions}
                                onTableAdd={this.addTable}/>
                        </Tab>
                        <Tab eventKey="Actions" title="Actions">
                            <div/>
                        </Tab>
                    </Tabs>
                </Container>
            </div>
        );
    }
}

export default App;
