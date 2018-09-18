const createStore = require("redux").createStore;
const initialState = require("../models/Store");
const models = require("../models");
const Actions = require("./Actions");

const storeReducer = (state = initialState, action) => {
    switch (action.type) {
        case Actions.SET_PAGE_STATUS:
            return Object.assign({}, { ...state, pageStatus: action.payload });
        case 'FOO':
            return { ...state, foo: action.payload };
        default:
            return state;
    }
}

const makeStore = (initialState = initialState, options) => {
    return createStore(storeReducer, initialState);
}

module.exports = makeStore;