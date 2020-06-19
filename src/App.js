import 'bootstrap/dist/css/bootstrap.min.css';

import React from 'react';
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Dropdown from "react-bootstrap/Dropdown";
import Row from "react-bootstrap/Row";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import ScreenActions from "./action/ScreenActions";
import './App.css';
import AppContext from './AppContext'
import ScreenRoll from "./roll/ScreenRoll";
import ConfirmPopup from "./structure/ConfirmPopup";
import ScreenTables from "./table/ScreenTables";
import {handleUpdate} from "./utility/Utils";
import {fetchTableFromJson} from "./utility/TableUtils";
import {fetchActionFromJson} from "./utility/ActionUtils";

class App extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            actions: [],
            contentTables: [],
            screen: "Roll",
            confirmPop: undefined
        };

        this.handleActionsUpdate = this.handleActionsUpdate.bind(this);
        this.handleTablesUpdate = this.handleTablesUpdate.bind(this);
    }

    handleActionsUpdate(add, remove) {
        const list = handleUpdate(this.state.actions.slice(), add, remove);

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

    handleTablesUpdate(add, remove) {
        const list = handleUpdate(this.state.contentTables.slice(), add, remove);

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
                this.useConfirm({
                    heading: "Clear the session",
                    children: <div>
                        <p><strong>Warning, this will delete all tables and actions in the current session.</strong></p>
                        <p>Are you sure you would like to continue?</p>
                    </div>,
                    onConfirm: () => {
                        localStorage.clear();
                        this.setState({contentTables:[], actions:[], screen: "Roll"});
                    },
                    onClose: () => {this.useConfirm()}
                });
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

        if (!actionStore && !tableStore) {
            fetchTableFromJson(this, "./content/Table5eDragonbornColours.json");
            fetchTableFromJson(this, "./content/Table5eDwarfSubraces.json");
            fetchTableFromJson(this, "./content/Table5eElfSubraces.json");
            fetchTableFromJson(this, "./content/Table5eGnomeSubraces.json");
            fetchTableFromJson(this, "./content/Table5eHalflingSubraces.json");
            fetchTableFromJson(this, "./content/Table5ePhbRace.json");
            fetchTableFromJson(this, "./content/TableGender.json");
            fetchActionFromJson(this, "./content/Action5eCharacter.json");
        }
    }

    useConfirm(props) {
        this.setState({confirmPop: props});
    }

    render() {
        let confirm = "";
        if (this.state.confirmPop) {
            confirm = <ConfirmPopup show {...this.state.confirmPop}/>
        }

        return (
            <div className="root py-2">
                {confirm}
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
                    <AppContext.Provider value={
                        {
                            actions: this.state.actions,
                            addActions: this.handleActionsAdd,
                            removeActions: this.handleActionsRemove,
                            updateActions: this.handleActionsUpdate,

                            contentTables: this.state.contentTables,
                            addTables: this.handleTablesAdd,
                            removeTables: this.handleTablesRemove,
                            updateTables: this.handleTablesUpdate
                        }
                    }>
                        <Tabs
                            className="mb-3"
                            activeKey={this.state.screen}
                            onSelect={k => this.handleScreenChange(k)}
                            unmountOnExit={true}>
                            <Tab eventKey="Roll" title="Roll">
                                <ScreenRoll/>
                            </Tab>
                            <Tab eventKey="Tables" title="Tables">
                                <ScreenTables
                                    onActionListChange={this.handleActionsUpdate}
                                    onTableListChange={this.handleTablesUpdate}/>
                            </Tab>
                            <Tab eventKey="Actions" title="Actions">
                                <ScreenActions
                                    onActionListChange={this.handleActionsUpdate}
                                    onTableListChange={this.handleTablesUpdate}/>
                            </Tab>
                            {/*<Tab eventKey="Help" title="Help">*/}
                            {/*    <ScreenHelp/>*/}
                            {/*</Tab>*/}
                        </Tabs>
                    </AppContext.Provider>
                </Container>
            </div>
        );
    }
}

export default App;
