import {configureStore} from "@reduxjs/toolkit"
import userSlice from "./Slices/userSlice"
import loadingSlice from "./Slices/loadingSlice"

export default configureStore({
    reducer : {
        user : userSlice,
        loading : loadingSlice
    }
})