'use strict';

var React = require('react');

// STORES
var DisplayedItemStore = require('../Stores/displayedItemStore.js');

// ACTIONS
var _changeTab = require('../Actions/displayActionCreator.js').changeTab;

/*

interface TabProps{
    name: string,
    type: string
}
interface TabState{
    content: string
}

*/

function getStateFromStores(type) {
    return {
        isActive: DisplayedItemStore.getDisplayedTab() === type
    };
}

var Tab = React.createClass({
    displayName: 'Tab',

    getInitialState: function(){
        return getStateFromStores(this.props.type);
    },

    componentDidMount: function() {
        DisplayedItemStore.addChangeListener(this.onChange);
    },

    componentWillUnmount: function() {
        DisplayedItemStore.removeChangeListener(this.onChange);
    },
    
    render: function() {
        var state = this.state;
        var props = this.props;

        var classes = [
            'tab',
            state.isActive ? 'active' : ''
        ];
        
        return React.DOM.div({
                className: classes.join(' '),
                onClick: this.changeTab
            },
            props.name
        );
    },

    changeTab: function(){
        if (!this.state.isActive)
            _changeTab(this.props.type);
    },

    onChange: function() {
        this.setState(getStateFromStores(this.props.type));
    }
});

module.exports = Tab;
