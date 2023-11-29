import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import userService from "../services/useSerices";

const initialState = {
    user:{},
    error: false,
    success: false,
    loading: false,
    message: null
}

export const perfil = createAsyncThunk(
    "dado",
    async(user, thunkAPI) => {
        const token = thunkAPI.getState().auth.user.token
        const data = await userService.perfil(user, token)
        return data
    }
)

export const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
      resetMessage: (state) => {
        state.message = null;
      },
    },
    extraReducers:(builder) =>{
        builder
        .addCase(perfil.pending, (state) =>{
            state.loading = true;
            state.error = false
        }).addCase(perfil.fulfilled, (state, action) =>{
            state.loading = false
            state.success = true
            state.error = null
            state.user = action.payload
        })
    }
})

export const { resetMessage } = userSlice.actions;
export default userSlice.reducer;