import * as PageStatus from "./PageStatus";
import * as config from "../server/config";

export const State = {
    pageStatus: PageStatus.NotRendered,
    stories: [],
    section: "top-headlines",
    sources: config.sources
}