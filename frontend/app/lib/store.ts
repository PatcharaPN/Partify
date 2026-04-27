import { configureStore } from "@reduxjs/toolkit";
import AuthReducer from "../store/slices/authSlice";
import jobReducer from "../store/slices/jobSlice";
import profileReducer from "../store/slices/profileSlice";
import ApplicationReducer from "../store/slices/applicationSlice";
export const makeStore = () => {
  return configureStore({
    reducer: { AuthReducer, jobReducer, profileReducer, ApplicationReducer },
  });
};

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
