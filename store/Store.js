import { createStore } from "redux";
import { State } from "../models/Store";
import { rootReducers } from "./reducers";

export const makestore = (defaultState = State, options) => {
    return createStore(rootReducers, defaultState);
}