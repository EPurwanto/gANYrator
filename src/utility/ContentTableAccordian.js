import React from 'react';
import Accordion from "./Accordion";
import ContentTableDisplay from "./ContentTableDisplay";

function ContentTableAccordian(props) {
    return (
        <Accordion list={props.contentTables.map((table) => {return {key: table.key, heading: table.desc, table: table} })} bodyClass="pt-0">
            {
                (item) => {
                    return <ContentTableDisplay contentTable={item.table} key={item.table.key}/>
                }
            }
        </Accordion>
    )
}

export default ContentTableAccordian;