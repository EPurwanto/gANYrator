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

export function createTable(name) {
    const table = {
        name: name,
        desc: "",
        totalWeight: 0,
        contents: []
    };

    const action = {
        key:"action_" + table.name,
        desc: table.name,
        group: "Table",
        contents: [{table: table.name}]
    };
    return [table, action]
}