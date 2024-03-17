import React, { useContext } from 'react'
import "./RelatedProducts.scss"

import Product from '../Product/Product'
import { AppContext } from '../../../utils/Context'

import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

import { IoIosArrowDown } from "react-icons/io";
export default function RelatedProducts({ category, id }) {

    const navigate = useNavigate()

    const { getProductData, API, productData } = useContext(AppContext)

    const newAPI = `${API}/allproducts`

    useEffect(() => {
        getProductData(newAPI)
    }, [])

    const categoryCounts = {}

    productData.forEach(data => {
        const { category } = data;
        categoryCounts[category] = (categoryCounts[category] || 0) + 1;
    });

    let renderedProducts = 0

    return (
        <div className='relatedProductsSection'>
            <div className="relatedProductsContent">
                <div className='heading'>
                    Related Products
                </div>
                <div className="relatedProductsContainer">
                    {productData.map(data => {
                        if (renderedProducts < 3 && data.category === category && data.id !== id) {
                            renderedProducts++;
                            return (
                                <div className="relatedProductsItemGridLayout" key={data.id} onClick={() => {
                                    navigate(`/singleproduct/${data.id}`)
                                    window.scrollTo({ top: 0, behavior: 'smooth' })
                                }}>
                                    <Product productDetailsData={data} gridLayout={true} />
                                </div>
                            );
                        } else {
                            return null;
                        }
                    })}
                </div>
                {renderedProducts === 3 ? <div className="showMoreButton">
                    <button onClick={() => {
                        navigate('/products')
                        window.scrollTo({ top: 0, behavior: 'smooth' })
                    }}>Show More <IoIosArrowDown /></button>
                </div> : <></>}
            </div>
        </div>
    )
}
