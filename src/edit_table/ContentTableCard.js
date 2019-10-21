import React from 'react';

/**
 * Properties
 * className
 * tableKey
 * name
 * desc
 * onClick
 * @param props
 * @returns {*}
 * @constructor
 */
const ContentTableCard = (props) => {
    const cname = props.className ? props.className + " card" : "card";
    return (
        <button className={cname} onClick={() => props.onClick(props.tableKey)}>
            <div className="card-body">
                <h5 className="card-title">{props.name}</h5>
                <p className="card-text">{props.desc}</p>
            </div>
        </button>
    );
};

export default ContentTableCard;