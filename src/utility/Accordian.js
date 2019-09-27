import React from 'react';

function Accordian(props) {
    const parentId = props.id ? props.id : "accordian";
    const bodyClass = props.bodyClass ? "card-body " + props.bodyClass : "card-body";

    return(
        <div className="accordian" id={parentId}>
            {
                props.list.map((item) => {
                    return (
                        <div className="card" key={item.key}>
                            <div className="card-header">
                                <h2>
                                    <button className="btn btn-link collapsed" data-toggle="collapse" data-target={"#" + item.key} aria-expanded="true" aria-controls={item.key}>
                                        {item.heading}
                                    </button>
                                </h2>
                            </div>
                            <div id={item.key} className="collapse" aria-labelledby="headingOne" data-parent={"#" + parentId}>
                                <div className={bodyClass}>
                                    {props.children(item)}
                                </div>
                            </div>
                        </div>
                    )
                })
            }

        </div>
    )
}

export default Accordian;