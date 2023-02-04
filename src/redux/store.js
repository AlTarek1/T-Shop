import { configureStore, combineReducers } from "@reduxjs/toolkit";
import loggedReducer from "./reducers/isLoggedIn";
import productsReducer from "./reducers/productsReducer";
import cartReducer from "./reducers/cartSlice";
import filterReducer from "./reducers/filterSlice";
const rootReducer = combineReducers({
  auth: loggedReducer,
  products: productsReducer,
  cart: cartReducer,
  fiter: filterReducer,
});

export const store = configureStore({
  reducer: rootReducer,
});
