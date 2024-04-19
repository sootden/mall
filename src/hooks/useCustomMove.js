import React, {useState} from 'react';
import { createSearchParams, useNavigate, useSearchParams } from 'react-router-dom'
const getNum = (param,defaultValue) => {
    if(!param){
        return defaultValue;
    }
    return parseInt(param);
}

const UseCustomMove = () => {
    const navigate = useNavigate();

    const [refresh, setRefresh] = useState(false);
    const [queryParams] = useSearchParams();

    const page = getNum(queryParams.get('page'), 1);
    const size = getNum(queryParams.get('size'), 10);

    const queryDefault = createSearchParams({page, size}).toString() //새로 추가
    const moveToList = (pageParam) => {
        let queryStr = '';

        if(pageParam){
            const pageNum = getNum(pageParam.page, 1);
            const sizeNum = getNum(pageParam.size, 10);

            queryStr = createSearchParams({page:pageNum, size:sizeNum}).toString();
        }else{
            queryStr = queryDefault;
        }

        setRefresh(!refresh);
        navigate({pathname: `../list`, search:queryStr})
    }

    const moveToModify = (tno) => {
        console.log(queryDefault);
        navigate({pathname:`../modify/${tno}`, search:queryDefault})
    }

    const moveToRead = (tno) => {
        console.log(queryDefault);
        navigate({
            pathname: `../read/${tno}`, search: queryDefault
        });
    }

    return {moveToList,moveToModify,moveToRead, page, size, refresh};
};

export default UseCustomMove;