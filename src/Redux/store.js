import { configureStore } from "@reduxjs/toolkit";
import PostSlice from "./PostSlice/PostSlice";
import PhotoSlice from "./PhotoSlice/PhotoSlice";

const store = configureStore({
  reducer: {
    PostSlice: PostSlice,
    PhotoSlice: PhotoSlice,
  },
});

export default store;
