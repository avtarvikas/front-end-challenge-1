export const SET_CART_DATA = "SET_CART_DATA";
export const SET_PRODUCT_DATA = "SET_PRODUCT_DATA";

const initialState = {
  originalData: {},
  productData: {},
  sizes: {},
  cartData: []
};

const taskData = (state = initialState, action) => {
  const { type } = action;
  switch (type) {
    case SET_CART_DATA:
      const data = localStorage.getItem("cartData");
      return {
        ...state,
        cartData: data === null ? [] : JSON.parse(data)
      };
    case SET_PRODUCT_DATA:
      const { sizes, ...restOfData } = action.data.product;
      return {
        ...state,
        sizes: sizes,
        originalData: action.data,
        productData: restOfData
      };
    default:
      return state;
  }
};

export default taskData;

/** Action Creators */
export const setCartData = () => ({
  type: SET_CART_DATA
});

export const setInitialProductValue = data => ({
  type: SET_PRODUCT_DATA,
  data
});
