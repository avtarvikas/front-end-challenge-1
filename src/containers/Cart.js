import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { getProductData, updateCart } from "../actions";
import Grandtotal from "./Grandtotal";

class Cart extends Component {
  state = {
    data: []
  };

  componentWillMount() {
    const data = localStorage.getItem("cartData");
    this.setState({
      data: data !== null ? JSON.parse(data) : []
    });
  }

  getQuantityData = val => {
    let i;
    let arr = [];
    for (i = 0; i < val; i++) {
      arr.push(<option key={i}>{i + 1}</option>);
    }
    return arr;
  };

  handleQuantityChange = (i, val) => {
    const { data } = this.state;
    let mutableData = data;
    mutableData[i].quantity = val;
    localStorage.getItem("cartData", JSON.stringify(mutableData));
    this.setState({
      data: mutableData
    });
  };

  handleRemove = key => {
    const { data } = this.state;
    let mutableData = data.filter((d, i) => i !== key);
    localStorage.setItem("cartData", JSON.stringify(mutableData));
    this.setState(
      {
        data: mutableData
      },
      () => this.props.updateCart()
    );
  };

  render() {
    const { data } = this.state;
    return (
      <div className="row content">
        <div className="col-md-8">
          {data.length > 0 ? (
            data.map((d, i) => {
              const {
                productData,
                selectedSize,
                selectedSource,
                sources,
                quantity
              } = d;
              const sourceData = sources[selectedSource];
              const total = sourceData
                ? sourceData.discounted_price * quantity
                : 0;
              return (
                <div className="row cart-container" key={i}>
                  <div className="col-md-2 product-img">
                    <img
                      src={
                        productData && productData.image && productData.image[0]
                      }
                      alt="Product"
                      height={130}
                      width={50}
                    />
                  </div>
                  <div className="col-md-10" style={{ paddingLeft: "40px" }}>
                    <div className="cart-product-title">
                      {productData.title}
                    </div>
                    <div className="cart-sub-title">
                      {productData.sex} {productData.family}{" "}
                      {productData.category}
                    </div>
                    <div className="cart-product-title">
                      ₹ {sourceData && sourceData.discounted_price}
                    </div>
                    <div className="product-sizes">
                      <div
                        style={{
                          display: "inline"
                        }}
                      >
                        <span className="cart-Item">Size:</span>
                        {selectedSize}
                      </div>
                      <div
                        style={{
                          display: "inline",
                          marginLeft: "14px"
                        }}
                      >
                        <span className="cart-Item">Source:</span>{" "}
                        {sourceData && sourceData.city},{" "}
                        {sourceData && sourceData.state}
                      </div>
                      <div
                        className="form-group"
                        style={{ display: "inline", marginLeft: "15px" }}
                      >
                        <label className="cart-Item">Quantity &nbsp;</label>
                        <select
                          className="form-control"
                          id="sel1"
                          value={quantity}
                          onChange={e =>
                            this.handleQuantityChange(i, e.target.value)
                          }
                        >
                          {this.getQuantityData(
                            sourceData ? sourceData.stock : 0
                          )}
                        </select>
                      </div>
                      <div>
                        <span style={{ float: "right" }}>
                          <button
                            style={{ padding: "4px 24px" }}
                            type="button"
                            className="btn btn-danger"
                            onClick={() => this.handleRemove(i)}
                          >
                            Remove Item
                          </button>
                        </span>
                        <label style={{ fontSize: "18px", fontWeight: "600" }}>
                          Total:&nbsp;₹ {total}
                        </label>{" "}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })
          ) : (
            <div className="cart-empty">Your Cart Is Empty</div>
          )}
        </div>
        <div className="col-md-4">
          <Grandtotal data={data}/>
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

export default withRouter(connect(stateToProps, actionCreators)(Cart));
