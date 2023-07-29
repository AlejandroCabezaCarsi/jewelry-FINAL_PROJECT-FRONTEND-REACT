import { createSlice } from "@reduxjs/toolkit";

export const productsSlice = createSlice({
  name: "products",
  initialState: {
    cart: []
  },
  reducers: {
    addToCart: (state, action) => {
      let { payload } = action;
      console.log(payload)

      state.cart.push(payload.product);

    },
    removeFromCart: (state, action) => {
      let { payload } = action;
      state.cart = state.cart.filter((product) => product.id !== payload.productId);
    }
  },
});

export const cartData = (state) => state.cart;
export default productsSlice.reducer;
export const { addToCart, removeFromCart} = userSlice.actions;
