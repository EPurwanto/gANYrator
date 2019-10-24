import React, {Component} from 'react';

class ScreenEditTable extends Component {
    constructor(props, context) {
        super(props, context);

        this.state = {
            // name: this.props.table.name,
            // desc: this.props.table.desc,
            // contents: [JSON.parse(JSON.stringify(props.table.contents))]
        }
    }

    handleNameChange(e) {
        this.setState({name: e.target.value})
    }

    handleDescChange(e) {
        this.setState({desc: e.target.value})
    }

    render() {
        return (
            <div>

            </div>
        );
    }
}

export default ScreenEditTable;