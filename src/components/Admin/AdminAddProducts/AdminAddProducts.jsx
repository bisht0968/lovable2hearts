import axios from 'axios';
import React, { useEffect, useState } from 'react'
import "./AdminAddProducts.scss"

export default function AdminAddProducts() {

    const [formData, setFormData] = useState({
        name: '',
        images: '',
        description: '',
        price: '',
        category: '',
        shipping_price: '',
        stock: '',
        discount: '',
        reviews: ''
    });
    const [showMessage, setShowMessage] = useState(false)

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(formData);
        try {
            const response = await axios.post('http://127.0.0.1:8000/products_api/products/', formData);
            console.log('Server response:', response.data);
        } catch (error) {
            console.error('Error sending data:', error);
        }
    };

    useEffect(() => {
        setShowMessage(false)
    }, [])

    return (
        <div className='adminAddProductsSection'>
            <div className="adminAddProductsContent">
                <div className="adminAddProductsContainer">
                    <form onSubmit={handleSubmit}>
                        <div className="section">
                            <div className="title">
                                Name
                            </div>
                            <input
                                type="text"
                                placeholder='NAME OF THE PRODUCT'
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="section">
                            <div className="title">
                                Description
                            </div>
                            <textarea
                                name="description"
                                value={formData.description}
                                onChange={handleChange}
                                placeholder='DESCRIPTION OF THE PRODUCT'
                            />
                        </div>
                        <div className="section">
                            <div className="title">
                                Category
                            </div>
                            <input
                                type='text'
                                name="category"
                                value={formData.category}
                                onChange={handleChange}
                                placeholder='CATEGORY OF THE PRODUCT'
                            />
                        </div>
                        <div className="section">
                            <div className="title">
                                Price
                            </div>
                            <input
                                type='number'
                                name="price"
                                value={formData.price}
                                onChange={handleChange}
                                placeholder='PRICE OF THE PRODUCT'
                                required
                            />
                        </div>
                        <div className="section">
                            <div className="title">
                                Shipping Price
                            </div>
                            <input
                                type='number'
                                name="shipping_price"
                                value={formData.shipping_price}
                                onChange={handleChange}
                                placeholder='SHIPPING PRICE OF THE PRODUCT'
                            />
                        </div>
                        <div className="section">
                            <div className="title">
                                Quantity
                            </div>
                            <input
                                type='number'
                                name="stock"
                                value={formData.stock}
                                onChange={handleChange}
                                placeholder='QUANTITY OF THE PRODUCT'
                            />
                        </div>
                        <div className="section">
                            <div className="title">
                                Discount
                            </div>
                            <input
                                type='number'
                                name="discount"
                                value={formData.discount}
                                onChange={handleChange}
                                placeholder='DISCOUNT ON THE PRODUCT'
                            />
                        </div>
                        <div className="section">
                            <div className="title">
                                Reviews
                            </div>
                            <input
                                type='text'
                                name="reviews"
                                value={formData.reviews}
                                onChange={handleChange}
                                placeholder='REVIEWS OF THE PRODUCT'
                            />
                        </div>
                        <div className="submitButton" onClick={() => setShowMessage(true)}>
                            <button type="submit">Add Product</button>
                        </div>
                        {showMessage && <div className="productAddedMessage">
                            <div className="message">
                                YOUR PRODUCT {formData.name} IS BEING SUCCESSFULLY ADDED!!
                            </div>
                        </div>}
                    </form>
                </div>
            </div>
        </div>
    )
}
