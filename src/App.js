import 'bootstrap/dist/css/bootstrap.min.css';

import React from 'react';
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Dropdown from "react-bootstrap/esm/Dropdown";
import Row from "react-bootstrap/Row";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import ScreenActions from "./action/ScreenActions";
import './App.css';
import ScreenTables from "./table/ScreenTables";
import ScreenRoll from "./roll/ScreenRoll";

class App extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            actions: [],
            contentTables: [],
            screen: "Roll"
        };

        this.handleActionListChange = this.handleActionListChange.bind(this);
        this.handleTableListChange = this.handleTableListChange.bind(this);
    }

    handleActionListChange(list) {
        list.sort((a, b) => {
            const group = a.group.localeCompare(b.group);
            if (group === 0) {
                return a.name.localeCompare(b.name)
            }
            return group;
        });

        // Update state
        this.setState({
            actions: list
        });

        // update storage
        localStorage.setItem("actions", JSON.stringify(list));
    }

    handleTableListChange(list) {
        // Update state
        this.setState({
            contentTables: list
        });

        // update storage
        localStorage.setItem("tables", JSON.stringify(list));
    }

    handleScreenChange(screen) {
        this.setState({screen: screen});
    }

    handleConfigAction(action) {
        switch (action) {
            case "clearSession":
                localStorage.clear();
                this.setState({contentTables:[], actions:[]});
                break;
            default:
                break;
        }
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
        }
    }

    render() {
        return (
            <div className="root py-2">
                <Dropdown className="config-button" alignRight onSelect={key => this.handleConfigAction(key)}>
                    <Dropdown.Toggle variant="primary" id="config">
                        <i className="fas fa-cogs"/>
                    </Dropdown.Toggle>
                    <Dropdown.Menu>
                        <Dropdown.Item eventKey="clearSession">Clear Session</Dropdown.Item>
                    </Dropdown.Menu>
                </Dropdown>
                <Container className="content pb-1">
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
                                onActionListChange={this.handleActionListChange}
                                onTableListChange={this.handleTableListChange}/>
                        </Tab>
                        <Tab eventKey="Actions" title="Actions">
                            <ScreenActions
                                contentTables={this.state.contentTables}
                                actions={this.state.actions}
                                onActionListChange={this.handleActionListChange}
                                onTableListChange={this.handleTableListChange}/>
                        </Tab>
                    </Tabs>
                </Container>
            </div>
        );
    }
}

export default App;
