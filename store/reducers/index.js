import { combineReducers } from "redux";
import * as PageStatus from "../../models/PageStatus";
import { SET_PAGE_STATUS, UPDATE_NEWS_STORIES, SET_ACTIVE_SECTION } from "../Actions";
import * as config from "../../server/config";

const pageStatusReducer = (state = PageStatus.NotRendered, action) => {
    switch (action.type) {
        case SET_PAGE_STATUS:
            return action.payload;
        default:
            return state;
    }
}

const storiesReducer = (state = [], action) => {
    switch (action.type) {
        case UPDATE_NEWS_STORIES:
            return action.payload;
        default:
            return state;
    }
}

const sectionReducer = (state = "", action) => {
    switch (action.type) {
        case SET_ACTIVE_SECTION:
            return action.payload;
        default:
            return state;
    }
}

const sourcesReducer = (state = config.sources, action) => {
    switch (action.type) {
        default:
            return state;
    }
}

export const rootReducers = combineReducers({
    pageStatus: pageStatusReducer,
    stories: storiesReducer,
    section: sectionReducer,
    sources: sourcesReducer
});