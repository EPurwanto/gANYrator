export function findAction(actionKey, actions) {
    for (const act of actions) {
        if (act.key === actionKey) {
            return act;
        }
    }
    return undefined;
}

export function findTable(tableKey, tables) {
    for (const table of tables) {
        if (table.key === tableKey) {
            return table;
        }
    }
}