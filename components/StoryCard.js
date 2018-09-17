export default class extends React.Component {
    getDateString(date) {
        return new Date(date).toDateString();
    }

    render() {
        return (
            <div className="ccol-12 ccol-md-6 ccol-lg-4">
                <div className="card flex-md-row mb-4 box-shadow">
                <img className="card-img-right flex-auto" alt="" src={this.props.story.urlToImage} data-holder-rendered="true" />
                    <div className="card-body d-flex flex-column align-items-start">
                        <strong className="d-inline-block mb-2 text-primary">{this.props.story.source.name}</strong>
                        <h3 className="mb-0">
                            <a className="text-dark" href="#">{this.props.story.title}</a>
                        </h3>
                        <div className="mb-1 text-muted">{this.getDateString(this.props.story.publishedAt)}</div>
                        <p className="card-text mb-auto">
                            {this.props.story.description}
                        </p>
                        <a href={this.props.story.url} target="_blank">Continue reading</a>
                    </div>
                </div>
            </div>
        );
    }
}