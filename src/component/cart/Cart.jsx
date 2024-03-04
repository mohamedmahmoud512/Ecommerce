import axios from 'axios';
import React, { useContext, useState } from 'react'
import { context } from '../context/Context';
import { addToCart, notification } from '../Products/Products';
let disable = false;
export function getCart(cart) {
    axios.get("https://ecommerce.routemisr.com/api/v1/cart", { headers: { token: localStorage.getItem("token") } })
        .then(({ data }) => {
            cart.setCart(data.numOfCartItems);
        })
        .catch(err => console.error(err));
}
export default function Cart() {
    let [cartProduct, setCartProduct] = useState([]);
    let [cartProductID, setCartProductID] = useState(0);
    let [totalCartPrice, setTotalCartPrice] = useState(0);
    let cart = useContext(context);
    getCart(cart);
    getCartProduct();
    function getCartProduct() {
        axios.get("https://ecommerce.routemisr.com/api/v1/cart", { headers: { token: localStorage.getItem("token") } })
            .then(({ data }) => {
                cart.setLoading(false);
                setCartProduct(data.data.products);
                setCartProductID(data.data._id);
                setTotalCartPrice(data.data.totalCartPrice);
            })
            .catch(err => console.error(err));
    }
    function DeleteItem(productID) {
        cart?.setCartLoud(true)
        // console.log(productID);
        axios.delete(`https://ecommerce.routemisr.com/api/v1/cart/${productID}`, { headers: { token: localStorage.getItem('token') } })
            .then(({ data }) => {
                cart?.setCartLoud(false)
                setCartProduct(data.data.products);
                notification(`${data.status} Delete`)
            }).catch((err) => {
                console.log(err);
                cart?.setCartLoud(false)
            })
    }
    function DeleteItemAllItems() {
        cart.setCartLoudAll(true)
        axios.delete(`https://ecommerce.routemisr.com/api/v1/cart`, { headers: { token: localStorage.getItem('token') } })
            .then((data) => {
                cart.setCartLoudAll(false)
                setCartProduct([]);
                setTotalCartPrice("0")
                cart.setCart("0");
                notification(`success Delete All`)
            }).catch((err) => {
                console.log(err);
                cart.setCartLoudAll(false)
            })
    }
    function updateQuantity(productID, productQty) {
        axios.put(`https://ecommerce.routemisr.com/api/v1/cart/${productID}`, { "count": productQty }, { headers: { token: localStorage.getItem('token') } })
            .then((data) => {
                // console.log(data.data.status);
                notification(data.data.status);
                cart.setCart(data.numOfCartItems);
            }).catch((e) => console.log(e));
    }
    function order(cartProductID) {
        axios.post(`https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cartProductID}`, {
            "shippingAddress": {
                "details": "details",
                "phone": "01010700999",
                "city": "Cairo"
            }
        }, { headers: { token: localStorage.getItem("token") } })
            .then(response => {
                window.open(response.data.session.url, "_blank");
                // console.log(response.data.session.url);
            })
            .catch(error => { console.log('Error', error) })

    }
    return (
        <div className='container my-3 bg-main-light'>
            <h1>Shop Cart : </h1>
            <p className='text-main mt-3 fs-3'>total Cart Price : {totalCartPrice} EGP</p>
            {totalCartPrice == 0 ? "" : <button className='btn bg-main text-white border-success rounded-2 w-50' onClick={() => { DeleteItemAllItems() }} >{cart.cartLoudAll ? <i class="fa-solid fa-spinner fa-spin"></i> : `Delete All Items`} </button>}
            <div className="row">
                {cartProduct.map((product) => {
                    return <>
                        <div className="col-md-12 d-flex justify-content-between align-items-center">
                            <img src={product.product.imageCover} alt="cart product" className='cart-img my-4 rounded-3' />
                            <div className="container">
                                <p className='text-dark text-start'>Name : {product.product.title}</p>
                                <p className='text-dark text-start'>Sub category :{product.product.subcategory[0].name}</p>
                                <p className='text-main mt-1 text-start'>price : {product.price} EGP</p>
                                <button className='btn bg-main text-white border-success rounded-2 w-50' onClick={() => { DeleteItem(product.product._id) }} >{cart.cartLoud ? <i class="fa-solid fa-spinner fa-spin"></i> : `Delete`}</button>
                            </div>
                            <div className="d-flex justify-content-between align-items-center">
                                <button className='btn btn-outline-success' disabled={product.count <= 1} onClick={() => { updateQuantity(product.product._id, product.count - 1) }}>-</button>
                                <p className='mx-3 mt-3'>{product.count}</p>
                                <button className='btn btn-outline-success ' onClick={() => { updateQuantity(product.product._id, product.count + 1) }} >+</button>
                            </div>
                        </div >
                        <hr />
                    </>
                })}
                <div className="col-md-3">
                    {totalCartPrice == 0 ? "" : <button onClick={() => { order(cartProductID) }} className='w-100 btn bg-main text-white '>Place Order Now! <i class="fa-solid fa-cart-shopping"></i> </button>}
                </div>
            </div>
        </div >
    )
}