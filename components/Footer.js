import Link from 'next/link';

export default class extends React.Component {
    render() {
        return (
            <footer className="blog-footer">
                <p className="footer-spans">
                    <span>Template built by <a href="https://getbootstrap.com/">Bootstrap</a> by <a href="https://twitter.com/mdo">@mdo</a> ||</span>
                    <span>News powered by <a href="https://newsapi.org/">NewsApi</a> ||</span>
                    <span>Modified by <Link href="/about">
                        <a>Mafyosis Developers</a>
                    </Link></span>
                </p>
            </footer>
        );
    }
}