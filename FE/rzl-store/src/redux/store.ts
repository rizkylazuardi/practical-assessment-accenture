/* import { createStore } from 'redux';
import { createWrapper } from 'next-redux-wrapper';
import rootReducer from './reducer/rootReducers';

const store = createStore(rootReducer);

const makeStore = () => store;

const wrapper = createWrapper(makeStore);
export default wrapper; */

import { configureStore } from '@reduxjs/toolkit';
import { Persistor, persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // This uses localStorage by default
import productReducer from '../component/product/productStore';
import cartReducer from '../component/cart/cartStore';

const persistConfig = {
  key: 'root',
  storage, // You can use 'localStorage' or 'sessionStorage'
};

// Persist the user slice reducer
const persistedProductReducer = persistReducer(persistConfig, productReducer);
const persistedCartReducer = persistReducer(persistConfig, cartReducer);

const store = configureStore({
  reducer: {
    product: persistedProductReducer,
    cart: persistedCartReducer
  }
});
let persistor: Persistor;
if (typeof window !== 'undefined') {
  persistor = persistStore(store);
}
export { persistor };

export default store;