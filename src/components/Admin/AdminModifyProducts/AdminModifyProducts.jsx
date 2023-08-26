import axios from 'axios';
import "./AdminModifyProducts.scss"
import React, { useEffect, useState } from 'react'
import { FaSpinner } from 'react-icons/fa';
import { BiCustomize } from 'react-icons/bi';
import { useNavigate } from 'react-router-dom';

export default function AdminModifyProducts() {

    const [productData, setProductData] = useState([]);

    const navigate = useNavigate();

    const API = "http://127.0.0.1:8000/products_api/products/"

    const getProductsData = async (url) => {
        try {
            const res = await axios.get(url)
            setProductData(res.data)
        } catch (error) {
            console.error('Error fetching products:', error);
        }
    }

    useEffect(() => {
        getProductsData(API)
    }, [])

    return (
        <div className='adminModifyProductsSection'>
            <div className="adminModifyProductsContent">
                <div className="adminModifyproductsContainer">
                    <div className="adminModifyHeadings">
                        <div className="heading">Name</div>
                        <div className="heading">Price</div>
                        <div className="heading">Stock</div>
                        <div className="heading">Modify</div>
                    </div>
                    {productData.length === 0 ?
                        <div className="buffering">
                            <div className="bufferIcon">
                                <FaSpinner />
                            </div>
                            <div className="bufferText">
                                Loading...
                            </div>
                        </div> :
                        productData.map(data => (
                            <div className="adminModifyList" key={data.id} >
                                <span className="section">
                                    {data.name}
                                </span>
                                <span className="section">
                                    {data.price}
                                </span>
                                <span className="section">
                                    {data.stock}
                                </span>
                                <span className="section" onClick={() => {
                                    navigate(`/admin-single-product-modify/${data.id}`)
                                    window.scrollTo({ top: 0, behavior: 'smooth' })
                                }}>
                                    <BiCustomize />
                                </span>
                            </div>
                        ))
                    }
                </div>
            </div>
        </div>
    )
}
