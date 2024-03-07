import { createReducer } from "@reduxjs/toolkit";

const initialState = {
  cart: localStorage.getItem("cartItems")
    ? JSON.parse(localStorage.getItem("cartItems"))
    : [],

};

export const cartReducer = createReducer(initialState, (builder) => {
  builder
    // Reducer for adding items to the cart
    .addCase("addToCart",  (state, action) => {
      const item = action.payload;
      const isItemExist = state.cart?.find((i) => i?._id === item?._id);
      if (isItemExist) {
        state.cart = state.cart.map((i) => (i?._id === isItemExist?._id ? item : i));
      } else {
        state.cart?.push(item);
      }
      localStorage.setItem("cartItems", JSON.stringify(state.cart));
    })
    // Reducer for removing items from the cart
    .addCase("removeFromCart", (state, action) => {
      const itemId = action.payload;
      state.cart = state?.cart?.filter((i) => i._id !== itemId);
      localStorage.setItem("cartItems", JSON.stringify(state.cart));
    });
});

// Export action creators
export const addToCart = (data) => ({
  type: "addToCart",
  payload: data,
});

export const removeFromCart = (itemId) => ({
    type: "removeFromCart",
  payload: itemId,
});
