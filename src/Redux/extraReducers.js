import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { GetAllAlbums, GetAllPhotos, GetAllPosts, GetAllUsers } from "./Api";

//Posts API
export const getAllPosts = createAsyncThunk("get/allposts", async () => {
  return axios({
    method: "GET",
    url: GetAllPosts,
  }).then((res) => res.data);
});

export const getSomePosts = createAsyncThunk("get/someposts", async (query) => {
  return axios({
    method: "GET",
    url: `${GetAllPosts}?_page=1&_limit=${query}`,
  }).then((res) => res.data);
});

export const getComments = createAsyncThunk("get/comments", async (id) => {
  return axios({
    method: "GET",
    url: `${GetAllPosts}/${id}/comments`,
  }).then((res) => res.data);
});
// Users

export const getAllUsers = createAsyncThunk("get/allusers", async () => {
  return axios({
    method: "GET",
    url: GetAllUsers,
  }).then((res) => res.data);
});

// albums
export const getAllAlbums = createAsyncThunk("get/allAblums", async () => {
  return axios({
    method: "GET",
    url: GetAllAlbums,
  }).then((res) => res.data);
});

//photos
export const getPhotos = createAsyncThunk("get/photos", async (id) => {
  return axios({
    method: "GET",
    url: `${GetAllPhotos}?albumId=${id}`,
  }).then((res) => res.data);
});
