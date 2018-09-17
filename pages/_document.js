import Document, { Head, Main, NextScript } from "next/document";
import Footer from "../components/Footer";
import Header from "../components/Header";

export default class extends Document {
    render() {
        return (
            <html lang="en">
                <Head>
                    <title>Seithi Petti</title>
                    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" key="viewport" />
                    <meta charSet="utf-8"></meta>
                    <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
                    <meta name="theme-color" content="#ff6600" />
                    <link rel="apple-touch-icon" href="/static/icon.png" />
                    <meta name="apple-mobile-web-app-title" content="Hacker News" />
                    <meta name="apple-mobile-web-app-status-bar-style" content="default" />
                    <meta name="apple-mobile-web-app-capable" content="yes" />
                    <meta name="mobile-web-app-capable" content="yes" />
                    {/* <link href='http://fonts.googleapis.com/css?family=Roboto:400,300,100,500' rel='stylesheet' type='text/css' />
                    <link href='https://fonts.googleapis.com/css?family=Montserrat:400,700' rel='stylesheet' type='text/css' /> */}
                    <link rel="stylesheet" href="/static/libs/bootstrap/bootstrap.min.css" />
                    <link rel="stylesheet" href="/static/css/base.css" />
                    <link rel="stylesheet" href="/static/css/blog.css" />
                    <link rel="stylesheet" href="/static/libs/salvattore.css" />
                </Head>
                <body>
                    <Header />
                    <div className="container mt-5">
                        <Main />
                    </div>
                    <Footer />
                    {/* <NextScript /> */}
                    <link href="https://fonts.googleapis.com/css?family=Playfair+Display:700,900" rel="stylesheet" />
                    <script type="text/javascript" src="/static/libs/salvattore.min.js"></script>
                    <script type="text/javascript" src="/static/libs/jquery-3.2.1.slim.min.js"></script>
                    <script type="text/javascript" src="/static/libs/popper.min.js"></script>
                    <script type="text/javascript" src="/static/libs/bootstrap/bootstrap.min.js"></script>
                </body>
            </html>
        );
    }
}