import React from 'react'

const AppContext = React.createContext({
    contentTables: [],
    actions: [],
    updateTables: () => {},
    updateActions: () => {},
});

export default AppContext;