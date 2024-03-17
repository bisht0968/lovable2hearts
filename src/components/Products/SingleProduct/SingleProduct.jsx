import React, { useContext, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import axios from "axios"

import "./SingleProduct.scss"

import { AppContext } from '../../../utils/Context'

import { TbTruckDelivery, TbReplace } from "react-icons/tb"
import { BsShieldShaded, BsStarHalf } from "react-icons/bs"
import { AiOutlineLeft, AiOutlineRight, AiOutlineStar, AiFillStar, AiOutlineMinus, AiOutlinePlus } from "react-icons/ai"

import RelatedProducts from '../RelatedProducts/RelatedProducts'

export default function SingleProduct() {

    const productId = useParams({});

    const navigate = useNavigate();

    const { handleAddToCart, handleDecrement, handleIncrement, cartItemQuantity, productItemQuantity, setProductItemQuantity, setMenuHorizontalLine, API } = useContext(AppContext);

    const [singleProductData, setSingleProductData] = useState([])
    const [mainImage, setMainImage] = useState({});
    const [showSwipeButtons, setShowSwipeButtons] = useState(false)
    const [activeIndex, setActiveIndex] = useState(0);

    const singleAPI = `${API}/allproducts`

    const getSingleProduct = async (url) => {
        try {
            const res = await axios.get(url);
            for (let i = 0; i < res.data.length; i++) {
                if (res.data[i].id === Number(productId.id)) {
                    setSingleProductData(res.data[i])
                }
            }
        } catch (error) {
            console.error('Error fetching products:', error);
        }
    }

    useEffect(() => {
        getSingleProduct(singleAPI)
    }, [productId])

    useEffect(() => {
        if (singleProductData.image && singleProductData.image.length > 0) {
            setMainImage(singleProductData.image[0]);
        }
    }, [singleProductData.image]);

    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth < 768) {
                setShowSwipeButtons(true);
            } else {
                setShowSwipeButtons(false);
            }
        };
        handleResize();
        window.addEventListener("resize", handleResize);
        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, []);

    const handleLeftSwipe = () => {
        const newIndex = activeIndex === 0 ? singleProductData.image.length - 1 : activeIndex - 1;
        setActiveIndex(newIndex);
    };

    const handleRightSwipe = () => {
        const newIndex = activeIndex === singleProductData.image.length - 1 ? 0 : activeIndex + 1;
        setActiveIndex(newIndex);
    };

    useEffect(() => {
        setProductItemQuantity(1)
    }, [])

    return (
        <div className='singleProductSection'>
            <div className="singleProductContent">
                <div className="singleProductContainer">
                    <div className="singleProductLeft">
                        <div className="productReltedImage">
                            {singleProductData.image ? singleProductData.image.map((img, i) => {
                                return <div className="relatedImage" key={i}>
                                    <img src={img.url} alt={img.filename} onClick={() => {
                                        setMainImage(img)
                                    }} />
                                </div>
                            }) : ""}
                        </div>
                        <div className="productImage">
                            {showSwipeButtons ?
                                <div className="productMobileImage">
                                    <img src={singleProductData.image?.[activeIndex]?.url} alt={singleProductData.image?.[activeIndex]?.filename} />
                                    <div className='swipeButtons'>
                                        <div className="leftSwipe" onClick={handleLeftSwipe}>
                                            <AiOutlineLeft />
                                        </div>
                                        <div className="rightSwipe" onClick={handleRightSwipe}>
                                            <AiOutlineRight />
                                        </div>
                                    </div>
                                </div>
                                :
                                <img src={mainImage?.url} alt={mainImage?.filename} />}
                        </div>
                    </div>
                    <div className="singleProductRight">
                        <div className="singleProductDetails">
                            <div className="singleProductName">
                                {singleProductData.name}
                            </div>
                            <div className="singleProductStars">
                                <span className="stars">
                                    {Array.from({ length: 5 }, (_, index) => {
                                        let numbers = index + 0.5;
                                        return <span className='star' key={index}>
                                            {singleProductData.stars >= index + 1 ? <AiFillStar /> : singleProductData.stars >= numbers ? <BsStarHalf /> : <AiOutlineStar />}
                                        </span>
                                    }
                                    )}
                                </span>

                                <span className="starsText">
                                    ({singleProductData.reviews} customer reviews)
                                </span>
                            </div>
                            <div className="singleProductPrice">
                                MRP : {Intl.NumberFormat("en-IN", { style: "currency", currency: "INR", maximumFractionDigits: 2 }).format(singleProductData.price)}
                            </div>
                            <div className="singleProductDiscountedPrice">
                                <span className="text">Deal of the Day : {Intl.NumberFormat("en-IN", { style: "currency", currency: "INR", maximumFractionDigits: 2 }).format(singleProductData.price)}</span>
                            </div>
                            <div className="singleProdcutDescription">
                                {singleProductData.description}
                            </div>
                            <div className="singleProductIcons">
                                <div className="singleProductIcon">
                                    <TbTruckDelivery />
                                    <span className="iconText">
                                        Free Delivery
                                    </span>
                                </div>
                                <div className="singleProductIcon">
                                    <TbReplace />
                                    <span className="iconText">
                                        30 Days Replacement
                                    </span>
                                </div>
                                <div className="singleProductIcon">
                                    <BsShieldShaded />
                                    <span className="iconText">
                                        2 Year Warranty
                                    </span>
                                </div>
                            </div>
                            <div className="singleProductBrandAndStockDescription">
                                <div className="singleProductBrandAndStockDescriptionLeft">
                                    <span className="leftText">
                                        Available
                                    </span>
                                    <span className="leftText">
                                        ID
                                    </span>
                                    <span className="leftText">
                                        Brand
                                    </span>
                                </div>
                                <div className="singleProductBrandAndStockDescriptionRight">
                                    <span className="rightText">
                                        : {singleProductData.stock === 0 ? "Out Of Stock" : "In Stock"}
                                    </span>
                                    <span className="rightText">
                                        : {singleProductData.id}
                                    </span>
                                    <span className="rightText">
                                        : {singleProductData.category}
                                    </span>
                                </div>
                            </div>
                        </div>
                        <div className="singleProductCartSection">
                            <div className="counters">
                                <span className="counter leftCounter" onClick={handleDecrement}><AiOutlineMinus /></span>
                                <span className="value">{productItemQuantity}</span>
                                <span className="counter rightCounter" onClick={() => handleIncrement(singleProductData)}><AiOutlinePlus /></span>
                            </div>
                            <div className="cartButton" onClick={() => {
                                navigate('/cart')
                                window.scrollTo({ top: 0, behavior: 'smooth' })
                                handleAddToCart(singleProductData, cartItemQuantity)
                                // handleAddToCart(singleProductData, 1)
                                setMenuHorizontalLine("")
                            }}>
                                ADD TO CART
                            </div>
                        </div>
                    </div>
                </div>
                <div className="relatedProductContainer">
                    <RelatedProducts category={singleProductData.category} id={singleProductData.id} />
                </div>
            </div>
        </div>
    )
}
