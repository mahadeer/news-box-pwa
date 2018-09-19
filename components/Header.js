import Link from 'next/link';
import { connect } from "react-redux";
import { Dispatches } from "../store/Actions";
import { getSectionText } from "../utils/UIHelpers";

const Header = (props) => {
    return (
        <>
            <header className="blog-header py-3 mb-3">
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
                                    {getSectionText(props.sources, props.section)}
                                </a>
                                <div className="dropdown-menu">
                                    {props.sources.map(src => {
                                        return (<button type="button" className={`dropdown-item ${props.section === src.key ? 'active' : ''}`}
                                            onClick={() => props.setActiveSection(src.key)} key={src.key}>
                                            {src.text}
                                        </button>);
                                    })}
                                </div>
                            </li>
                        </ul>
                    </div>
                    <div className="offset-1 d-none d-md-block"></div>
                </div>
            </header>
            <div className="nav-scroller py-1 mb-3 mt-3 container d-block d-sm-none">
                <nav className="nav d-flex justify-content-between">
                    {props.sources.map(src => {
                        return (<button type="button" className={`p-2 text-muted ${props.section === src.key ? 'active' : ''}`}
                            onClick={() => props.setActiveSection(src.key)} key={src.key}>
                            {src.text}
                        </button>);
                    })}
                </nav>
            </div>
        </>
    );
}

export default connect(
    state => ({
        sources: state.sources,
        section: state.section
    }),
    (dispatch) => ({
        setActiveSection: (payload) => dispatch(Dispatches.SET_ACTIVE_SECTION(payload))
    })
)(Header);