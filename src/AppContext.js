import React from 'react'

const AppContext = React.createContext({
    actions: [],
    updateActions: (add, remove) => {},

    contentTables: [],
    updateTables: (add, remove) => {}
});

export default AppContext;