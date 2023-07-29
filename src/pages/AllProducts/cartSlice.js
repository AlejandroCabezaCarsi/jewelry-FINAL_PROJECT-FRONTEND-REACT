import { createSlice } from "@reduxjs/toolkit";

export const cartSlice = createSlice({
    name: "cart",
    initialState: [],
    reducers: {
        
        addToCart: (state, action) => {
            const { id, name, image, price } = action.payload;
            const existingProduct = state.find((item) => item.id === id);
            if (existingProduct) {
              existingProduct.quantity++;
            } else {
              state.push({ id, name, image, price, quantity: 1 });
            }
          },
          removeFromCart: (state, action) => {
            const productId = action.payload;
            return state.filter((item) => item.id !== productId);
          },
          increaseQuantity: (state, action) => {
            const productId = action.payload;
            const product = state.find((item) => item.id === productId);
            if (product) {
              product.quantity++;
            }
          },
          decreaseQuantity: (state, action) => {
            const productId = action.payload;
            const product = state.find((item) => item.id === productId);
            if (product) {
              if (product.quantity > 1) {
                product.quantity--;
              } else {
                return state.filter((item) => item.id !== productId);
              }
            }
          },
    },
});

export const cartInfo = (state) => state.cart;
export default cartSlice.reducer;
export const {addToCart,removeFromCart,increaseQuantity,decreaseQuantity,} = cartSlice.actions;
