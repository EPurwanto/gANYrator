import {clone, fetchFromJson} from "./Utils";
import {Element, Table} from "./TableUtils";

export interface ActionContent {
    table: string;
    field?: string;
}

export interface Action extends Element {
    contents: ActionContent[];
}

export function findAction(actionName: string, actions: Action[]) {
    return actions.find(a=> a.name === actionName);
}

export function groupActions(actions: Action[]) {
    const actionMap = new Map<string, Action[]>();

    actions.forEach(act => {
        if (!actionMap.has(act.group)) {
            actionMap.set(act.group, []);
        }
        actionMap.get(act.group)?.push(act);
    });

    return actionMap;
}

export function isValidActionName(name: string, actions: Action[]) {
    return !actions.some(a => {return a.name === name});
}

export function nextValidActionName(actions: Action[]) {
    let name = "New Action";
    if (isValidActionName(name, actions)) {
        return name;
    }

    let i = 1;
    while (!isValidActionName(name + " (" + i + ")", actions)) {
        i++;
    }

    return name + " (" + i + ")";
}


export function createAction(name="", desc="", group="Ungrouped", contents: ActionContent[] = []) {
    return {
        name: name,
        desc: desc,
        group: group,
        contents: contents
    }
}

export function createTableAction(table: Table) {
    return createAction(table.name, table.desc, "Table", [{table: table.name}]);
}

export function updateActionRefs(tables: Table[], oldAct: Action, newAct?: Action): [Action, undefined | Action, Table[], Table[]] {
    const oldTabs: Table[] = [];
    const newTabs: Table[] = [];

    tables.forEach((tab) => {
        if (tab.contents && tab.contents.some(
            (row) => {
                return row.action === oldAct.name;
            }
        )) {
            oldTabs.push(tab);
            const copy = clone(tab);

            // update affected rows
            copy.contents.forEach((row) => {
                if (row.action === oldAct.name) {
                    if (newAct) {
                        row.action = newAct.name;
                    } else {
                        delete row.action;
                    }
                }
            });
            newTabs.push(copy);
        }
    });

    return [oldAct, newAct, oldTabs, newTabs]
}

export function fetchActionFromJson(caller: any, url: string) { // todo this any upsets me
    fetchFromJson(url, (result: Action) => {
        const actions = caller.state.actions.concat([result]);

        // Update state
        caller.setState({
            actions: actions
        });
    }, (error: any) => console.log(error));
}
