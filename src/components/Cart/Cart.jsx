import React, { useContext, useEffect, useState } from 'react';
import { AppContext } from '../../utils/Context';
import { useNavigate } from 'react-router-dom';

import "./Cart.scss"

import { FaTrash } from "react-icons/fa"
import { AiOutlineMinus, AiOutlinePlus } from "react-icons/ai"
import { useAuth0 } from '@auth0/auth0-react';

export default function Cart() {

    const { user, isAuthenticated } = useAuth0();

    const navigate = useNavigate();

    const { cartProductData, handleCartProductQuantity, handleRemoveFromCart, handleClearCart, cartIconQuantity, setCartIconQuantity } = useContext(AppContext);

    const [cartSubtotal, setCartSubtotal] = useState(0);
    const [cartTotal, setCartTotal] = useState(0);
    const [mobileLayout, setMobileLayout] = useState(false)

    useEffect(() => {
        let subtotal = 0;
        cartProductData.forEach(data => {
            subtotal += data.price * data.quantity;
        });
        setCartSubtotal(subtotal);
        const shippingPrice = 50;
        setCartTotal(subtotal + shippingPrice)
    }, [cartProductData]);

    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth < 768) {
                setMobileLayout(true);
            } else {
                setMobileLayout(false);
            }
        };
        handleResize();
        window.addEventListener("resize", handleResize);
        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, []);

    useEffect(() => {
        const quantity = cartProductData.length
        setCartIconQuantity(quantity)
    }, [cartProductData, setCartIconQuantity, cartIconQuantity])

    return (
        <div className='cartSection'>
            <div className="cartContent">
                {isAuthenticated ?
                    <div className='cartUserInformation'>
                        <div className="cartUserName">
                            <div className="cartUserNameHeading">
                                Welcome
                            </div>
                            {user.name}
                        </div>
                    </div>
                    :
                    ""}
                <div className="cartHeadings">
                    <div className="item">
                        ITEM
                    </div>
                    <div className="price">
                        PRICE
                    </div>
                    <div className="quantity">
                        QUANTITY
                    </div>
                    {!mobileLayout &&
                        <>
                            <div className="subtotal">
                                SUBTOTAL
                            </div>
                            <div className="remove">
                                REMOVE
                            </div>
                        </>
                    }
                </div>
                {cartProductData.length > 0 ?
                    <>
                        <div className="cartContainer">
                            {cartProductData.map((data, i) => {
                                return <>
                                    <div className="cartProductsContainer" key={i}>
                                        <div className="cartItem">

                                            <div className="cartProductImage" >
                                                <img src={data.image?.[0].url} alt="" />
                                            </div>
                                            <div className="cartProductName" >
                                                {data.name}
                                            </div>
                                        </div>
                                        <div className="cartPrice">
                                            {Intl.NumberFormat("en-IN", { style: "currency", currency: "INR", maximumFractionDigits: 0 }).format(data.price)}
                                        </div>
                                        <div className="cartQuantity">
                                            <div className="cartDecrementButton" onClick={() => handleCartProductQuantity("decrement", data)}>
                                                <AiOutlineMinus />
                                            </div>
                                            <div className="cartValue">
                                                {data.quantity}
                                            </div>
                                            <div className="cartIncrementButton" onClick={() => handleCartProductQuantity("increment", data)}>
                                                <AiOutlinePlus />
                                            </div>
                                        </div>
                                        {!mobileLayout && <div className="cartSubtotal">
                                            {Intl.NumberFormat("en-IN", { style: "currency", currency: "INR", maximumFractionDigits: 0 }).format(data.price * data.quantity)}
                                        </div>}
                                        <div className="cartRemove" onClick={() => handleRemoveFromCart(data)}>
                                            <FaTrash />
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
                                CONTINUE SHOPPING
                            </div>
                            <div className="clearCartButton" onClick={handleClearCart}>
                                CLEAR CART
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
                                        :   {Intl.NumberFormat("en-IN", { style: "currency", currency: "INR", maximumFractionDigits: 0 }).format(cartSubtotal)}
                                    </div>
                                    <div className="billPrices">
                                        : 123
                                    </div>
                                </div>
                                <div className="billPrices totalAmount">
                                    :   {Intl.NumberFormat("en-IN", { style: "currency", currency: "INR", maximumFractionDigits: 0 }).format(cartTotal)}
                                </div>
                            </div>
                        </div>
                    </>
                    :
                    <div className='cartNoItemContainer'>
                        <div className="cartNoItemHeading">
                            No Item Is Present in Your Cart!!
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
