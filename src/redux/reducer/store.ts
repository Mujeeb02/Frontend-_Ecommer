import { configureStore } from "@reduxjs/toolkit";
import { userApi } from "../api/userApi";
import { userReducer } from "./userReducer";
import { productApi } from "../api/productApi";
import { cartReducer } from "./cartReducer";
import { orderApi } from "../api/orderApi";
import { dashboardApi } from "../api/dashboardApi";

export const server = "https://mern-ecommerce-server-2.onrender.com"
export const store = configureStore({
    reducer: {
        [userApi.reducerPath]: userApi.reducer,
        [productApi.reducerPath]: productApi.reducer,
        [orderApi.reducerPath]: orderApi.reducer,
        [dashboardApi.reducerPath]:dashboardApi.reducer,
        [userReducer.name]:userReducer.reducer,
        [cartReducer.name]:cartReducer.reducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware()
    .concat(userApi.middleware)
    .concat(productApi.middleware)
    .concat(orderApi.middleware)
    .concat(dashboardApi.middleware)
})

export type RootState = ReturnType<typeof store.getState>;