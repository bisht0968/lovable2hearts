import React, { useEffect, useState } from 'react'
import "./FeatureProducts.scss"
import Product from "../Products/Product/Product"
import axios from "axios"
import { FaSpinner } from "react-icons/fa"

export default function FeatureProducts() {

    const [productData, setProductData] = useState([]);

    const API = "https://api.pujakaitem.com/api/products"

    const getProductData = async (url) => {
        try {
            const res = await axios.get(url)
            const limitedData = res.data.slice(0, 3)
            setProductData(limitedData)
        } catch (error) {
            console.error('Error fetching products:', error);
        }
    }

    useEffect(() => {
        getProductData(API)
    }, [])

    return (
        <div className='featureProdcutsSection'>
            <div className="featureProductsContent">
                <div className="featureProductsContainer">
                    <div className="featureProductstext">
                        <div className="smallText">
                            CHECK NOW!
                        </div>
                        <div className="heading">
                            Our Feature Services
                        </div>
                    </div>
                    <div className="featureProductsItems">
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
                                <div className="featureProductsItem" key={data.id}>
                                    <Product productDetailsData={data} />
                                </div>
                            ))
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}
