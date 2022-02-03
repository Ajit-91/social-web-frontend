import {configureStore} from "@reduxjs/toolkit"
import userSlice from "./Slices/userSlice"

export default configureStore({
    reducer : {
        user : userSlice
    }
})