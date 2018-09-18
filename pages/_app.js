import App, { Container } from "next/app";
import { Provider } from "react-redux";
import withRedux from "next-redux-wrapper";
import { SET_PAGE_STATUS } from "../store/Actions";
import * as PageStatus from "../models/PageStatus";
import { makestore } from "../store/Store";

class MyApp extends App {
    static async getInitialProps({ Component, ctx }) {
        ctx.store.dispatch({
            type: SET_PAGE_STATUS,
            payload: PageStatus.Updating
        });
        const pageProps = Component.getInitialProps ? await Component.getInitialProps(ctx) : {};
        return { pageProps };
    }

    render() {
        const { Component, pageProps, store } = this.props;
        return (
            <Container>
                <Provider store={store}>
                    <Component {...pageProps} />
                </Provider>
            </Container>
        );
    }
}

export default withRedux(makestore, { storeKey: "pwa-root-store" })(MyApp);