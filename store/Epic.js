import "isomorphic-fetch";
import "rxjs";
import { mergeMap, map, catchError, mapTo, switchMap } from "rxjs/operators";
import { combineEpics, ofType } from "redux-observable";
import * as PageStatus from "../models/PageStatus";
import { Dispatches, SET_ACTIVE_SECTION, LOAD_NEWS_STORIES, UPDATE_NEWS_STORIES } from "./Actions";

const setActiveSectionEpic = (action$) =>
    action$.pipe(
        ofType(SET_ACTIVE_SECTION),
        mergeMap((action) => {
            return [
                Dispatches.SET_PAGE_STATUS(PageStatus.Loading),
                Dispatches.LOAD_NEWS_STORIES(action.payload)
            ];
        })
    );

const loadNewsEpic = (action$) => action$.pipe(
    ofType(LOAD_NEWS_STORIES),
    mergeMap((action) =>
        fetch("/api/news/" + action.payload)
            .then((response) => response.json())
    ),
    mergeMap((stories) => {
        return [Dispatches.UPDATE_NEWS_STORIES(stories)];
    }),
    catchError(err => {
        return Promise.resolve(Dispatches.SET_PAGE_STATUS(PageStatus.Error))
    })
);

const updateNewsEpic = (action$) => action$.pipe(
    ofType(UPDATE_NEWS_STORIES),
    mapTo(Dispatches.SET_PAGE_STATUS(PageStatus.Rendered))
);

export const rootEpics = combineEpics(
    setActiveSectionEpic,
    loadNewsEpic,
    updateNewsEpic
);