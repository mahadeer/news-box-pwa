import React, { Component } from "react";
import { connect } from "react-redux";
import * as Pagestatus from "../models/PageStatus";
import { Dispatches } from "../store/Actions";

class Page extends Component {
    componentDidMount() {
        this.props.updatePageStatus(Pagestatus.Rendered);
    }

    render() {
        return (
            <div className="container">
                <h3>Info about app..</h3>
                <div>Prop from Redux {this.props.pageStatus}</div>
                <p className="alert alert-info">
                    {this.props.section}
                </p>
            </div>
        );
    }
}

export default connect(
    state => ({ section: state.section, pageStatus: state.pageStatus }),
    (dispatch) => ({
        updatePageStatus: (payload) => dispatch(Dispatches.SET_PAGE_STATUS(payload))
    })
)(Page);