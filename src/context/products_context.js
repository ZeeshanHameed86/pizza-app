import React, { useContext, useEffect, useReducer } from "react";
import reducer from "../reducer/products_reducer";

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

const url = `https://food-serverless.netlify.app/api/products`;
const sUrl = `https://food-serverless.netlify.app/api/products?id=`;

const ProductsContext = React.createContext();

const initialState = {
  products: [],
  filter_products: [],
  single_product: [],
  category: "All",
  isShowModal: false,
  Modal: {
    name: "",
    image: "",
    priceS: "",
    priceM: "",
    priceL: "",
  },
  cart: JSON.parse(localStorage.getItem("cartItems")),
  option_selected: "",
  total: "",
  modal_error: "",
  quantity: 1,
};

export const ProductsProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const fetchProducts = async () => {
    try {
      dispatch({ type: FETCH_START });
      const data = await fetch(url);
      const response = await data.json();
      dispatch({ type: FETCH_SUCCESS, payload: response });
    } catch (error) {
      console.log(error);
    }
  };

  const fetchSingleProduct = async (id) => {
    try {
      const data = await fetch(`${sUrl}${id}`);
      const response = await data.json();
      dispatch({ type: SINGLE_FETCH_START, payload: response });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  useEffect(() => {
    dispatch({ type: FILTER_PRODUCTS });
  }, [state.category]);

  const setCategory = (e) => {
    const name = e.target.name;
    const value = e.target.textContent;
    dispatch({ type: SET_CATEGORY, payload: { name, value } });
  };

  const showModal = () => {
    dispatch({
      type: SHOW_MODAL,
    });
  };
  const hideModal = () => {
    dispatch({ type: HIDE_MODAL });
  };

  const updateCart = (name, price, quantity, history) => {
    let data = { name, price, quantity };
    if (price === "" || price === "select") {
      dispatch({ type: MODAL_ERROR });
      return;
    }
    let allEntries = JSON.parse(localStorage.getItem("cartItems")) || [];
    allEntries.push(data);
    localStorage.setItem("cartItems", JSON.stringify(allEntries));
    history.push("/products");
    hideModal();
    dispatch({ type: UPDATE_CART, payload: allEntries });
  };

  const clearCart = () => {
    dispatch({ type: CLEAR_CART });
  };

  const updateSelect = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    dispatch({ type: UPDATE_SELECT, payload: { name, value } });
  };

  return (
    <ProductsContext.Provider
      value={{
        ...state,
        setCategory,
        showModal,
        hideModal,
        fetchSingleProduct,
        updateCart,
        clearCart,
        updateSelect,
      }}
    >
      {children}
    </ProductsContext.Provider>
  );
};

export const useProductsContext = () => {
  return useContext(ProductsContext);
};
