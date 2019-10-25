/**
 * Search the given list of actions for one matching the given key
 * @param {String} actionKey the action key as a string
 * @param actions
 * @returns {*}
 */
export function findAction(actionKey, actions) {
    return actions.find(a=> a.key === actionKey);
}

export function findTable(name, tables) {
    return tables.find(t=> t.name === name);
}

export function fetchFromJson(url, successCallback, errorCallback) {
    fetch(url)
        .then(response => response.json(), error => errorCallback(error))
        .then(result => {
            successCallback(result)
        }, error => {
            errorCallback(error);
        });
}

export function isValidTableName(name, tables) {
    return !tables.some(t => t.name === name);
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

export function createTable(name) {
    const table = {
        name: name,
        desc: "",
        totalWeight: 0,
        contents: []
    };

    const action = createTableAction(table);
    return [table, action]
}

export function createTableAction(table) {
    return {
        key:"action_" + table.name,
        desc: table.name,
        group: "Table",
        contents: [{table: table.name}]
    };
}