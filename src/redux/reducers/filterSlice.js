import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  filteredProducts: [],
};

const filterSlice = createSlice({
  name: "fiter",
  initialState,
  reducers: {
    SetItemsTOFilter(state, action) {
      state.filteredProducts = action.payload;
    },
    SORT(state, action) {
      const { products, sort, price, brand } = action.payload;

      let tempProducts = [];
      if (sort === "Latest") {
        tempProducts = products;
      } else if (sort === "Lowest") {
        tempProducts = products.slice().sort((a, b) => a.price - b.price);
      } else if (sort === "Highest") {
        tempProducts = products.slice().sort((a, b) => b.price - a.price);
      } else if (sort === "a-z") {
        tempProducts = products
          .slice()
          .sort((a, b) => a.name.localeCompare(b.name));
      } else if (sort === "z-a") {
        tempProducts = products
          .slice()
          .sort((a, b) => b.name.localeCompare(a.name));
      }
      tempProducts = tempProducts.filter((e) => e.price <= price);
      if (brand === "All")
        tempProducts = tempProducts.filter((e) => e.brand !== brand);
      else tempProducts = tempProducts.filter((e) => e.brand === brand);
      console.log(tempProducts);

      state.filteredProducts = tempProducts;
    },
  },
});
export const { SetItemsTOFilter, SORT } = filterSlice.actions;

export const selectFilteredProducts = (state) => state.fiter.filteredProducts;

export default filterSlice.reducer;
