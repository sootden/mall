import React from 'react';
import {Navigate, useNavigate, createSearchParams} from "react-router-dom";
import {loginPostAsync, logout} from "../slices/loginSlice";
import {useRecoilState, useResetRecoilState} from "recoil";
import signinState from "../atoms/signinState";
import {loginPost} from "../api/memberApi";
import {removeCookie, setCookie} from "../util/cookieUtil";
import {cartState} from "../atoms/cartState";

const UseCustomLogin = () => {
    const navigate = useNavigate();

    //1) redux 사용
    // const loginState = useSelector(state => state.loginSlice);
    //2) recoil 사용
    const [loginState, setLoginState] = useRecoilState(signinState);
    const resetState = useResetRecoilState(signinState);
    const resetCartState = useResetRecoilState(cartState);

    const isLogin = loginState.email ? true : false;

    const doLogin = async (loginParam) => {
        //1)redux
        // const action = await dispatch(loginPostAsync(loginParam));
        // return action.payload;

        //2)recoil
        const result = await loginPost(loginParam);
        console.log(result);
        saveAsCookie(result);
        return result;
    }

    const saveAsCookie = (data) =>{
        setCookie("member", JSON.stringify(data), 1); //1일
        setLoginState(data);
    }

    const doLogout = () => {
        //redux
        // dispatch(logout());

        //recoil
        removeCookie('member');
        resetState();
        resetCartState();
    }

    const moveToPath = (path) => {
        navigate({pathname: path}, {replace: true})
    }

    const moveToLogin = () => {
        navigate({pathname: '/member/login'},{replace:true})
    }

    const moveToLoginReturn = () => {
        return <Navigate replace to="/member/login/"/>
    }

    const exceptionHandle = (ex) => {
        console.log("Exception--------------------");
        console.log(ex);
        const errorMsg = ex.response.data.error;
        const errorStr = createSearchParams({error: errorMsg}).toString();
        if(errorMsg === 'REQUIRE_LOGIN'){
            alert("로그인 해야만 합니다.");
            navigate({pathname: '/member/login', search: errorStr});
            return
        }
        if(ex.response.data.error === 'ERROR_ACCESSDENIED'){
            alert("해당 메뉴를 사용할 수 있는 권한이 없습니다.");
            navigate({pathname: '/member/login', search: errorStr});
            return
        }
    }

    return {loginState, isLogin, doLogin, doLogout, moveToPath, moveToLogin, moveToLoginReturn, exceptionHandle, saveAsCookie}
};

export default UseCustomLogin;