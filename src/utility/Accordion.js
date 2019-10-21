import React from 'react';
import AccordianCardEntry from "./AccordianCardEntry";

/**
 *
 * Properties:
 * list: Array of objects
 * > key: String unique id for the entry
 * > heading: String description for heading
 * id: String unique id for the Accordion
 * bodyClass: String CSS class
 * children: Method pointer taking in an Item from the list and populating the children
 * @param props
 * @returns {*}
 * @constructor
 */
function Accordion(props) {
    const parentId = props.id ? props.id : "accordian";
    const bodyClass = props.bodyClass ? "card-body " + props.bodyClass : "card-body";

    return(
        <div className="accordian" id={parentId}>
            {
                props.list.map((item) => {
                    return (
                        <AccordianCardEntry
                            id={item.key}
                            heading={item.heading}
                            parent="parentId"
                        >
                            {props.children(item)}
                        </AccordianCardEntry>
                    )
                })
            }

        </div>
    )
}

export default Accordion;