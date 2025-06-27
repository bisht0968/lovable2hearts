import React, { useContext, useEffect, useState } from 'react';
import { AppContext } from '../../utils/Context';
import { useNavigate } from 'react-router-dom';

import pic from "../../assets/cart-removebg-preview.png"

import "./Cart.scss"

import { FaTrash } from "react-icons/fa"
import { AiOutlineMinus, AiOutlinePlus } from "react-icons/ai"

export default function Cart({ mobileLayout }) {

    const navigate = useNavigate();

    const { cartProductData, handleCartProductQuantity, handleRemoveFromCart, handleClearCart, cartIconQuantity, setCartIconQuantity, userName, fetchUserDetials } = useContext(AppContext);

    const [cartTotal, setCartTotal] = useState(0);

    const [shippingPrice, setShippingPrice] = useState("FREE")
    const [subtotal, setSubtotal] = useState(0)

    useEffect(() => {

        let tempSubtotal = 0
        let tempShippingPrice = "FREE"

        cartProductData.forEach(data => {
            tempSubtotal += data.price * data.cartQuantity;
        });
        if (tempSubtotal > 99) {
            tempShippingPrice = 50;
            setShippingPrice(tempShippingPrice);
            setCartTotal(tempSubtotal + tempShippingPrice);
        } else {
            setShippingPrice(tempShippingPrice);
            setCartTotal(tempSubtotal);
        }
        setSubtotal(tempSubtotal);
    }, [cartProductData]);


    useEffect(() => {
        const quantity = cartProductData.length
        setCartIconQuantity(quantity)
    }, [cartProductData, setCartIconQuantity, cartIconQuantity])

    useEffect(() => {
        fetchUserDetials()
    }, [])

    return (
        <div className='cartSection'>
            <div className="cartContent">
                {localStorage.getItem('auth-token') ?
                    <div className='cartUserInformation'>
                        <div className="cartUserName">
                            <div className="cartUserNameHeading">
                                Welcome
                            </div>
                            {userName}
                        </div>
                    </div>
                    :
                    ""}

                {cartProductData.length > 0 ?
                    <>
                        <div className="cartHeadings">
                            <div className="item">
                                Products
                            </div>
                            <div className="price">
                                Price
                            </div>
                            <div className="quantity">
                                Quantity
                            </div>
                            {!mobileLayout &&
                                <>
                                    <div className="subtotal">
                                        Subtotal
                                    </div>
                                    <div className="remove">
                                        Remove
                                    </div>
                                </>
                            }
                        </div>
                        <div className="cartContainer">
                            {cartProductData.map((data, i) => {
                                return <>
                                    <div className="cartProductsContainer" key={i}>
                                        <div className="cartItem" onClick={() => {
                                            navigate(`/singleproduct/${data.id}`)
                                            window.scrollTo({ top: 0, behavior: 'smooth' })
                                        }}>
                                            <div className="cartProductImage"  >
                                                <img src={data?.image?.[0]?.url} alt="" />
                                            </div>
                                            <div className="cartProductName" >
                                                {data.name}
                                            </div>
                                        </div>
                                        <div className="cartPrice">
                                            {Intl.NumberFormat("en-IN", { style: "currency", currency: "INR", maximumFractionDigits: 0 }).format(data.price)}
                                        </div>
                                        <div className="cartQuantity">
                                            {!mobileLayout ? <div className="cartDecrementButton" onClick={() => handleCartProductQuantity("decrement", data)}>
                                                <AiOutlineMinus />
                                            </div> : <></>}
                                            <div className="cartValue">
                                                {data.cartQuantity}
                                            </div>
                                            {!mobileLayout ? <div className="cartIncrementButton" onClick={() => handleCartProductQuantity("increment", data)}>
                                                <AiOutlinePlus />
                                            </div> : <></>}
                                        </div>
                                        {!mobileLayout && <div className="cartSubtotal">
                                            {Intl.NumberFormat("en-IN", { style: "currency", currency: "INR", maximumFractionDigits: 0 }).format(data.price * data.cartQuantity)}
                                        </div>}
                                        <div className="cartRemove" >
                                            <FaTrash onClick={() => handleRemoveFromCart(data)} />
                                        </div>
                                    </div>
                                </>
                            })}
                        </div>

                        <div className="cartButtons">
                            <div className="continueShoppingButton" onClick={() => {
                                navigate('/products')
                                window.scrollTo({ top: 0, behavior: 'smooth' })
                            }}>
                                Continue Shopping
                            </div>
                            <div className="clearCartButton" onClick={handleClearCart}>
                                Clear Cart
                            </div>
                        </div>
                        <div className="cartBill">
                            <div className="cartBillHeadings">
                                <div className="billHeadingContainer">
                                    <div className="billText">
                                        Subtotal
                                    </div>
                                    <div className="billText">
                                        Shipping Charges
                                    </div>
                                </div>
                                <div className="billText totalAmount">
                                    Order Total
                                </div>
                            </div>
                            <div className="cartBillPrices">
                                <div className="billPricesContainer">
                                    <div className="billPrices">
                                        :   {Intl.NumberFormat("en-IN", { style: "currency", currency: "INR", maximumFractionDigits: 0 }).format(subtotal)}
                                    </div>
                                    <div className="billPrices">
                                        : {subtotal > 99 ? Intl.NumberFormat("en-IN", { style: "currency", currency: "INR", maximumFractionDigits: 0 }).format(Number(shippingPrice)) : shippingPrice}
                                    </div>
                                </div>
                                <div className="billPrices totalAmount">
                                    :   {Intl.NumberFormat("en-IN", { style: "currency", currency: "INR", maximumFractionDigits: 0 }).format(cartTotal)}
                                </div>
                            </div>
                        </div>
                        <div className="promoCode">
                            <p>If you have a promo code,Enter it here</p>
                            <form action="">
                                <input type="text" placeholder='promo code' />
                                <button>Submit</button>
                            </form>
                        </div>
                        <div className="checkout">
                            <button>
                                Proceed To Checkout
                            </button>
                        </div>
                    </>
                    :
                    <div className='cartNoItemContainer'>
                        <div className="cartNoItemHeading">
                            No Item Is Present in Your Cart!!
                        </div>
                        <div className="cartNoItemBackground">
                            <img src={pic} alt="" />
                        </div>
                        <div className="cartNoItemButton" onClick={() => {
                            navigate('/products')
                            window.scrollTo({ top: 0, behavior: 'smooth' })
                        }}>
                            Continue Shopping
                        </div>
                    </div>
                }
            </div>
        </div>
    );
}
