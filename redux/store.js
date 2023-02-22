import { configureStore } from "@reduxjs/toolkit";
import counterReducer from './counter';
import authReducer from './authentication';
import themeReducer from "./theme";

export default configureStore({
    reducer:{
        counter:counterReducer,
        auth:authReducer,
        theme:themeReducer
    }
})