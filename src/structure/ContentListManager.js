import PropTypes from 'prop-types';
import React, {Component} from 'react';
import {clone} from "../utility/Utils";

function ContentListManager(WrappedComponent, getNewItem) {
    return class extends Component {
        constructor(props) {
            super(props);

            const {items, ...other} = props;
            this.otherProps = {...other};

            const list = clone(items);
            list.forEach((r) => {r.key = this.findUniqueKey(list)});
            list.push(this.getPlaceholder(list));

            this.state = {
                items: list
            };

            this.handleRowChange = this.handleRowChange.bind(this);
            this.handleRowDelete = this.handleRowDelete.bind(this);
        }

        getPlaceholder(list) {
            const placeholder = getNewItem();
            placeholder.placeholder = true;

            placeholder.key = this.findUniqueKey(list);
            return placeholder;
        }

        findUniqueKey(list) {
            let key = 0;
            do {
                key = Math.random();
            } while (list.some((r) => {return r.key === key}));

            return key;
        }

        cleanList(list) {
            let cleaned = clone(list);
            // Cut off the placeholder row
            cleaned = cleaned.slice(0, -1);

            // remove key props
            cleaned.forEach((r) => {delete r.key});
            return cleaned;
        }

        handleRowDelete(key) {
            const items = this.state.items.slice();
            const index = items.findIndex(r => {return r.key === key});

            items.splice(index, 1);
            this.update(items);
        }

        handleRowChange(key, ...other) {
            const list = this.state.items.slice();
            const index = list.findIndex(r => {return r.key === key});

            const existing = list[index];
            if (existing.placeholder) {
                // push a new placeholder row
                list.push(this.getPlaceholder(list));
            }


            const item = getNewItem(...other);
            item.key = existing.key;
            list[index] = item;

            this.update(list)
        }

        update(list) {
            this.setState({items: list});
            this.props.onListUpdate(this.cleanList(list));
        }

        render() {
            return <WrappedComponent
                items={this.state.items}
                onRowChange={this.handleRowChange}
                onRowDelete={this.handleRowDelete}
                {...this.otherProps}/>
        }
    }
}

ContentListManager.propTypes = {
    items: PropTypes.array,
    onListUpdate: PropTypes.func
};

ContentListManager.defaultProps = {

};

export default ContentListManager;