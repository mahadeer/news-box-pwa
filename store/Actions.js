export const SET_PAGE_STATUS = "SET_PAGE_STATUS";
export const LOAD_NEWS_STORIES = "LOAD_NEWS_STORIES";
export const UPDATE_NEWS_STORIES = "UPDATE_NEWS_STORIES";
export const SET_ACTIVE_SECTION = "SET_ACTIVE_SECTION";

export const Dispatches = {
    SET_PAGE_STATUS: (payload) => ({
        type: SET_PAGE_STATUS,
        payload: payload
    }),
    LOAD_NEWS_STORIES: () => ({
        type: LOAD_NEWS_STORIES
    }),
    UPDATE_NEWS_STORIES: (payload) => ({
        type: UPDATE_NEWS_STORIES,
        payload: payload
    }),
    SET_ACTIVE_SECTION: (payload) => ({
        type: SET_ACTIVE_SECTION,
        payload: payload
    })
}