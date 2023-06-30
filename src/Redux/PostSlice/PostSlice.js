import { createSlice } from "@reduxjs/toolkit";
import { getAllPosts, getAllUsers, getComments } from "../extraReducers";

const initialState = {
  loading: false,
  error: "",
  AllPosts: [],
  comments: [],
  checkedPosts: [],
  users: [],
  favoritePostsId: JSON.parse(localStorage.getItem("favoritePostsId")) || [],
  userAddedPosts: [],
};
const persistedPost = JSON.parse(localStorage.getItem("post"));
const PostSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {
    updatePost: (state, action) => {
      const { updatedPostId, updatedBody } = action.payload;
      const postToUpdate = state.AllPosts.find(
        (post) => post.id === updatedPostId
      );
      if (postToUpdate) {
        // Update the post with the updatedData
        Object.assign(postToUpdate, updatedBody);
      }
    },
    deletePost: (state, { payload }) => {
      const filteredPosts = state.AllPosts.filter(
        (post) => post.id !== payload
      );
      state.AllPosts = filteredPosts;
    },
    putCheckedPosts: (state, { payload }) => {
      state.checkedPosts.push(payload);
    },
    deleteCheckedPosts: (state, { payload }) => {
      if (payload == "all") {
        state.checkedPosts = [];
        return;
      }
      const filteredPosts = state.checkedPosts.filter((id) => id !== payload);
      return { ...state, checkedPosts: filteredPosts };
    },
    toggleToFavorites: (state, { payload }) => {
      if (state.favoritePostsId.includes(payload)) {
        state.favoritePostsId = state.favoritePostsId.filter(
          (id) => id !== payload
        );
        localStorage.setItem(
          "favoritePostsId",
          JSON.stringify(state.favoritePostsId)
        );
        return;
      }

      state.favoritePostsId.push(payload);
      localStorage.setItem(
        "favoritePostsId",
        JSON.stringify(state.favoritePostsId)
      );
    },
    addUserToPosts: (state, { payload }) => {
      const addUserToPost = state.AllPosts?.map((post) => {
        const filtered = state.users?.filter((user) => user.id === post.userId);
        if (post.author) {
          return post;
        }
        if (post.userId === filtered[0]?.id) {
          return { ...post, author: filtered[0].name };
        } else {
          return post;
        }
      });
      if (persistedPost?.length > 0) {
        state.userAddedPosts = persistedPost;
      }
      state.userAddedPosts = addUserToPost;
    },
    addPost: (state, { payload }) => {
      state.userAddedPosts = [payload, ...state.userAddedPosts];
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getAllPosts.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(getAllPosts.fulfilled, (state, action) => {
      state.loading = false;
      if (persistedPost?.length > 0) {
        state.AllPosts = persistedPost;
        return;
      }
      state.AllPosts = action.payload;
    });
    builder.addCase(getAllPosts.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });

    builder.addCase(getComments.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(getComments.fulfilled, (state, action) => {
      state.loading = false;
      state.comments = action.payload;
    });
    builder.addCase(getComments.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });

    builder.addCase(getAllUsers.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(getAllUsers.fulfilled, (state, action) => {
      state.loading = false;
      state.users = action.payload;
    });
    builder.addCase(getAllUsers.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });
  },
});
export const {
  putCheckedPosts,
  deleteCheckedPosts,
  updatePost,
  deletePost,
  toggleToFavorites,
  addUserToPosts,addPost
} = PostSlice.actions;
export default PostSlice.reducer;
