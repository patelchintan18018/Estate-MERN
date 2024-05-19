import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    currentUser : null,
    error : null,
    loading : false,
}

const userSlice = createSlice({
    name : 'user',
    initialState,
    reducers :{
        loginStart :(state)=>{
            state.loading = true,
            state.error = null
        },
        loginSuccess:(state,action)=>{
            state.currentUser = action.payload,
            state.loading = false,
            state.error = null
        },
        loginFailure :(state,action)=>{
            state.error = action.payload,
            state.loading = false
        },
        updateUserStart : (state)=>{
            state.loading =true,
            state.error = null
        },
        updateUserSuccess : (state,action) => {
            state.currentUser = action.payload,
            state.loading = false,
            state.error = null
        },
        updateUserFailure :(state,action)=>{
            state.error = action.payload,
            state.loading = false
        },
        deleteUserStart :(state)=>{
            state.loading = true,
            state.error = null
        },
        deleteUserSuccess : (state) => {
            state.currentUser = null,
            state.loading = false,
            state.error = null
        },
        deleteUserFailure : (state,action)=>{
            state.error = action.payload,
            state.loading =false
        },
        signoutUserStart :(state)=>{
            state.loading = true,
            state.error = null
        },
        signoutUserSuccess : (state) => {
            state.currentUser = null,
            state.loading = false,
            state.error = null
        },
        signoutUserFailure : (state,action)=>{
            state.error = action.payload,
            state.loading =false
        }
    }
});


export const {loginFailure,loginStart,loginSuccess, updateUserFailure,updateUserStart,updateUserSuccess, deleteUserFailure,deleteUserStart,deleteUserSuccess,signoutUserFailure,signoutUserStart,signoutUserSuccess} = userSlice.actions;
export default userSlice.reducer;