import React from 'react';
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import ResponsiveCard from "./ResponsiveCard";


const wide = 4;
const ResponsiveCardDeck = (props) => {
    const items = props.items.slice();
    const rows = [];

    for (let i=0 ; i < items.length ; i += wide) {
        const r = items.slice(i, i + wide);
        rows.push(
            <Row className="my-3" key={i}>
                {
                    r.map(item => {
                        return (
                            <Col sm={12/wide}
                                 key={item.name}>
                                <ResponsiveCard {...item}/>
                            </Col>
                        )
                    })
                }
            </Row>
        )
    }

    return (
        <React.Fragment>
            {rows}
        </React.Fragment>
    );
};

export default ResponsiveCardDeck;
