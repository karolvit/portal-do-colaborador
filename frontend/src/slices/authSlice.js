import { createSlice, createAction, createAsyncThunk } from "@reduxjs/toolkit";
import authService from "../services/auhService";

const user = JSON.parse(localStorage.getItem("user"))

const initialState = {
    user: user ? user : null,
    error: false,
    success: false,
    loading: false,
}

export const register = createAsyncThunk("auth/register",
async(user, thunkApi)=>{
    const data = await authService.register(user)

    if(data.errors){
        return thunkApi.rejectWithValue(data.errors[0])
    }
    return data
})

export const logout = createAsyncThunk("auth/logout", async () => {
    await authService.logout();
})


export const login = createAsyncThunk("/login",
async(user, thunkApi)=>{
    const data = await authService.login(user)

    if(data.errors){
        return thunkApi.rejectWithValue(data.errors[0])
    }
    return data
})

export const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        reset: (state) => {
            state.loading = false;
            state.error = false;
            state.success = false;
        },
    },
    extraReducers:(builder) =>{
        builder
    .addCase(login.pending, (state) =>{
        state.loading = true;
        state.error = false
    }).addCase(login.fulfilled, (state, action) =>{
        state.loading = false
        state.success = true
        state.error = null
        state.user = action.payload
    })
    .addCase(login.rejected, (state, action) =>{
        state.loading = false;
        state.error = action.payload;
        state.user = null
    })
    .addCase(logout.fulfilled, (state, action) =>{
        state.loading = false
        state.success = true
        state.error = null
        state.user = null
    })

    }
})

export const { reset } = authSlice.actions;


export default authSlice.reducer;