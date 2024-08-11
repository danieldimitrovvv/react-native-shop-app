import { configureStore } from "@reduxjs/toolkit";
import shoppingCartSliceReducer from "./slices/shopping-cart/shoppingCartSlice";
import settingsSliceReducer from "./slices/settings/settingsSlice";
import searchSliceReducer from "./slices/search/searchSlice";

export const store = configureStore({
  reducer: {
    shoppingCart: shoppingCartSliceReducer,
    settings: settingsSliceReducer,
    searchData: searchSliceReducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
