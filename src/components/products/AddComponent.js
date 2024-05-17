import React, {useRef, useState} from 'react';
import ResultModal from "../common/ResultModal";
import {postAdd} from "../../api/productsApi";
import FetchingModal from "../common/FetchingModal";
import useCustomMove from "../../hooks/useCustomMove";
import {useMutation, useQueryClient} from "@tanstack/react-query";

const initState = {
    pname: '',
    pdesc: '',
    price: 0,
    files: []
}

const AddComponent = () => {
    const uploadRef = useRef();
    const {moveToList} = useCustomMove();
    const [product, setProduct] = useState({...initState});

    const handleChangeProduct = (e) => {
        product[e.target.name] = e.target.value;
        setProduct({...product});
    }
/*
    useMutation : useQuery()가 select라면, useMutation()은 insert/update/delete 작업
        *param : 서버를 호출하는 함수 전달
 */
    const addMutation = useMutation((product) => postAdd(product));

    const handleClickAdd = (e) => {
        const files = uploadRef.current.files;
        const formData = new FormData();

        for(let i=0; i< files.length; i++){
            formData.append("files", files[i]);
        }
        //other data
        formData.append("pname", product.pname);
        formData.append("pdesc", product.pdesc);
        formData.append("price", product.price);

        console.log(formData);

        addMutation.mutate(formData);
        // setFetching(true);
        // postAdd(formData).then(data => {
        //     setFetching(false);
        //     setResult(data.result);
        // });
    }

    const queryClient = useQueryClient();
    const closeModal = () => {
        // setResult(null);
        //ListComponent의 staleTime으로 인해 저장된 상품이 리스트에 표출이 안되는 경우를 위해 쿼리 데이터 무효화 실행
        queryClient.invalidateQueries("products/list");
        moveToList({page: 1});
    }

    return (
        <div className="border-2 border-sky-200 mt-10 m-2 p-4">
            { addMutation.isLoading ? <FetchingModal/>: <></> }
            {
                addMutation.isSuccess ? <ResultModal title={'Add Result'} content={`Add Success ${addMutation.data.result}`} callbackFn={closeModal}/> : <></>
            }
            <div className="flex justify-center">
                <div className="relative mb-4 flex w-full flex-wrap items-stretch">
                    <div className="w-1/5 p-6 text-right font-bold">Product Name</div>
                    <input className="w-4/5 p-6 rounded-r border border-solid border-neutral-300 shadow-md" name="pname" type={'text'} value={product.pname} onChange={handleChangeProduct}></input>
                </div>
            </div>
            <div className="flex justify-center">
                <div className="relative mb-4 flex w-full flex-wrap items-stretch">
                    <div className="w-1/5 p-6 text-right font-bold">Desc</div>
                    <textarea className="w-4/5 p-6 rounded-r border border-solid border-neutral-300 shadow-md resize-y" name="pdesc" rows="4" onChange={handleChangeProduct} value={product.pdesc}>{product.pdesc}</textarea>
                </div>
            </div>
            <div className="flex justify-center">
                <div className="relative mb-4 flex w-full flex-wrap items-stretch">
                    <div className="w-1/5 p-6 text-right font-bold">Price</div>
                    <input className="w-4/5 p-6 rounded-r border border-solid border-neutral-300 shadow-md" name="price" type={'number'} value={product.price} onChange={handleChangeProduct}></input>
                </div>
            </div>
            <div className="flex justify-center">
                <div className="relative mb-4 flex w-full flex-wrap items-stretch">
                    <div className="w-1/5 p-6 text-right font-bold">Files</div>
                    <input ref={uploadRef} className="w-4/5 p-6 rounded-r border border-solid border-neutral-300 shadow-md" type={'file'} multiple={true}></input>
                </div>
            </div>
            <div className="flex justify-end">
                <div className="releative mb-4 flex p-4 flex-wrap items-stretch">
                    <button type="button" className="rounded p-4 w-36 bg-blue-500 text-xl text-white" onClick={handleClickAdd}>
                        ADD
                    </button>
                </div>
            </div>
        </div>
    );
};

export default AddComponent;