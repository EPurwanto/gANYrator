import React from 'react';

function ContentTableDisplay(props) {
    return (
        <table className="table table-sm">
            <thead>
            <tr>
                <th scope="col" className="text-right">Freq.</th>
                <th scope="col" className="col">Value</th>
            </tr>
            </thead>
            <tbody>
            {
                props.contentTable.contents.map((row, index) => {
                    return (
                        <tr key={index}>
                            <td className="text-right">{row.weight * 100 / props.contentTable.totalWeight + "%"}</td>
                            <td>{row.element}</td>
                        </tr>
                    )
                })
            }
            </tbody>
        </table>
    );
}

export default ContentTableDisplay;