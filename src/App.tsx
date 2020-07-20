import 'bootstrap/dist/css/bootstrap.min.css';

import React, {ReactNode} from 'react';
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
import {fetchTableFromJson, Table} from "./utility/TableUtils";
import {Action, fetchActionFromJson} from "./utility/ActionUtils";
import {ReactElementLike} from "prop-types";

interface IProps {

}

interface IState {
    actions: Action[];
    contentTables: Table[];
    screen: string | null;
    confirmPop?: ConfirmProps;
}

export interface ConfirmProps {
    show: boolean;
    heading?: string;
    children?: ReactElementLike;
    confirmMessage?: string;
    cancelMessage?: string;
    onConfirm: ()=> void;
    onClose: ()=> void;
}

class App extends React.Component<IProps, IState> {
    constructor(props: IProps) {
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

    handleActionsUpdate(add?: Action, remove?: Action) {
        const list: Action[] = handleUpdate(this.state.actions.slice(), add, remove);

        list.sort((a, b) => {
            // sort list by group then by name
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

    handleTablesUpdate(add?: Table, remove?: Table) {
        const list = handleUpdate(this.state.contentTables.slice(), add, remove);

        // Update state
        this.setState({
            contentTables: list
        });

        // update storage
        localStorage.setItem("tables", JSON.stringify(list));
    }

    handleScreenChange(screen: string | null) {
        this.setState({screen: screen});
    }

    handleConfigAction(action: string | null) {
        switch (action) {
            case "clearSession":
                this.useConfirm({
                    show: true,
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
        // Load existing session information from local storage

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
            // Nothing was in local storage, so treat this as a first time opening and load example data

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

    useConfirm(props?: ConfirmProps) {
        this.setState({confirmPop: props});
    }

    render() {
        let confirm: ReactNode;
        if (this.state.confirmPop) {
            // Inject a confirm popup if needed
            confirm = <ConfirmPopup {...this.state.confirmPop}/>
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
                        <Dropdown.Item href="https://github.com/EPurwanto/gANYrator">View source on GitHub</Dropdown.Item>
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
                            updateActions: this.handleActionsUpdate,

                            contentTables: this.state.contentTables,
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
                                <ScreenTables/>
                            </Tab>
                            <Tab eventKey="Actions" title="Actions">
                                <ScreenActions/>
                            </Tab>
                        </Tabs>
                    </AppContext.Provider>
                </Container>
            </div>
        );
    }
}

export default App;
