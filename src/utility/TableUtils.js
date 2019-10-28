import {createTableAction} from "./ActionUtils";
import {clone} from "./Utils";

export function findTable(name, tables) {
    return tables.find(t=> t.name === name);
}

export function isValidTableName(name, tables) {
    return !tables.some(t => t.name === name);
}

export function nextValidTableName(actions) {
    let name = "New Table";
    if (isValidTableName(name, actions)) {
        return name;
    }

    let i = 1;
    while (!isValidTableName(name + " (" + i + ")", actions)) {
        i++;
    }

    return name + " (" + i + ")";
}

export function createTable(name="New", desc="", contents=[]) {
    return {
        name: name,
        desc: desc,
        totalWeight: getTotalWeight(contents),
        contents: contents
    };
}

function getTotalWeight(contents) {
    let w = 0;
    contents.forEach(r => {
        w += r.weight;
    });
    return w;
}

export function updateTableRefs(actions, tables, oldTab, newTab) {
    const oldActs = [];
    const newActs = [];

    const oldTabs = [oldTab];
    const newTabs = [];

    if (newTab) {
        newTabs.push(newTab);
    }

    actions.forEach((act) => {

        if (act.name === oldTab.name && act.group === "Table") {
            // Update action for the table
            oldActs.push(act);

            if (newTab) {
                // Create a new one if new table was created
                newActs.push(createTableAction(newTab))
            }
            // creating from scratch means we never have to do the below branch as well

        } else if (act.contents.some((row) => {return row.table === oldTab.name})) {
            // Update references in actions
            oldActs.push(act);

            // clone and update contents
            const copy = clone(act);

            if (newTab) {
                // Update to new name
                copy.contents.forEach((row) => {
                    if (row.table === oldTab.name) {
                        row.table = newTab.name;
                    }
                });
            } else {
                // Filter out dead references
                copy.contents = copy.contents.filter((row) => {return row.table !== oldTab.name})
            }
            newActs.push(copy);
        }
    });

    tables.forEach((tab) => {
        if (tab.contents && tab.contents.some(                                              // This IS ALL
            (tabRow) => {                                                                   // One FUCKING
                return typeof tabRow.action === "object" && tabRow.action.contents.some(    // AWFUL
                    (actRow) => {                                                           // IF condition
                        return actRow.table === oldTab.name;                                // To check if
                    }                                                                       // The table has
                )                                                                           // An Action referencing
            }                                                                               // The changed table
        )) {
            // If Above, clone and update
            oldTabs.push(tab);

            const copy = clone(tab);
            copy.contents.forEach(                             // Iterate across table rows
                (tabRow) => {
                    if (typeof tabRow.action === "object") {    // Find those with object actions


                        if (newTab) {
                            // Update to new name
                            tabRow.action.contents.forEach(                // --- Iterate across action rows
                                (actRow) => {
                                    if (actRow.table === oldTab.name) {
                                        actRow.table = newTab.name;     // Update action row in cloned table data.
                                    }
                                }
                            )
                        } else {
                            // Filter out dead references
                            tabRow.action.contents = tabRow.action.contents.filter((row) => {return row.table !== oldTab.name})
                            if (tabRow.action.contents.length === 0) {
                                delete tabRow.action;
                            }
                        }

                    }
                }
            );
            newTabs.push(copy);
        }
    });

    return [oldActs, newActs, oldTabs, newTabs]
}