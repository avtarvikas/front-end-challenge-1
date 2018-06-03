import { setInitialProductValue, setCartData } from "./taskData";

export const getProductData = (data) => dispatch => {
  dispatch(setInitialProductValue(data))
}

export const updateCart = () => dispatch => {
  dispatch(setCartData())
}