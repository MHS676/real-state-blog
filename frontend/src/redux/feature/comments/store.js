import { configureStore } from "@reduxjs/toolkit";
import { blogApi } from "../blogs/blogsApi";
import authApi from "../auth/authApi";
import authReducer from "../auth/authSlice"
import commentApi from "./commentApi";

const store = configureStore({
    reducer: {
        [blogApi.reducerPath]: blogApi.reducer,
        [authApi.reducerPath]: authApi.reducer,
        [commentApi.reducerPath]: commentApi.reducer,
        auth: authReducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(blogApi.middleware, authApi.middleware, commentApi.middleware),
});

export default store;
