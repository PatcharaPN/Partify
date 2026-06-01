import { configureStore } from "@reduxjs/toolkit";
import AuthReducer from "../store/slices/authSlice";
import jobReducer from "../store/slices/jobSlice";
import profileReducer from "../store/slices/profileSlice";
import ApplicationReducer from "../store/slices/applicationSlice";
import CompanyReducer from "../store/slices/companySlice";
import NotificationReducer from "../store/slices/notificationSlice";
import bookmarksReducer from "../store/slices/bookmarkSlice";
export const makeStore = () => {
  return configureStore({
    reducer: {
      AuthReducer,
      jobReducer,
      profileReducer,
      CompanyReducer,
      ApplicationReducer,
      NotificationReducer,
      bookmarks: bookmarksReducer,
    },
  });
};

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
