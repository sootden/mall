// store.js : Store객체 생성하기 위한 함수 구성
import {configureStore} from '@reduxjs/toolkit';
import loginSlice from "./slices/loginSlice";

export default configureStore({
    reducer: {
        "loginSlice": loginSlice
    }
})