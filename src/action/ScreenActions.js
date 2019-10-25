import React, {Component} from 'react';
import ResponsiveCardDeck from "../utility/ResponsiveCardDeck";

class ScreenActions extends Component {

    constructor(props, context) {
        super(props, context);
        this.state = {
            selected: ""
        };
    }

    handleSelect(name) {
        this.setState({selected: name});
    }

    render() {
        const acts = this.props.actions.map(a => {
            return {
                name: a.name,
                sub: a.group,
                desc: a.desc,
                onClick: () => this.handleSelect(a.name)
            }
        });

        return (
            <ResponsiveCardDeck
                items={acts}/>
        )
    }
}

export default ScreenActions;