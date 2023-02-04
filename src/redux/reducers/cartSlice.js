import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cart: localStorage.getItem("cart")
    ? JSON.parse(localStorage.getItem("cart"))
    : [],
  total: 0,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    AddElement(state, action) {
      const inCart = state.cart.findIndex((e) => e.id === action.payload.id);
      if (inCart >= 0) {
        state.cart[inCart].amount++;
      } else state.cart.push({ amount: 1, ...action.payload });
    },
    RemoveElement(state, action) {
      const inCart = state.cart.findIndex((e) => e.id === action.payload.id);
      if (inCart >= 0) {
        if (state.cart[inCart].amount === 1)
          state.cart = state.cart.filter(
            (element) => element.id !== action.payload.id
          );
        else state.cart[inCart].amount -= 1;
      }
    },
    Total(state, action) {
      let subtotal = 0;
      state.cart.forEach((e) => {
        subtotal += e.price * e.amount;
      });
      state.total = subtotal;
    },
    SaveCart(state, action) {
      localStorage.setItem("cart", JSON.stringify(state.cart));
    },
  },
});
export const { AddElement, RemoveElement, Total, SaveCart } = cartSlice.actions;

export const selectCart = (state) => state.cart.cart;
export const selectTotal = (state) => state.cart.total;

export default cartSlice.reducer;
