/* import { PRODUCT_ACTION_TYPE } from "../actionType/productActionType";
 */
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    products: [],
    cart: [],
};

/* const productReducer = (state = initialState, action) => {
    switch(action.type) {
        case PRODUCT_ACTION_TYPE.SET_PRODUCT:
            return {
                ...state,
                products: action.payload,
            };
        case "ADD_TO_CART":
            return {
                ...state,
                cart: [...state.cart, action.payload],
            };
        default:
            return state;
    }
};
 */
const productSlice = createSlice({
  name: 'product',
  initialState: initialState,
  reducers: {
    setProduct: (state, action) => {
      state.products = action.payload;
    }
  }
});

export const { setProduct } = productSlice.actions;
export default productSlice.reducer;