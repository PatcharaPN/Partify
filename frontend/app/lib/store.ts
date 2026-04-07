import { configureStore } from "@reduxjs/toolkit";
import AuthReducer from "../store/slices/authSlice";
import jobReducer from "../store/slices/jobSlice";
export const makeStore = () => {
  return configureStore({
    reducer: { AuthReducer, jobReducer },
  });
};

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
