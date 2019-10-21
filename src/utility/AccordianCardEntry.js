import React from 'react';

const AccordianCardEntry = (props) => {
    return (
        <div className="card">
            <div className="card-header">
                <h2>
                    <button className="btn btn-link collapsed" data-toggle="collapse" data-target={"#" + props.id} aria-expanded="true" aria-controls={props.id}>
                        {props.heading}
                    </button>
                </h2>
            </div>
            <div id={props.id} className="collapse" aria-labelledby="headingOne" data-parent={"#" + props.parent}>
                <div className="card-body">
                    {
                        props.children
                    }
                </div>
            </div>
        </div>
    );
};

export default AccordianCardEntry;