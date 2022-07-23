import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { api, baseUrl } from "../api/api"; 

const initialUser = {
  userId: 0,
  authorized: false,
  username: '',
  email: '',
  posts: [],
  friends: [], 
  memberSince: '',
  profileImage: '',
  userToFind: '',
  isActivated: false
}

// const DevUser = {
//   userId: 1,
//   authorized: true,
//   username: 'Anthony',
//   email: 'anthony@gmail.com',
//   posts: [],
//   friends: [], 
//   memberSince: new Date().toDateString(),
//   profileImage: 'http://tachyons.io/img/avatar_1.jpg'
// }

export const getAuth = createAsyncThunk(
  'UserSlice/getAuth',
  async function(_, {rejectWithValue}){
    try {
      const response = await api.get(`${baseUrl}/auth`);
      if (response.statusText !== 'OK') {
        throw new Error();
      }
      return response.data
    } catch (error) {
      return rejectWithValue(error.message)
    }
  }
)

export const updNameAndImg = createAsyncThunk(
  'PostsSlice/updNameAndImg',
  async function(updateData, {rejectWithValue}){
    try {
      const response = await api.post(`${baseUrl}/updNameAndImg`, updateData)
      if (response.statusText !== 'OK') {
        throw new Error();
      }
      console.log(response.data)
      return response.data
    } catch (error) {
      return rejectWithValue(error.message)
    }
  }
)

const UserSlice = createSlice({
  name: 'UserSlice',
  initialState: initialUser, 
  reducers: {
    signOut(state){
      localStorage.removeItem('accessToken')
      localStorage.removeItem('refreshToken')
      return initialUser
    },
    loadUser(state, action){
      const {username, email, id, profileImage, isActivated} = action.payload.user
      const { accessToken, refreshToken} = action.payload
      localStorage.setItem('accessToken',accessToken)
      localStorage.setItem('refreshToken',refreshToken)
      localStorage.setItem('userToFind', id)
      state.username = username
      state.email = email
      state.userId = id
      state.profileImage = profileImage
      state.authorized = true
      state.userToFind = id
      state.isActivated = isActivated
    },
    changeUsername(state, action){
      state.username = action.payload
    },
    changeImage(state, action){
      state.profileImage = action.payload
    },
    selectUserToFind(state, action){
      state.userToFind = action.payload
    }
  },
  extraReducers: {
    [getAuth.pending]: (state) => {
      state.status = 'pending'
      state.error = null
    },
    [ getAuth.fulfilled ]: (state, action) => {
      const { username, email, id, isActivated, profileImage, memberSince } = action.payload
      state.status = 'fulfilled'
      state.error = null
      state.username = username
      state.email = email
      state.userId = id
      state.authorized = true
      state.profileImage = profileImage
      state.userToFind = id
      state.memberSince = memberSince
      state.isActivated = isActivated
      localStorage.setItem('userToFind', id)
    },
    [ getAuth.rejected ]: (state, action) => {
      state.status = 'rejected'
      state.error = action.payload
    },
    [updNameAndImg.pending]: (state) => {
      state.status = 'pending'
      state.error = null
    },
    [ updNameAndImg.fulfilled ]: (state, action) => {
      const { username, profileImage } = action.payload.user
      const { accessToken, refreshToken } = action.payload
      localStorage.setItem('accessToken',accessToken)
      localStorage.setItem('refreshToken',refreshToken)
      state.status = 'fulfilled'
      state.error = null
      state.username = username
      state.profileImage = profileImage
    },
    [ updNameAndImg.rejected ]: (state, action) => {
      state.status = 'rejected'
      state.error = action.payload
    }
  }
})

export default UserSlice.reducer


export const { selectUserToFind, signOut, changeUsername, changeImage, loadUser } = UserSlice.actions