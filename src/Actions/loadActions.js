'use strict';

var dispatcher = require('../Dispatcher/dispatcher.js');
var actionTypes = require('../Constants/actionTypes.js');

module.exports = {
    loadDisplayState: function(displayState) {
        dispatcher.dispatch({
            type: actionTypes.LOAD_DISPLAY,
            displayState: displayState
        });
    },

    loadUserPrefs: function(userPrefs){
        dispatcher.dispatch({
            type: actionTypes.LOAD_USER_PREFS,
            userPrefs: userPrefs
        });
    },

    loadRecyclingCenters: function(recyclingCenterMap){
        dispatcher.dispatch({
            type: actionTypes.LOAD_RCS,
            recyclingCenterMap: recyclingCenterMap
        });
    },

    loadTrocs: function(trocMap){
        dispatcher.dispatch({
            type: actionTypes.LOAD_TROCS,
            trocMap: trocMap
        });
    },

    loadAds: function(adMap){
        dispatcher.dispatch({
            type: actionTypes.LOAD_ADS,
            adMap: adMap
        });
    },

    loadUsers: function(userMap){
        dispatcher.dispatch({
            type: actionTypes.LOAD_USERS,
            userMap: userMap
        });
    }

};
