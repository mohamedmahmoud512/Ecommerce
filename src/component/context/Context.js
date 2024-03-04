import React, { createContext, useState } from 'react'
export let context = createContext(0);
export default function Context({ children }) {
    let [Loading, setLoading] = useState(false);
    let [cartLoud, setCartLoud] = useState(false);
    let [cartLoudAll, setCartLoudAll] = useState(false);
    let [cart, setCart] = useState("0");
    let [whishList, setWishList] = useState("0");
    return <context.Provider value={{
        Loading,
        setLoading,
        cartLoud,
        setCartLoud,
        cart,
        setCart,
        cartLoudAll,
        setCartLoudAll,
        whishList,
        setWishList,
    }}>
        {children}
    </context.Provider>
}