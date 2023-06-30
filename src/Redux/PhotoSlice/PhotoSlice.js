import { createSlice } from "@reduxjs/toolkit";
import {
  getAllAlbums,
  getAllUsers,
  getComments,
  getPhotos,
} from "../extraReducers";

const initialState = {
  loading: false,
  error: "",
  AllAlbums: [],
  comments: [],
  checkedAlbums: [],
  users: [],
  favoriteAlbumsId: JSON.parse(localStorage.getItem("favoriteAlbumsId")) || [],
  userAddedAlbums: [],
  userPhotos: [],
};
const persistedPost = JSON.parse(localStorage.getItem("photo"));
const Albumslice = createSlice({
  name: "Albums",
  initialState,
  reducers: {
    updateAlbums: (state, action) => {
      const { updatedPostId, updatedBody } = action.payload;
      const postToUpdate = state.AllAlbums.find(
        (post) => post.id === updatedPostId
      );
      if (postToUpdate) {
        // Update the post with the updatedData
        Object.assign(postToUpdate, updatedBody);
      }
    },
    deleteAlbums: (state, { payload }) => {
      const filteredAlbums = state.AllAlbums.filter(
        (post) => post.id !== payload
      );
      state.AllAlbums = filteredAlbums;
    },
    putCheckedAlbums: (state, { payload }) => {
      state.checkedAlbums.push(payload);
    },
    deletecheckedAlbums: (state, { payload }) => {
      if (payload == "all") {
        state.checkedAlbums = [];
        return;
      }
      const filteredAlbums = state.checkedAlbums.filter((id) => id !== payload);
      return { ...state, checkedAlbums: filteredAlbums };
    },
    toggleToFavorites: (state, { payload }) => {
      if (state.favoriteAlbumsId.includes(payload)) {
        state.favoriteAlbumsId = state.favoriteAlbumsId.filter(
          (id) => id !== payload
        );
        localStorage.setItem(
          "favoriteAlbumsId",
          JSON.stringify(state.favoriteAlbumsId)
        );
        return;
      }

      state.favoriteAlbumsId.push(payload);
      localStorage.setItem(
        "favoriteAlbumsId",
        JSON.stringify(state.favoriteAlbumsId)
      );
    },
    addUserToAlbums: (state, { payload }) => {
      const addUserToPost = state.AllAlbums?.map((post) => {
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
        state.userAddedAlbums = persistedPost;
      }
      state.userAddedAlbums = addUserToPost;
    },
    addPost: (state, { payload }) => {
      state.userAddedAlbums = [payload, ...state.userAddedAlbums];
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getAllAlbums.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(getAllAlbums.fulfilled, (state, action) => {
      state.loading = false;
      if (persistedPost?.length > 0) {
        state.AllAlbums = persistedPost;
        return;
      }
      state.AllAlbums = action.payload;
    });
    builder.addCase(getAllAlbums.rejected, (state, action) => {
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
    builder.addCase(getPhotos.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(getPhotos.fulfilled, (state, action) => {
      state.loading = false;
      state.userPhotos = action.payload;
    });
    builder.addCase(getPhotos.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });
  },
});
export const {
  putCheckedAlbums,
  deleteCheckedAlbums,
  updateAlbums,
  deleteAlbums,
  toggleToFavorites,
  addUserToAlbums,
} = Albumslice.actions;
export default Albumslice.reducer;
