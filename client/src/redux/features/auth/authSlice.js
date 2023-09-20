import { createSlice } from "@reduxjs/toolkit";
import { getCurrentUser, userLogin, userRegister } from "./authActions";

const token = localStorage.getItem("token")
  ? localStorage.getItem("token")
  : null;

const initialState = {
  loading: false,
  user: null,
  token,
  error: null,
  menuCollapsed: window.innerWidth<768? -1:0 ,
};

const authSlice = createSlice({
  name: "auth",
  initialState: initialState,
  reducers: {
    toggleMenuCollapsed: (state) => {
      state.menuCollapsed = state.menuCollapsed+1;
      if(window.innerWidth<768){
      if(state.menuCollapsed==0){
        state.menuCollapsed=1;
      }
    else if(state.menuCollapsed==2){
      state.menuCollapsed=-1;
    }
  }
      else{
        if(state.menuCollapsed>1){
          state.menuCollapsed=0;
        }
      }
      //console.log(state.menuCollapsed);
    },
  },
  extraReducers: (builder) => {
    // login user
    builder.addCase(userLogin.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(userLogin.fulfilled, (state, { payload }) => {
      state.loading = false;
      state.user = payload.user;
      state.token = payload.token;
    });
    builder.addCase(userLogin.rejected, (state, { payload }) => {
      state.loading = false;
      state.error = payload;
    });
    // REGISTER user
    builder.addCase(userRegister.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(userRegister.fulfilled, (state, { payload }) => {
      state.loading = false;
      state.user = payload.user;
    });
    builder.addCase(userRegister.rejected, (state, { payload }) => {
      state.loading = false;
      state.error = payload;
    });
    // CURRENT user
    builder.addCase(getCurrentUser.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(getCurrentUser.fulfilled, (state, { payload }) => {
      state.loading = false;
      state.user = payload.user;
    });
    builder.addCase(getCurrentUser.rejected, (state, { payload }) => {
      state.loading = false;
      state.error = payload;
    });
  },
});

export const { toggleMenuCollapsed } = authSlice.actions;
export default authSlice;
