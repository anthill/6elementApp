'use strict';

var dispatcher = require('../Dispatcher/dispatcher.js');
var EventEmitter = require('events').EventEmitter;
var Immutable = require('immutable');

var actionTypes = require('../Constants/actionTypes.js');

var CHANGE_EVENT = 'change';

// initial data from local storage
var _adMap = new Immutable.Map(); // Map: id -> Ad

/*

Interface Ad
{
    id: integer,
    creator: integer,
    content: {
      title: string,
      categories: [string],
      location: string,
      state: string,
      text: string
    },
    direction: string,
    status: string
}

*/

// IN THE END, THIS REPRESENTS THE AD DATABASE. A STORE LIKE THIS MIGHT NOT BE COMPULSORY

var AdStore = Object.assign({}, EventEmitter.prototype, {

    emitChange: function() {
        this.emit(CHANGE_EVENT);
    },

    addChangeListener: function(callback) {
        this.on(CHANGE_EVENT, callback);
    },

    removeChangeListener: function(callback) {
        this.removeListener(CHANGE_EVENT, callback);
    },

    get: function(id){
        return _adMap.get(id);
    },

    getFromUser: function(userId){
        var ads = [];

        _adMap.forEach(function(ad){
            if (ad.owner === userId)
                ads.push(ad);
        });

        return ads;
    },

    getAll: function(){
        return _adMap;
    },

    create: function(ad){
        var id = Math.random();

        _adMap.set(id, Object.assign({
            id: id
        }), ad);
    }

});

AdStore.dispatchToken = dispatcher.register(function(action) {

    switch(action.type) {

        case actionTypes.LOAD_ADS:
            _adMap = action.adMap;
            console.log('_adMap', _adMap);
            AdStore.emitChange();
            break;

        default:
          // do nothing
    }

});

module.exports = AdStore;
