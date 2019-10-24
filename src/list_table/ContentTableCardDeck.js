import React from 'react';
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import ContentTableCard from "./ContentTableCard";

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
        <Row>
            {
                tables.map((table) => {
                    return (
                        <Col sm="3"
                             key={table.name}>
                            <ContentTableCard
                                onClick={table.handleClick}
                                name={table.name}
                                desc={table.desc}/>
                        </Col>
                    )
                })
            }
        </Row>
    );
};

export default ContentTableCardDeck;