import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import "./AdminSingleProductModify.scss"
import { AppContext } from '../../../utils/Context';

export default function AdminSingleProductModify() {

    const { setShowHeader } = useContext(AppContext)

    useEffect(() => {
        setShowHeader(false)
    }, [])

    const productId = useParams({});

    const API = `http://127.0.0.1:8000/products_api/products/${productId.id}`

    const [formData, setFormData] = useState({
        name: '',
        images: '',
        description: '',
        price: '',
        shipping_price: '',
        stock: '',
        discount: '',
        reviews: ''
    });
    const [showMessage, setShowMessage] = useState(false)
    const [modified, setModified] = useState(false)
    const [singleProductDetails, setSingleProductDetails] = useState([]);


    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevData => ({
            ...prevData,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(formData);
        try {
            const response = await axios.put(`http://127.0.0.1:8000/products_api/products/${productId.id}/update/`, formData);
            console.log('Server response:', response.data);
        } catch (error) {
            console.error('Error sending data:', error);
        }
    };

    const getSingleProduct = async (url) => {
        const res = await axios.get(url)
        setSingleProductDetails(res.data)
    }

    useEffect(() => {
        getSingleProduct(API)
    }, [API, modified])

    useEffect(() => {
        setShowMessage(false)
        setModified(false)
    }, [])

    return (
        <div className='adminSingleProductModifySection'>
            <div className="adminSingleProductModifyContent">
                <div className="adminSingleProductModfiyContainer">
                    <form onSubmit={handleSubmit}>
                        <div className="section">
                            <div className="title">
                                Name : ({singleProductDetails.name})
                            </div>
                            <input
                                type="text"
                                placeholder='NAME OF THE PRODUCT'
                                name="name"
                                value={formData.name}
                                onChange={handleInputChange}
                                required
                            />
                        </div>
                        <div className="section">
                            <div className="title">
                                Description : ({singleProductDetails.description})
                            </div>
                            <textarea
                                name="description"
                                value={formData.description}
                                onChange={handleInputChange}
                                placeholder='DESCRIPTION OF THE PRODUCT'
                            />
                        </div>
                        <div className="section">
                            <div className="title">
                                Price : ({singleProductDetails.price})
                            </div>
                            <input
                                type='number'
                                name="price"
                                value={formData.price}
                                onChange={handleInputChange}
                                placeholder='PRICE OF THE PRODUCT'
                                required
                            />
                        </div>
                        <div className="section">
                            <div className="title">
                                Shipping Price : ({singleProductDetails.shipping_price})
                            </div>
                            <input
                                type='number'
                                name="shipping_price"
                                value={formData.shipping_price}
                                onChange={handleInputChange}
                                placeholder='SHIPPING PRICE OF THE PRODUCT'
                            />
                        </div>
                        <div className="section">
                            <div className="title">
                                Quantity : ({singleProductDetails.stock})
                            </div>
                            <input
                                type='number'
                                name="stock"
                                value={formData.stock}
                                onChange={handleInputChange}
                                placeholder='QUANTITY OF THE PRODUCT'
                            />
                        </div>
                        <div className="section">
                            <div className="title">
                                Discount : ({singleProductDetails.discount})
                            </div>
                            <input
                                type='number'
                                name="discount"
                                value={formData.discount}
                                onChange={handleInputChange}
                                placeholder='DISCOUNT ON THE PRODUCT'
                            />
                        </div>
                        <div className="section">
                            <div className="title">
                                Reviews : ({singleProductDetails.reviews})
                            </div>
                            <input
                                type='text'
                                name="reviews"
                                value={formData.reviews}
                                onChange={handleInputChange}
                                placeholder='REVIEWS OF THE PRODUCT'
                            />
                        </div>
                        <div className="submitButton" onClick={() => {
                            setShowMessage(true)
                            setModified(true)
                        }}>
                            <button type="submit">Add Product</button>
                        </div>
                        {showMessage && <div className="productModifiedMessage">
                            <div className="message">
                                YOUR PRODUCT {formData.name} IS BEING SUCCESSFULLY MODIFIED!!
                            </div>
                        </div>}
                    </form>
                </div>
            </div>
        </div>
    )
}
