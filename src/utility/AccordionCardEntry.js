import React from 'react';
import AccordionCollapse from "react-bootstrap/AccordionCollapse";
import AccordionToggle from "react-bootstrap/AccordionToggle";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";

const AccordionCardEntry = (props) => {
    return (
        <Card>
            <Card.Header>
                <AccordionToggle as={Button} variant="link" eventKey={props.eventKey}>
                    {
                        props.heading
                    }
                </AccordionToggle>
            </Card.Header>
            <AccordionCollapse eventKey={props.eventKey}>
                <Card.Body>
                    {
                        props.children
                    }
                </Card.Body>
            </AccordionCollapse>
        </Card>
    );
};

export default AccordionCardEntry;