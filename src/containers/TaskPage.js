import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { getProductData, updateCart } from "../actions";
import RadioButton from "../generic/RadioButton";
import myData from "../product.json";

class TaskPage extends Component {
  state = {
    productData: {},
    sizes: {},
    selectedSize: "L",
    selectedSource: 0,
    sources: [],
    quantity: 1,
    cartData: [],
    isAdded: false,
    isExit: false
  };
  componentWillMount() {
    this.props.getProductData(myData);
    const data = localStorage.getItem("cartData");
    if (data !== null) {
      this.setState({
        cartData: JSON.parse(data)
      });
    }
  }
  componentWillReceiveProps(props) {
    const { sizes } = props.data;
    const data = localStorage.getItem("cartData");
    const sources =
      sizes &&
      sizes[this.state.selectedSize] &&
      this.getLowestCost(sizes[this.state.selectedSize]);
    this.setState({
      productData: props.data.productData,
      sizes: props.data.sizes,
      sources,
      cartData: data !== null ? JSON.parse(data) : []
    });
  }

  handleSizeChange = e => {
    const { sizes } = this.state;
    const sources =
      sizes && sizes[e.value] && this.getLowestCost(sizes[e.value]);
    this.setState({
      selectedSize: e.value,
      sources,
      selectedSource: 0,
      isAdded: false,
      isExit: false
    });
  };

  getLowestCost = data => {
    return data.sources.sort(function(a, b) {
      return parseInt(a.discounted_price, 10) > parseInt(b.discounted_price, 10)
        ? 1
        : parseInt(b.discounted_price, 10) > parseInt(a.discounted_price, 10)
          ? -1
          : 0;
    });
  };

  getQuantityData = val => {
    let i;
    let arr = [];
    for (i = 0; i < val; i++) {
      arr.push(<option key={i}>{i + 1}</option>);
    }
    return arr;
  };

  handleAddToCart = () => {
    const { isAdded, isExit, cartData, sizes, ...restOfState } = this.state;
    const updateCart = cartData;
    let newData = restOfState;
    let isNewItem = true;

    updateCart &&
      updateCart.length > 0 &&
      updateCart.map((d, i) => {
        if (d.productData.product_id === newData.productData.product_id) {
          if (d.selectedSize === newData.selectedSize) {
            if (
              d.sources[d.selectedSource].id ===
              newData.sources[newData.selectedSource].id
            ) {
              isNewItem = false;
              return true;
            }
          }
        }
      });

    if (isNewItem) {
      updateCart.push(newData);
      localStorage.setItem("cartData", JSON.stringify(cartData));
      this.setState(
        {
          isAdded: true
        },
        () => this.props.updateCart()
      );
    } else {
      this.setState({
        isExit: true,
        isAdded: false
      });
    }
  };

  render() {
    const {
      productData,
      sizes,
      selectedSize,
      selectedSource,
      sources,
      quantity,
      isAdded,
      isExit
    } = this.state;
    const sourceData =
      sizes &&
      sizes[selectedSize] &&
      sizes[selectedSize].sources[selectedSource];
    return (
      <div>
        <div className="row product-container">
          <div className="col-md-5 product-img">
            <img
              src={productData && productData.image && productData.image[0]}
              alt="Product"
              height={400}
              width={350}
            />
          </div>
          <div className="col-md-7" style={{ paddingLeft: "40px" }}>
            <div className="product-title">{productData.title}</div>
            <div className="sub-title">
              {productData.sex} {productData.family} {productData.category}
            </div>
            <div className="product-title">
              ₹ {sourceData && sourceData.discounted_price}
            </div>
            <div className="description">{productData.description}</div>
            <div className="product-sizes">
              <div style={{ fontWeight: "600", fontSize: "16px" }}>Sizes</div>
              {Object.keys(sizes).length > 0 &&
                Object.keys(sizes).map((s, i) => (
                  <RadioButton
                    key={i}
                    label={s}
                    value={s}
                    width="40px"
                    checked={selectedSize === s}
                    onChange={this.handleSizeChange}
                  />
                ))}
            </div>
            <div className="dropdown product-source">
              <button
                className="btn btn-default dropdown-toggle"
                type="button"
                id="dropdownMenu1"
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="true"
              >
                Sources
                <span className="caret" />
              </button>
              <ul className="dropdown-menu" aria-labelledby="dropdownMenu1">
                {sources &&
                  sources.length > 0 &&
                  sources.map((source, i) => (
                    <li
                      key={i}
                      style={{ margin: "5px 10px", cursor: "pointer" }}
                    >
                      {selectedSource === i && (
                        <i
                          className="glyphicon glyphicon-ok-circle"
                          style={{ marginRight: "8px" }}
                        />
                      )}
                      <span
                        href="#"
                        onClick={() =>
                          this.setState({
                            selectedSource: i,
                            isAdded: false,
                            isExit: false
                          })
                        }
                      >
                        {source.host}
                        <span style={{ fontWeight: "600" }}>
                          {i === 0 ? " (Lowest price offered)" : ""}
                        </span>
                      </span>
                    </li>
                  ))}
              </ul>
            </div>
            <div className="source">
              <div style={{ fontSize: "18px" }}>
                Available: {sourceData && sourceData.isavailable ? "Yes" : "No"}
              </div>
              <div style={{ fontSize: "18px" }}>
                In Stock: {sourceData && sourceData.stock}
              </div>
            </div>
            {sourceData && sourceData.stock > 0 ? (
              <div className="form-group">
                <label style={{ fontSize: "18px" }}>Quantity &nbsp;</label>
                <select
                  className="form-control"
                  id="sel1"
                  value={quantity}
                  onChange={e =>
                    this.setState({
                      quantity: e.target.value,
                      isAdded: false
                    })
                  }
                >
                  {this.getQuantityData(sourceData ? sourceData.stock : 0)}
                </select>
                <span style={{ marginLeft: "15px" }}>
                  <button
                    style={{ padding: "4px 24px" }}
                    type="button"
                    className="btn btn-primary"
                    onClick={this.handleAddToCart}
                  >
                    + Add To Cart
                  </button>
                </span>
                {isAdded && (
                  <span style={{ marginLeft: "15px", color: "green" }}>
                    <i
                      className="glyphicon glyphicon-ok-circle"
                      style={{ marginRight: "8px" }}
                    />
                    Your Item is Added To Cart
                  </span>
                )}
                {isExit && (
                  <span style={{ marginLeft: "15px", color: "red" }}>
                    This Item is Already Added !!!
                  </span>
                )}
              </div>
            ) : (
              <label style={{ fontSize: "18px", color: "red" }}>
                Not Available
              </label>
            )}
          </div>
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

export default withRouter(connect(stateToProps, actionCreators)(TaskPage));
