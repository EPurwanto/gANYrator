import React from 'react';
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import ResponsiveCard from "./ResponsiveCard";

const ResponsiveCardDeck = (props) => {
    const items = props.items.slice();
    const rows = [];

    for (let i=0 ; i < items.length ; i += 4) {
        const r = items.slice(i, i + 4);
        rows.push(
            <Row className="my-3" key={i}>
                {
                    r.map(item => {
                        return (
                            <Col sm="3"
                                 key={item.name}>
                                <ResponsiveCard
                                    onClick={item.handleClick}
                                    name={item.name}
                                    desc={item.desc}/>
                            </Col>
                        )
                    })
                }
            </Row>
        )
    }

    return rows;
};

export default ResponsiveCardDeck;