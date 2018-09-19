import { createStore, applyMiddleware } from "redux";
import { createEpicMiddleware } from 'redux-observable';
import { State } from "../models/Store";
import { rootReducers } from "./reducers";
import { rootEpics } from "./Epic";

export const makestore = (defaultState = State) => {
    const epicMiddleware = createEpicMiddleware();
    const store = createStore(rootReducers, defaultState, applyMiddleware(epicMiddleware));
    epicMiddleware.run(rootEpics);
    return store;
}