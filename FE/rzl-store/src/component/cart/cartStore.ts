import { createSlice } from '@reduxjs/toolkit';
import { ProductModel } from '../product/productModel';

interface AppState {
    carts: ProductModel[];
  }
const initialState: AppState = {
    carts: [],
};
const cartSlice = createSlice({
  name: 'cart',
  initialState: initialState,
  reducers: {
    addCart: (state: AppState, action) => {
        const { name, category, price, qty, image } = action.payload;
        const checkIndex = state.carts.findIndex((item) => item.name === name)
        if (checkIndex !== -1) {//exists
            const newState = [ ...state.carts ];
            newState[checkIndex] = { name, category, price, image, qty: newState[checkIndex].qty + qty };
            state.carts = newState;
        }else{
            const newState = [ ...state.carts ];
            newState.push(action.payload);
            state.carts = newState;
        }
    },
    updateCart: (state, action) => {
        const { name, qty } = action.payload;
        const checkIndex = state.carts.findIndex((item) => item.name === name)
        if (checkIndex !== -1) {
            const newState = [...state.carts];
            newState[checkIndex].qty = qty;
            state.carts = newState;
        }
    },
    clearCart: (state) => {
        state.carts = []
    }
  }
});

export const { addCart, updateCart, clearCart } = cartSlice.actions;
export default cartSlice.reducer;