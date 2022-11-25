import {configureStore} from "@reduxjs/toolkit";
import productsSlice from "./features/slices/productsSlice";
import cartSlice from "./features/slices/cartSlice";
import userSlice from "./features/slices/userSlice";

export const store = configureStore({
    reducer: {
        products: productsSlice,
        cart: cartSlice,
        user: userSlice,
    }
});