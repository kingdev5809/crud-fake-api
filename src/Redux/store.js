import { configureStore } from "@reduxjs/toolkit";
import PostSlice from "./PostSlice/PostSlice";
import PhotoSlice from "./PhotoSlice/PhotoSlice";
import TodoSlice from "./TodoSlice/TodoSlice";

const store = configureStore({
  reducer: {
    PostSlice: PostSlice,
    PhotoSlice: PhotoSlice,
    TodoSlice: TodoSlice,
  },
});

export default store;
