import React from 'react';
import Card from "react-bootstrap/esm/Card";

/**
 * Properties
 * className
 * name
 * desc
 * onClick
 * @param props
 * @returns {*}
 * @constructor
 */
const ContentTableCard = (props) => {
    return (
        <Card as="button" className="table-card text-left w-100 h-100" onClick={props.onClick}>
            <Card.Body className="">
                <Card.Title>{props.name}</Card.Title>
                <Card.Text className="card-text">{props.desc}</Card.Text>
            </Card.Body>
        </Card>
    );
};

export default ContentTableCard;