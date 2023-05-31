import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { api, baseUrl } from '../api/api';

const initialUser = {
  userId: 0,
  authorized: true,
  username: 'SAnya',
  email: '',
  posts: [],
  followers: [],
  following: [],
  memberSince: '',
  profileImage: '',
  userToFind: '',
  isActivated: false,
};

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

export const logGebrish = createAsyncThunk(
  'UserSlice/getAuth',
  async function (_, { rejectWithValue }) {
    console.log('!@#_________$%');
  }
);

export const updNameAndImg = createAsyncThunk(
  'UserSlice/updNameAndImg',
  async function (updateData, { rejectWithValue }) {
    try {
      const response = await api.post(`${baseUrl}/updNameAndImg`, updateData);
      if (response.statusText !== 'OK') {
        throw new Error();
      }
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const follow = createAsyncThunk(
  'UserSlice/follow',
  async function (userToFollow, { rejectWithValue }) {
    try {
      const response = await api.post(`${baseUrl}/follow`, userToFollow);
      if (response.statusText !== 'OK') {
        throw new Error();
      }
      console.log(response.data);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const unfollow = createAsyncThunk(
  'UserSlice/follow',
  async function (userToUnfollow, { rejectWithValue }) {
    try {
      const response = await api.post(`${baseUrl}/unfollow`, userToUnfollow);
      if (response.statusText !== 'OK') {
        throw new Error();
      }
      console.log(response.data);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const UserSlice = createSlice({
  name: 'UserSlice',
  initialState: initialUser,
  reducers: {
    signOut(state) {
      localStorage.removeItem('accessToken');
      localStorage.removeItem('refreshToken');
      return initialUser;
    },
    loadUser(state, action) {
      const { username, email, id, profileImage, isActivated } =
        action.payload.user;
      const { accessToken, refreshToken } = action.payload;

      localStorage.setItem('accessToken', accessToken);
      localStorage.setItem('refreshToken', refreshToken);
      localStorage.setItem('userToFind', id);

      state.username = username;
      state.email = email;
      state.userId = id;
      state.profileImage = profileImage;
      state.authorized = true;
      state.userToFind = id;
      state.isActivated = isActivated;
    },
    changeUsername(state, action) {
      state.username = action.payload;
    },
    changeImage(state, action) {
      state.profileImage = action.payload;
    },
    selectUserToFind(state, action) {
      state.userToFind = action.payload;
    },
  },
  extraReducers: {
    // -------------------------------- Auth --------------------------- //
    [logGebrish.pending]: state => {
      state.status = 'pending';
      state.error = null;
    },
    [logGebrish.fulfilled]: (state, action) => {
      const {
        username,
        email,
        _id,
        isActivated,
        profileImage,
        memberSince,
        followers,
        following,
      } = action.payload;
      state.status = 'fulfilled';
      state.error = null;
      state.username = username;
      state.email = email;
      state.userId = _id;
      state.authorized = true;
      state.profileImage = profileImage;
      state.userToFind = _id;
      state.memberSince = memberSince;
      state.isActivated = isActivated;
      state.followers = followers;
      state.following = following;
      localStorage.setItem('userToFind', _id);
    },
    [logGebrish.rejected]: (state, action) => {
      state.status = 'rejected';
      state.error = action.payload;
    },
    // -------------------- Change username and Img ------------------ //
    [updNameAndImg.pending]: state => {
      state.status = 'pending';
      state.error = null;
    },
    [updNameAndImg.fulfilled]: (state, action) => {
      const { username, profileImage } = action.payload.user;
      const { accessToken, refreshToken } = action.payload;
      localStorage.setItem('accessToken', accessToken);
      localStorage.setItem('refreshToken', refreshToken);
      state.status = 'fulfilled';
      state.error = null;
      state.username = username;
      state.profileImage = profileImage;
    },
    [updNameAndImg.rejected]: (state, action) => {
      state.status = 'rejected';
      state.error = action.payload;
    },
    // -------------------------------- Follow / Unfollow ------------------------------- //
    [follow.pending]: state => {
      state.status = 'pending';
      state.error = null;
    },
    [follow.fulfilled]: (state, action) => {
      const { followers, following } = action.payload;
      state.status = 'fulfilled';
      state.error = null;
      state.followers = followers;
      state.following = following;
    },
    [follow.rejected]: (state, action) => {
      state.status = 'rejected';
      state.error = action.payload;
    },
    [unfollow.pending]: state => {
      state.status = 'pending';
      state.error = null;
    },
    [unfollow.fulfilled]: (state, action) => {
      const { followers, following } = action.payload;
      state.status = 'fulfilled';
      state.error = null;
      state.followers = followers;
      state.following = following;
    },
    [unfollow.rejected]: (state, action) => {
      state.status = 'rejected';
      state.error = action.payload;
    },
  },
});

export default UserSlice.reducer;

export const {
  selectUserToFind,
  signOut,
  changeUsername,
  changeImage,
  loadUser,
} = UserSlice.actions;
