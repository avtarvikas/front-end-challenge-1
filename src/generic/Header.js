import React from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { updateCart } from "../actions";
import logo from "../assets/logo.svg";

class Header extends React.Component {
  state = {
    cartData: []
  };
  componentWillMount() {
    this.props.updateCart();
    this.setState({
      cartData: this.props.data.cartData
    });
  }
  componentWillReceiveProps(props) {
    this.setState({
      cartData: props.data.cartData
    });
  }
  render() {
    return (
      <div className="row header">
        <div className="col-md-5">
          <div className="row">
            <div className="col-md-2 logo">
              <div className="logo-new-image">
                <img
                  alt="logo"
                  className="App-logo"
                  src={logo}
                  width="70"
                  height="57"
                />
              </div>
            </div>
            <div className="col-md-10 nav-name">
              <div className="header-name">E-Mall</div>
            </div>
          </div>
        </div>
        <div className="col-md-7" style={{ padding: "15px" }}>
          <span style={{ marginLeft: "15px", float: "right" }}>
            <button
              style={{ padding: "4px 24px" }}
              type="button"
              className="btn btn-primary"
              onClick={() => this.props.history.push("/")}
            >
              Back to Product
            </button>
          </span>
          <span style={{ marginLeft: "15px", float: "right" }}>
            <button
              style={{ padding: "4px 24px" }}
              type="button"
              className="btn btn-warning"
              onClick={() => this.props.history.push("/mycart")}
            >
              My Cart
              {this.state.cartData.length > 0
                ? ` (${this.state.cartData.length})`
                : ""}
            </button>
          </span>
        </div>
      </div>
    );
  }
}

const stateToProps = state => {
  return {
    data: state.taskData
  };
};
const actionCreators = {
  updateCart
};

export default withRouter(connect(stateToProps, actionCreators)(Header));
