import Header from "./Header";

export default class extends React.Component {
    render() {
        return (
            <>
                <Header {...this.props} />
            </>
        );
    }
}