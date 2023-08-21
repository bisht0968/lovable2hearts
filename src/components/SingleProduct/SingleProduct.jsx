import React, { useEffect, useState } from 'react'
import "./SingleProduct.scss"
import { useNavigate, useParams } from 'react-router-dom'
import axios from "axios"
import { TbTruckDelivery, TbReplace } from "react-icons/tb"
import { BsShieldShaded, BsStarHalf } from "react-icons/bs"
import { AiOutlineLeft, AiOutlineRight, AiOutlineStar, AiFillStar, AiOutlineMinus, AiOutlinePlus } from "react-icons/ai"

export default function SingleProduct() {

    const productId = useParams({});

    const navigate = useNavigate();

    const [singleProductDetails, setSingleProductDetails] = useState({});
    const [mainImage, setMainImage] = useState({});
    const [showSwipeButtons, setShowSwipeButtons] = useState(false)
    const [activeIndex, setActiveIndex] = useState(0);
    const [cartQuantity, setCartQuantity] = useState(1)

    const API = `https://api.pujakaitem.com/api/products/${productId.id}`

    const getSingleProduct = async (url) => {
        const res = await axios.get(url)
        setSingleProductDetails(res.data)
    }

    useEffect(() => {
        getSingleProduct(API)
    }, [API])

    useEffect(() => {
        if (singleProductDetails.image && singleProductDetails.image.length > 0) {
            setMainImage(singleProductDetails.image[0]);
        }
    }, [singleProductDetails.image]);

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
        const newIndex = activeIndex === 0 ? singleProductDetails.image.length - 1 : activeIndex - 1;
        setActiveIndex(newIndex);
    };

    const handleRightSwipe = () => {
        const newIndex = activeIndex === singleProductDetails.image.length - 1 ? 0 : activeIndex + 1;
        setActiveIndex(newIndex);
    };

    const handleDecrement = () => {
        const quantity = cartQuantity;
        if (cartQuantity > 1) {
            setCartQuantity(quantity - 1)
        }
    }
    const handleIncrement = () => {
        const quantity = cartQuantity;
        if (cartQuantity < 5) {
            setCartQuantity(quantity + 1)
        }
    }

    return (
        <div className='singleProductSection'>
            <div className="singleProductContent">
                <div className="singleProductContainer">
                    <div className="singleProductLeft">
                        <div className="productReltedImage">
                            {singleProductDetails.image ? singleProductDetails.image.map((img, i) => {
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
                                    <img src={singleProductDetails.image?.[activeIndex]?.url} alt={singleProductDetails.image?.[activeIndex]?.filename} />
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
                                {singleProductDetails.name}
                            </div>
                            <div className="singleProductStars">
                                <span className="stars">
                                    {Array.from({ length: 5 }, (_, index) => {
                                        let numbers = index + 0.5;
                                        return <span className='star' key={index}>
                                            {singleProductDetails.stars >= index + 1 ? <AiFillStar /> : singleProductDetails.stars >= numbers ? <BsStarHalf /> : <AiOutlineStar />}
                                        </span>
                                    }
                                    )}
                                </span>

                                <span className="starsText">
                                    ({singleProductDetails.reviews} customer reviews)
                                </span>
                            </div>
                            <div className="singleProductPrice">
                                MRP : {Intl.NumberFormat("en-IN", { style: "currency", currency: "INR", maximumFractionDigits: 2 }).format(singleProductDetails.price)}
                            </div>
                            <div className="singleProductDiscountedPrice">
                                <span className="text">Deal of the Day : {Intl.NumberFormat("en-IN", { style: "currency", currency: "INR", maximumFractionDigits: 2 }).format(singleProductDetails.price)}</span>
                            </div>
                            <div className="singleProdcutDescription">
                                {singleProductDetails.description}
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
                                        : {singleProductDetails.stock === 0 ? "Out Of Stock" : "In Stock"}
                                    </span>
                                    <span className="rightText">
                                        : {singleProductDetails.id}
                                    </span>
                                    <span className="rightText">
                                        : {singleProductDetails.company}
                                    </span>
                                </div>
                            </div>
                        </div>
                        <div className="singleProductCartSection">
                            <div className="counters">
                                <span className="counter leftCounter" onClick={handleDecrement}><AiOutlineMinus /></span>
                                <span className="value">{cartQuantity}</span>
                                <span className="counter rightCounter" onClick={handleIncrement}><AiOutlinePlus /></span>
                            </div>
                            <div className="cartButton" onClick={() => {
                                navigate('/cart')
                                window.scrollTo({ top: 0, behavior: 'smooth' })
                            }}>
                                ADD TO CART
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
