import Link from 'next/link';

export default class extends React.Component {
    render() {
        return (
            <>
                <header className="blog-header py-3 container">
                    <div className="row flex-nowrap justify-content-between align-items-center">
                        <div className="col-4 d-none d-md-block pt-1">
                            <Link href="/">
                                <a className="text-muted">
                                    <b>NBox</b>
                                </a>
                            </Link>
                        </div>
                        <div className="col-12 col-md-4 text-center">
                            <Link href="/">
                                <a className="blog-header-logo text-dark">News Box</a>
                            </Link>
                        </div>
                        <div className="col-3 d-none d-md-block">
                            <ul className="nav justify-content-end">
                                <li className="nav-item dropdown">
                                    <a className="nav-link dropdown-toggle text-muted" data-toggle="dropdown" href="#" role="button" aria-haspopup="true" aria-expanded="false">
                                        Top Headlines
                                    </a>
                                    <div className="dropdown-menu">
                                        <a className="dropdown-item active" href="#">Top Headlines</a>
                                        <a className="dropdown-item" href="#">Technology</a>
                                        <a className="dropdown-item" href="#">Politics</a>
                                        <a className="dropdown-item" href="#">Entertainment</a>
                                    </div>
                                </li>
                            </ul>
                        </div>
                        <div className="offset-1 d-none d-md-block"></div>
                    </div>
                </header>
                <div className="nav-scroller py-1 mb-2 mt-2 container d-block d-sm-none">
                    <nav className="nav d-flex justify-content-between">
                        <a className="p-2 text-muted active" href="#">Top Headlines</a>
                        <a className="p-2 text-muted" href="#">Technology</a>
                        <a className="p-2 text-muted" href="#">Politics</a>
                        <a className="p-2 text-muted" href="#">Entertainment</a>
                    </nav>
                </div>
            </>
        );
    }
}