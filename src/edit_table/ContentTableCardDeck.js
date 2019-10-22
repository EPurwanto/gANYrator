import React from 'react';
import ContentTableCard from "./ContentTableCard";
import {CardDeck} from "react-bootstrap";

const ContentTableCardDeck = (props) => {
    const tables = props.tables;
    const rowSize = props.rowSize;
    const rows = [];
    for (let i = 0; i < (tables.length / rowSize); i++) {
        if (i * rowSize < tables.length) {
            rows[i] = tables.slice(i * rowSize, (i+1) * rowSize);
        } else {
            rows[i] = tables.slice(i * rowSize);
        }
    }

    return (
        <div className="row p-2">
            {
                tables.map((table) => {
                    return (
                        <div className="col-sm-3 p-2"
                             key={table.key}>
                            <ContentTableCard
                                onClick={table.handleClick}
                                name={table.name}
                                desc={table.desc}
                                tableKey={table.key}/>
                        </div>
                    )
                })
            }
        </div>
    );
};

export default ContentTableCardDeck;