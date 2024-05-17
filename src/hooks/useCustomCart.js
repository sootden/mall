import React, {useEffect} from 'react';
import {getCartItemsAsync, postChangeCartAsync} from "../slices/cartSlice";
import {useRecoilState} from "recoil";
import {useMutation, useQuery, useQueryClient} from "@tanstack/react-query";
import {getCartItems, postChangeCart} from "../api/cartApi";
import {cartState} from "../atoms/cartState";

const UseCustomCart = () => {
    //redux
    // const cartItems = useSelector(state => state.cartSlice);
    //recoil
    const [cartItems, setCartItems] = useRecoilState(cartState);

    //redux
    // const dispatch = useDispatch();
    // const refreshCart = () => {
    //     dispatch(getCartItemsAsync());
    // }
    // const changeCart = (param) => {
    //     dispatch(postChangeCartAsync(param));
    // }

    const queryClient = useQueryClient();

    const query = useQuery(["cart"], getCartItems, {staleTime:1000*60*60})//1hour
    useEffect(()=>{
        if(query.isSuccess || changeMutation.isSuccess){
            queryClient.invalidateQueries("cart");
            setCartItems(query.data);
        }
    },[query.isSuccess, query.data])

    const changeMutation =
        useMutation((param) => postChangeCart(param), {
            onSuccess: (result) => {
                setCartItems(result);
            }})
    const changeCart = (param) => {
        changeMutation.mutate(param);
    }

    return {cartItems, changeCart}
};

export default UseCustomCart;