import React from 'react'
import "./Products.scss"

import { useNavigate } from "react-router-dom"

export default function Product({ productDetailsData }) {

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
                    </div>
                </div>
            </div>
        </div>
    )
}
