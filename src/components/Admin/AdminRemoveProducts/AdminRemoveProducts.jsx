import React, { useEffect, useState } from 'react'
import "./AdminRemoveProducts.scss"

import { FaSpinner, FaTrash } from "react-icons/fa"
import axios from 'axios';

export default function AdminRemoveProducts() {

    const [productData, setProductData] = useState([]);

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

    const handleDelete = (productId) => {

        fetch(` http://127.0.0.1:8000/products_api/products/${productId}/`, {
            method: 'DELETE'
        })
            .then(response => {
                if (response.status === 204) {
                    console.log('Product deleted successfully.');
                    getProductsData(API);
                } else {
                    console.log('Failed to delete product.');
                }
            })
            .catch(error => {
                console.error('Error deleting product:', error);
            });
    }

    return (
        <div className='adminRemoveSection'>
            <div className="adminRemoveContent">
                <div className="adminRemoveContainer">
                    <div className="adminRemoveHeadings">
                        <div className="heading">Name</div>
                        <div className="heading">Price</div>
                        <div className="heading">Stock</div>
                        <div className="heading">Remove</div>
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
                            <div className="adminRemoveList" key={data.id} >
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
                                    handleDelete(data.id)

                                }}>
                                    <FaTrash />
                                </span>
                            </div>
                        ))
                    }
                </div>
            </div>
        </div >
    )
}
