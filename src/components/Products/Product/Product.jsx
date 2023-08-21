import React from 'react'
import "./Product.scss"

import { useNavigate } from "react-router-dom"

export default function Product({ productDetailsData, gridLayout }) {

    const navigate = useNavigate();

    return (
        <div className='productSection'>
            <div className="productContent">
                <div className="prodcutContainer" onClick={() => {
                    navigate(`/singleproduct/${productDetailsData.id}`)
                    window.scrollTo({ top: 0, behavior: 'smooth' })
                }}>
                    <div className="productImage">
                        <img src={productDetailsData.image} alt="" />
                    </div>
                    <div className="productDetails">
                        <div className="productName">
                            {productDetailsData.name}
                        </div>
                        <div className="productPrice">
                            {Intl.NumberFormat("en-IN", {
                                style: "currency",
                                currency: "INR",
                                maximumFractionDigits: 2
                            }).format(productDetailsData.price / 100)}
                        </div>
                        {!gridLayout &&
                            <>
                                <div className='productDescription'>
                                    {productDetailsData.description.split(' ').length > 18 ? productDetailsData.description.split(' ').slice(0, 18).join(" ") + "..." : productDetailsData.description}
                                </div>
                                <div className="productLinkButton">
                                    Shop Now
                                </div>
                            </>
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}
