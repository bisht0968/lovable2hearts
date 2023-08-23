import React, { useContext } from 'react'
import { useNavigate } from 'react-router-dom'

import { IoMdTransgender } from "react-icons/io"
import { GiLovers } from "react-icons/gi"

import "./Banner.scss"
import { AppContext } from '../../utils/Context'

import BannerImage from "../../assets/Home Banner.avif"
import lgbqtBannerImage from "../../assets/lgbtq banner.jpg"
import LGBTQ_SymbolPic from "../../assets/LGBTQ symbol.jpg"
import coupleSymbolPic from "../../assets/couple symbol.jpg"

export default function Banner({ heading }) {

    const { pageSelect, handleGenderPage, setPageSelect } = useContext(AppContext)

    const navigate = useNavigate()

    return (
        <div className='bannerSection'>
            <div className="bannerContent">
                <div className="bannerLeft">
                    {pageSelect === "straight" ?
                        <div className="bannerImage">
                            <img src={BannerImage} alt="" />
                        </div>
                        :
                        <div className="bannerImage">
                            <img src={lgbqtBannerImage} alt="" />
                        </div>}
                </div>
                <div className="bannerRight">
                    <div className="bannerText">
                        <div className="bannerHeading">
                            <span className="welcomeMessage">
                                Welcome To
                            </span>
                            <span className="heading">
                                {heading}
                            </span>
                        </div>
                        <div className="bannerMessage">
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Nihil soluta excepturi, ratione repellendus totam perspiciatis quos aperiam, laudantium, odit quae error nulla aut!
                        </div>
                    </div>
                    <div className="bannerButtons genderBannerButtons" >
                        <div className="bannerButton" onClick={() => {
                            navigate('/products')
                            window.scrollTo({ top: 0, behavior: 'smooth' })
                        }}>
                            Shop Now
                        </div>
                        {pageSelect === "straight" ?
                            <div className="bannerButton genderButton" onClick={() => {
                                handleGenderPage()
                                setPageSelect("lgbtq")
                                window.scrollTo({ top: 0, behavior: 'smooth' })
                            }}>
                                <div className="bannerButtonText">
                                    <IoMdTransgender /> LGBTQ
                                </div>
                                <div className="bannerButtonImage">
                                    <img src={LGBTQ_SymbolPic} alt="" />
                                </div>
                            </div>
                            :
                            <div className="bannerButton genderButton" onClick={() => {
                                handleGenderPage()
                                setPageSelect("straight")
                                window.scrollTo({ top: 0, behavior: 'smooth' })
                            }}>
                                <div className="bannerButtonText">
                                    <GiLovers />Straight
                                </div>
                                <div className="bannerButtonImage">
                                    <img src={coupleSymbolPic} alt="" />
                                </div>
                            </div>
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}
