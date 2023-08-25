import React, { useEffect, useState } from 'react'
import "./AdminProducts.scss"
import { FaSpinner } from "react-icons/fa"
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function AdminProducts() {

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
        <div className='adminProductsSection'>
            <div className="adminProductsContent">
                <div className="adminProductsHeading">
                    <span className="heading">
                        Products List : ({productData.length} items)
                    </span>
                    <div className="adminProductsSubHeading">
                        <span className="subHeading">
                            Name
                        </span>
                        <span className="subHeading">
                            Stock
                        </span>
                        <span className="subHeading">
                            Price
                        </span>
                        <span className="subHeading">
                            Discounted Price
                        </span>
                    </div>
                </div>
                <div className="adminProductsListContainer">
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
                            <div className="adminProductsList" key={data.id} onClick={() => {
                                navigate(`/admin-single-product/${data.id}`)
                                window.scrollTo({ top: 0, behavior: 'smooth' })
                            }}>
                                <span className="section">
                                    {data.name}
                                </span>
                                <span className="section">
                                    {data.stock}
                                </span>
                                <span className="section">
                                    {data.price}
                                </span>
                                <span className="section">
                                    {data.price}
                                </span>
                            </div>
                        ))
                    }
                </div>
            </div>
        </div>
    )
}
