import {atom} from "recoil";
import {getCookie} from "../util/cookieUtil";

const initState = {
    email: '',
    nickname: '',
    social: false,
    accessToken:'',
    refreshToken: ''
}
const loadMemberCookie = ()=>{
    const memberInfo = getCookie("member");
    if(memberInfo && memberInfo.nickname){
        memberInfo.nickname = decodeURIComponent(memberInfo.nickname);
    }
    return memberInfo;
}
/*
    Atoms : 리코일을 통해 보관하고 싶은 데이터 , 리코일은 여러개의 Atoms를 만들고 컴포넌트들은 원하는 상태를 구독하여 사용하는 방식 (리덕스는 애플리케이션당 하나의 상태 유지)
    useRecoilState : useState의 확장판 , 상태 유지의 범위가 애플리케이션 전체 , 읽고 쓰는 용도
    useRecoilValue : 읽기 전용
    useSetRecoilState : 쓰기 전용
    useResetRecoilState : 초기화 용도
 */
const signinState = atom({
    key: 'signinState',
    default: loadMemberCookie() || initState
})

export default signinState