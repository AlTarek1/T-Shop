import { createSlice } from "@reduxjs/toolkit";
import { Zoom } from "react-toastify";

const initialState = {
  products: [
    {
      name: "",
      price: 0,
      description: "",
      brand: "",
      ratings: 0,
      imgUrl: "",
      id: "",
    },
  ],
};
const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    getProducts(state, action) {
      state.products = action.payload;
    },
  },
});
export const {
  getProducts,
 
} = productsSlice.actions;
export const selectProducts = (state) => state.products.products;
export default productsSlice.reducer;
