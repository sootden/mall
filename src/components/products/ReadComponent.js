import React, {useEffect, useState} from 'react';
import {API_SERVER_HOST} from "../../api/todoApi";
import useCustomMove from "../../hooks/useCustomMove";
import FetchingModal from "../common/FetchingModal";
import {getOne} from "../../api/productsApi";
import useCustomCart from "../../hooks/useCustomCart";
import useCustomLogin from "../../hooks/useCustomLogin";
import {useQuery} from "@tanstack/react-query";

const initState = {
    pno: 0,
    pname:'',
    pdesc:'',
    price:0,
    uploadFileNames:[]
}

const host = API_SERVER_HOST;
const ReadComponent = ({pno}) => {
    // const [product, setProduct] = useState(initState);
    const {moveToList, moveToModify} = useCustomMove();
    // const [fetching, setFetching] = useState(false);
    const {changeCart, cartItems} = useCustomCart();
    const {loginState} = useCustomLogin();
/*
    useQuery param : 쿼리 키, 쿼리 함수, 옵션
        staleTime : 얼마의 시간이 지나면 이 데이터는 더 이상 fresh하지 않은가?
        *기본적으로 현재 브라우저가 활성화되면 다시 서버를 호출하는(retetch)옵션이 지정되어 있음 (retetchOnWindowFocus)
    useQuery 결과 : 서버 호출의 상태나 데이터 등 반환 , 원하는 결과 속성들을 사용하면됨
        1. isFetching : 서버와 비동기 통신 중인지 여부
        2. data : 서버에서 처리된 결과 데이터
        3. error
        4. isError
        5. isSuccess
 */
    const {isFetching, data} = useQuery(
        ['products', pno],
        () => getOne(pno),
        {
            staleTime: 1000 * 10 * 60,
            retry: 1
        }
    )

    // useEffect(()=>{
    //     setFetching(true);
    //     getOne(pno).then(data => {
    //         setProduct(data);
    //         setFetching(false);
    //     })
    // },[pno])
    //
    const handleClickAddCart = ()=>{
        let qty = 1;

        const addedItem = cartItems.filter(item => item.pno === parseInt(pno))[0];

        if(addedItem){
            if(window.confirm("이미 추가된 상품입니다. 추가하시겠습니까?") === false){
                return
            }
            qty = addedItem.qty + 1;
        }
        changeCart({email: loginState.email, pno: pno, qty: qty});
    }
    const product = data || initState;

    return (
        <div className="border-2 border-sky-200 mt-10 m-2 p-4">
            {isFetching? <FetchingModal/> : <></>}
            <div className="flex justify-center mt-10">
                <div className="relative mb-4 flex w-full flex-wrap items-stretch">
                    <div className="w-1/5 p-6 text-right font-bold">PNO</div>
                    <div className="w-4/5 p-6 rounded-r border border-solid shadow-md">{product.pno}</div>
                </div>
            </div>
            <div className="flex justify-center">
                <div className="relative mb-4 flex w-full flex-wrap items-stretch">
                    <div className="w-1/5 p-6 text-right font-bold">PNO</div>
                    <div className="w-4/5 p-6 rounded-r border border-solid shadow-md">
                        {product.pno}
                    </div>
                </div>
            </div>
            <div className="flex justify-center">
                <div className="relative mb-4 flex w-full flex-wrap items-stretch">
                    <div className="w-1/5 p-6 text-right font-bold">PNAME</div>
                        <div className="w-4/5 p-6 rounded-r border border-solid shadow-md">
                            {product.pname}
                        </div>
                    </div>
                </div>
            <div className="flex justify-center">
                <div className="relative mb-4 flex w-full flex-wrap items-stretch">
                    <div className="w-1/5 p-6 text-right font-bold">Price</div>
                    <div className="w-4/5 p-6 rounded-r border border-solid shadow-md">
                        {product.price}
                    </div>
                </div>
            </div>
            <div className="flex justify-center">
                <div className="relative mb-4 flex w-full flex-wrap items-stretch">
                    <div className="w-1/5 p-6 text-right font-bold">PDESC</div>
                    <div className="w-4/5 p-6 rounded-r border border-solid shadow-md">
                        {product.pdesc}
                    </div>
                </div>
            </div>
            <div className="w-full justify-center flex flex-col m-auto items-center">
                {
                    product.uploadFileNames.map((imgFile, i) =>
                        <img alt="product" key={i} className="p-4 w-1/2" src={`${host}/api/products/view/${imgFile}`}/>
                    )
                }
            </div>
            <div className="flex justify-end p-4">
                <button type="button" className="inline-block rounded p-4 m-2 text-xl w-32 text-white bg-red-500" onClick={()=>moveToModify(pno)}>Modify</button>
                <button type="button" className="rounded p-4 m-2 text-xl w-32 text-white bg-blue-500" onClick={moveToList}>List</button>
                <button type="button" className="inline-block rounded p-4 m-2 text-xl w-32 text-white bg-red-500" onClick={handleClickAddCart}>Add Cart</button>
            </div>
        </div>
    );
};

export default ReadComponent;