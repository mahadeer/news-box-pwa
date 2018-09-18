import React, { Component } from "react";
import { connect } from "react-redux";

class Page extends Component {

    componentDidMount() {
        this.props.sendFoo('foo on react');
    }

    onMouseEnter() {
        this.props.sendFoo("Triggered Redux Store");
    }

    onMouseLeave() {
        this.props.sendFoo("Foo Container");
    }

    render() {
        return (
            <div className="container">
                <h3>Info about app..</h3>
                <div>Prop from Redux {this.props.pageStatus}</div>
                <div>Prop from Redux {this.props.foo}</div>
                <p className="alert alert-info">
                    {this.props.foo}
                </p>
                <button type="button" className="btn btn-default btn-lg"
                    onMouseEnter={this.onMouseEnter.bind(this)}
                    onMouseLeave={this.onMouseLeave.bind(this)}>
                    Hover on me.
                </button>
            </div>
        )
    }
}

export default connect(state => state, (dispatch) => ({
    sendFoo: (payload) => dispatch({ type: "FOO", payload: payload })
}))(Page);