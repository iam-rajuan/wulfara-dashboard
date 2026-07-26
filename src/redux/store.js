import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./features/auth/authSlice";
import categoryReducer from "./features/categories/categorySlice";
import usersReducer from "./features/users/usersSlice";
import listingsReducer from "./features/listings/listingsSlice";
import rfqsReducer from "./features/rfqs/rfqsSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    categories: categoryReducer,
    users: usersReducer,
    listings: listingsReducer,
    rfqs: rfqsReducer,
  },
});
