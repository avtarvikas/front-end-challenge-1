import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { getProductData, updateCart } from "../actions";
import Grandtotal from "./Grandtotal";
import { message } from "./Constants";

class MessageBoard extends Component {
  state = {
    data: message
  };

  componentWillMount() {
    const data = message;
    const messageData = Object.keys(message);
    const renderData = [];
    messageData.length > 0 &&
      messageData.map(mess => {
        if (data[mess].parentId === "origin") {
          renderData.push({
            ...data[mess],
            children: []
          });
          if (data[mess].children.length > 0) {
            let children = [];
            children = this.renderChildren(children, data[mess].children);
            console.log(children);
          }
        }
      });
    console.log(renderData);
  }

  renderChildren(childrenObjectArray, childArr) {
    const { data } = this.state;
    let childObjectArray = childrenObjectArray;
    childArr.length > 0 &&
      childArr.map((nes, i) => {
        const nesData = data[nes];
        if (nesData === undefined) return;
        console.log(nesData, data);

        childObjectArray.push({
          ...nesData,
          children: []
        });
        if (nesData.children.length > 0) {
          this.renderChildren(childObjectArray, nesData.children);
        }
      });
    console.log(childObjectArray);
  }

  render() {
    const { data } = this.state;
    return (
      <div className="row content">
        <div className="col-md-8">
          {Object.keys(data).length > 0 ? (
            Object.keys(data).map((d, i) => {
              return (
                <div className="row cart-container" key={i}>
                  {message[d].message}
                  {/* {d.children.length > 0 && d.children.map(res => {

                  })} */}
                </div>
              );
            })
          ) : (
            <div className="cart-empty">NO MESSAGE</div>
          )}
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
  getProductData,
  updateCart
};

export default withRouter(
  connect(
    stateToProps,
    actionCreators
  )(MessageBoard)
);
