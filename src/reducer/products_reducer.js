import {
  FETCH_START,
  FETCH_SUCCESS,
  SET_CATEGORY,
  FILTER_PRODUCTS,
  SHOW_MODAL,
  HIDE_MODAL,
  SINGLE_FETCH_START,
  UPDATE_CART,
  UPDATE_SELECT,
  MODAL_ERROR,
  CLEAR_CART,
} from "../actions";

const products_reducer = (state, action) => {
  if (action.type === FETCH_START) {
    console.log("FETCH_START");
  }
  if (action.type === FETCH_SUCCESS) {
    return {
      ...state,
      products: action.payload,
      filter_products: action.payload,
    };
  }
  if (action.type === SET_CATEGORY) {
    const { name, value } = action.payload;
    return { ...state, [name]: value };
  }
  if (action.type === FILTER_PRODUCTS) {
    if (state.category === "All") {
      return { ...state, filter_products: state.products };
    }
    const { products, category } = state;
    let tempProducts = [...products];
    tempProducts = tempProducts.filter((product) => {
      const { category: c } = product;
      return c === category;
    });
    return { ...state, filter_products: tempProducts };
  }
  if (action.type === SHOW_MODAL) {
    return {
      ...state,
      isShowModal: true,
      modal_error: "",
      quantity: 1,
      option_selected: "",
    };
  }
  if (action.type === HIDE_MODAL) {
    return { ...state, isShowModal: false };
  }
  if (action.type === SINGLE_FETCH_START) {
    const { fields } = action.payload;
    return { ...state, single_product: fields };
  }
  if (action.type === UPDATE_CART) {
    return {
      ...state,
      cart: action.payload,
    };
  }
  if (action.type === UPDATE_SELECT) {
    const name = action.payload.name;
    const value = action.payload.value;
    return { ...state, [name]: value };
  }
  if (action.type === MODAL_ERROR) {
    return { ...state, modal_error: "Please select portion/quantity" };
  }
  if (action.type === CLEAR_CART) {
    return { ...state, cart: [] };
  }
  return { ...state };
};

export default products_reducer;
