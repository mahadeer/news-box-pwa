import "isomorphic-fetch";
import StoryCard from "../components/StoryCard";

export default class extends React.Component {
    static async getInitialProps({ req }) {
        const baseUrl = req ? `${req.protocol}://${req.get('Host')}` : '';
        const apiReq = await fetch(`${baseUrl}/api/top-headlines`);
        const stories = await apiReq.json();
        return { stories };
    }

    render() {
        return (
            <div>
                <h3>Hot News</h3>
                <br />
                <div id="stories" className="row mb-2" data-columns>
                    {this.props.stories.map(((story, index) => <StoryCard story={story} key={`${index}-${story.source.name}`} />))}
                </div>
            </div>
        );
    }
}