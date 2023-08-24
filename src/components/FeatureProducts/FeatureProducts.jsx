import React, { useContext, useEffect, useState } from 'react'
import axios from "axios"

import "./FeatureProducts.scss"

import Product from "../Products/Product/Product"

import { FaSpinner } from "react-icons/fa"
import { AppContext } from '../../utils/Context'

export default function FeatureProducts() {

    const [productData, setProductData] = useState([]);
    const { preference } = useContext(AppContext)

    const API = "https://api.pujakaitem.com/api/products"

    const getProductData = async (url) => {
        try {
            if (preference === "straight") {
                const res = await axios.get(url)
                const limitedData = res.data.slice(0, 3)
                setProductData(limitedData)
            } else {
                setProductData([])
            }
        } catch (error) {
            console.error('Error fetching products:', error);
        }
    }

    useEffect(() => {
        getProductData(API)
    }, [preference])

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
                                    <Product gridLayout={true}
                                        productDetailsData={data} />
                                </div>
                            ))
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}
