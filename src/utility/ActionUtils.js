import {clone} from "./Utils";

export function findAction(actionName, actions) {
    return actions.find(a=> a.name === actionName);
}

export function groupActions(actions) {
    const actionMap = {};

    actions.forEach(act => {
        if (!actionMap.hasOwnProperty(act.group)) {
            actionMap[act.group] = [];
        }
        actionMap[act.group].push(act);
    });

    const groups = [];
    for(const prop in actionMap) {
        if (Object.prototype.hasOwnProperty.call(actionMap, prop)) {
            groups.push({
                name: prop,
                list: actionMap[prop]
            });
        }
    }

    return groups;
}

export function isValidActionName(name, actions) {
    return !actions.some(a => {return a.name === name});
}

export function nextValidActionName(actions) {
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


export function createAction(name="", desc="", group="Ungrouped", contents=[]) {
    return {
        name: name,
        desc: desc,
        group: group,
        contents: contents
    }
}

export function createTableAction(table) {
    return createAction(table.name, table.desc, "Table", [{table: table.name}]);
}

export function updateActionRefs(tables, oldAct, newAct) {
    const oldActs = [oldAct];
    const newActs = [newAct];

    const oldTabs = [];
    const newTabs = [];

    tables.forEach((tab) => {
        if (tab.contents && tab.contents.some(
            (row) => {
                return row.action === oldAct.name;
            }
        )) {
            oldTabs.push(tab);
            const copy = clone(tab);

            copy.contents.forEach((row) => {
                if (row.action === oldAct.name) {
                    row.action = newAct.name;
                }
            });
            newTabs.push(copy);
        }
    });

    return [oldActs, newActs, oldTabs, newTabs]
}