import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    user : null
}

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        SET_USER : (state, action)=>{
            state.user = action.payload
        },
        LOGOUT : (state)=>{
            state.user = null
            localStorage.removeItem("user")
        }
    }
});

export const { SET_USER, LOGOUT } = userSlice.actions;
export const selectUser = (state)=>{
    console.log(state);
    return state?.user?.user;
};
export default userSlice.reducer