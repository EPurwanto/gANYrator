

export function findTable(name, tables) {
    return tables.find(t=> t.name === name);
}

export function isValidTableName(name, tables) {
    return !tables.some(t => t.name === name);
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