import React, {ReactNode} from 'react';
import AccordionCollapse from "react-bootstrap/AccordionCollapse";
import AccordionToggle from "react-bootstrap/AccordionToggle";
import Card from "react-bootstrap/Card";

interface IProps {
    heading: string;
    eventKey: string;
    onClick: () => void;
    children: ReactNode;
}

const AccordionCardEntry = (props: IProps) => {
    return (
        <Card>
            <AccordionToggle
                as={Card.Header}
                eventKey={props.eventKey}
                onClick={props.onClick}>
                {
                    props.heading
                }
            </AccordionToggle>
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
