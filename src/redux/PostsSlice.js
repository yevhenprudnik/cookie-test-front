import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { api, baseUrl } from "../api/api";

export const getPosts = createAsyncThunk(
  'PostsSlice/getPosts',
  async function(id='', {rejectWithValue}){
    try {
      let query = ''
      if (id) {
        query = '?id=' + id
      }
      const response = await api.get(`${baseUrl}/getPosts${query}`)
      if (response.statusText !== 'OK') {
        throw new Error();
      }
      return response.data
    } catch (error) {
      return rejectWithValue(error.message)
    }
  }
)
export const createPost = createAsyncThunk(
  'PostsSlice/createPost',
  async function(postData, {rejectWithValue}){
    try {
      const response = await api.post(`${baseUrl}/createPost`, postData);
      if (response.statusText !== 'OK') {
        throw new Error();
      }
      return response.data
    } catch (error) {
      return rejectWithValue(error.message)
    }
  }
)
export const likePost = createAsyncThunk(
  'PostsSlice/likePost',
  async function(postData, {rejectWithValue}){
    try {
      const response = await api.post(`${baseUrl}/likePost`,postData);
      if (response.statusText !== 'OK') {
        throw new Error();
      }
      return response.data
    } catch (error) {
      return rejectWithValue(error.message)
    }
  }
)

export const addComment = createAsyncThunk(
  'PostsSlice/addComment',
  async function(commentData, {rejectWithValue}){
    try {
      const response = await api.post(`${baseUrl}/addComment`, commentData)
      if (response.statusText !== 'OK') {
        throw new Error();
      }
      return response.data
    } catch (error) {
      return rejectWithValue(error.message)
    }
  }
)

export const editPost = createAsyncThunk(
  'PostsSlice/editPost',
  async function(postData, {rejectWithValue}){
    try {
      const response = await api.post(`${baseUrl}/editPost`, postData)
      if (response.statusText !== 'OK') {
        throw new Error();
      }
      return response.data
    } catch (error) {
      return rejectWithValue(error.message)
    }
  }
)

const PostsSlice = createSlice({
  name: 'PostsSlice',
  initialState: {
    posts: [],
    recommendedPosts: [],
    status: null,
    error: null, 
    newText: '',
    arr : []
  }, 
  extraReducers: {
    //----------------------- Get POSTS -----------------------------//
    [getPosts.pending]: (state) => {
      state.status = 'pending'
      state.error = null
    },
    [ getPosts.fulfilled ]: (state, action) => {
      state.status = 'fulfilled'
      state.error = null
      state.posts = action.payload
    },
    [ getPosts.rejected ]: (state, action) => {
      state.status = 'rejected'
      state.error = action.payload
    },
    //----------------------- Add POSTS -----------------------------//
    [createPost.pending]: (state) => {
      state.status = 'pending'
      state.error = null
    },
    [ createPost.fulfilled ]: (state, action) => {
      state.status = 'fulfilled'
      state.error = null
    },
    [ createPost.rejected ]: (state, action) => {
      state.status = 'rejected'
      state.error = action.payload
    },
    //----------------------- Like POSTS -----------------------------//
    [likePost.pending]: (state) => {
      state.status = 'pending'
      state.error = null
    },
    [ likePost.fulfilled ]: (state, action) => {
      state.status = 'fulfilled'
      state.error = null
    },
    [ likePost.rejected ]: (state, action) => {
      state.status = 'rejected'
      state.error = action.payload
    },
     //----------------------- ADD COMMENT -----------------------------//
    [addComment.pending]: (state) => {
      state.status = 'pending'
      state.error = null
    },
    [ addComment.fulfilled ]: (state, action) => {
      state.status = 'fulfilled'
      state.error = null
    },
    [ addComment.rejected ]: (state, action) => {
      state.status = 'rejected'
      state.error = action.payload
    },
    //----------------------- EDIT POST -----------------------------//
    [editPost.pending]: (state) => {
      state.status = 'pending'
      state.error = null
    },
    [ editPost.fulfilled ]: (state, action) => {
      state.status = 'fulfilled'
      state.newText = action.payload.text
      state.error = null
    },
    [ editPost.rejected ]: (state, action) => {
      state.status = 'rejected'
      state.error = action.payload
    }
  },
})

export default PostsSlice.reducer
//export const {  } = PostsSlice.actions