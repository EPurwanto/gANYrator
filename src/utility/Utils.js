export function findAction(actionKey, actions) {
    for (const act of actions) {
        if (act.key === actionKey) {
            return act;
        }
    }
    return undefined;
}

export function findTable(name, tables) {
    for (const table of tables) {
        if (table.name === name) {
            return table;
        }
    }
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