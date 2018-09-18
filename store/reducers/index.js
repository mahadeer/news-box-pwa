import { combineReducers } from "redux";
import * as PageStatus from "../../models/PageStatus";
import * as Actions from "../Actions";

const pageStatusReducer = (state = PageStatus.NotRendered, action) => {
    switch (action.type) {
        case Actions.SET_PAGE_STATUS:
            return action.payload;
        default:
            return state;
    }
}

const storiesReducer = (state = [], action) => {
    switch (action.type) {
        case Actions.UPDATE_NEWS_STORIES:
            return action.payload;
        default:
            return state;
    }
}

const sectionReducer = (state = "", action) => {
    switch (action.type) {
        case Actions.SET_ACTIVE_SECTION:
            return action.payload;
        default:
            return state;
    }
}

export const rootReducers = combineReducers({
    pageStatus: pageStatusReducer,
    stories: storiesReducer,
    section: sectionReducer
});