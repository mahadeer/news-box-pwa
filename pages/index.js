import "isomorphic-fetch";
import { connect } from "react-redux";
import { Dispatches } from "../store/Actions";
import { getSectionText } from "../utils/UIHelpers";
import StoryCard from "../components/StoryCard";

class HomeComponent extends React.Component {
    static async getInitialProps({ req, store }) {
        const baseUrl = req ? `${req.protocol}://${req.get('Host')}` : '';
        const apiReq = await fetch(`${baseUrl}/api/top-headlines`);
        const stories = await apiReq.json();
        store.dispatch(Dispatches.UPDATE_NEWS_STORIES(stories));
    }

    render() {
        return (
            <div>
                <h3>
                    Trending News -&nbsp;
                    <small className="text-muted">
                        {getSectionText(this.props.sources, this.props.section)}
                    </small>
                </h3>
                <br />
                <div id="stories" className="row mb-2" data-columns>
                    {this.props.stories.map(((story, index) => <StoryCard story={story} key={`${index}-${story.source.name}`} />))}
                </div>
            </div>
        );
    }
}

export default connect(
    state => (state)
)(HomeComponent);