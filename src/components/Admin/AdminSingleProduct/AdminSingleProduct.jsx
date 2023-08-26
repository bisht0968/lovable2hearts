import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import "./AdminSingleProduct.scss"

export default function AdminSingleProduct() {

    const productId = useParams({});

    const API = `http://127.0.0.1:8000/products_api/products/${productId.id}`

    const [singleProductDetails, setSingleProductDetails] = useState([]);


    const getSingleProduct = async (url) => {
        const res = await axios.get(url)
        setSingleProductDetails(res.data)
    }

    useEffect(() => {
        getSingleProduct(API)
    }, [API])

    return (
        <div className='adminSingleProductSection'>
            <div className="adminSingleProductContent">
                <div className="adminSingleProductContainer">
                    <div className="adminSingleProdcutHeadings">
                        <div className="heading">ID</div>
                        <div className="heading">Name</div>
                        <div className="heading">Quantity</div>
                        <div className="heading">Price</div>
                        <div className="heading">Discounted Price</div>
                        <div className="heading">Description</div>
                    </div>
                    <div className="adminSingleProductDetails">
                        <div className="section">{singleProductDetails.id}</div>
                        <div className="section">{singleProductDetails.name}</div>
                        <div className="section">{singleProductDetails.stock}</div>
                        <div className="section">{singleProductDetails.price}</div>
                        <div className="section">{singleProductDetails.price}</div>
                        <div className="section"> {singleProductDetails.description}</div>
                    </div>
                </div>
            </div>
        </div>
    )
}
