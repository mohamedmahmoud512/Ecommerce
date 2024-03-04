import React, { useContext } from "react";
import MainSlider from "../mainslider/MainSlider";
import CateSlider from "../CateSlider/CateSlider";
import Products from "../Products/Products";
import { getCart } from "../cart/Cart";
import { context } from "../context/Context";
import { getWhish } from "../whishList/WhishList";

export default function Home() {
    let cart = useContext(context);
    getCart(cart);
    getWhish(cart);
    return (
        <>
            <MainSlider />
            <CateSlider/>
            <Products/>
        </>
    )
}
