import React from 'react';
import Card from "react-bootstrap/esm/Card";

/**
 * Properties
 * name
 * desc
 * onClick
 * @param props
 * @returns {*}
 * @constructor
 */
const ResponsiveCard = (props) => {
    return (
        <Card as="button" className="responsive-card text-left w-100 h-100" onClick={props.onClick}>
            <Card.Body>
                <Card.Title>{props.name}</Card.Title>
                <Card.Text>{props.desc}</Card.Text>
            </Card.Body>
        </Card>
    );
};

export default ResponsiveCard;