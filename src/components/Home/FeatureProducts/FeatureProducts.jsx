import React, { useContext, useEffect, useState } from 'react'
import axios from "axios"

import "./FeatureProducts.scss"

import Product from "../../Products/Product/Product"
import Pic from "../../../assets/banner2-removebg-preview.png"

import { FaSpinner } from "react-icons/fa"
import { AppContext } from '../../../utils/Context'

export default function FeatureProducts() {

    const { API } = useContext(AppContext)

    const newAPI = `${API}/allproducts`

    const [productData, setProductData] = useState([])

    const getProductData = async (url) => {
        try {
            const res = await axios.get(url);
            if (Array.isArray(res.data)) {
                setProductData(res.data);
            } else {
                setProductData([res.data]);
            }
        } catch (error) {
            console.error('Error fetching products:', error);
            setProductData([]);
        }
    }

    useEffect(() => {
        getProductData(newAPI)
    }, [])

    return (
        <div className='featureProdcutsSection'>
            <div className="featureProductsContent">
                <div className="backgroundImage">
                    <img src={Pic} alt="" />
                </div>
                <div className="featureProductsContainer">
                    <div className="featureProductstext">
                        <div className="smallText">
                            CHECK NOW!
                        </div>
                        <div className="heading">
                            Some Lovely Accessories
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
                            productData.slice(0, 3).map(data => (
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
