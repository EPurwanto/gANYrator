import React from 'react';
import Accordian from "../utility/Accordian";
import ContentTableDisplay from "./ContentTableDisplay";

function ContentTableAccordian(props) {
    return (
        <Accordian list={props.contentTables.map((table) => {return {key: table.key, heading: table.desc, table: table} })} bodyClass="pt-0">
            {
                (item) => {
                    return <ContentTableDisplay contentTable={item.table} key={item.table.key}/>
                }
            }
        </Accordian>
    )
}

export default ContentTableAccordian;