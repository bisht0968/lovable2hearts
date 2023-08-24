import React from 'react'
import { useNavigate } from 'react-router-dom'

import "./Banner.scss"

import BannerImage from "../../assets/Home Banner.avif"

export default function Banner({ heading }) {

    const navigate = useNavigate()

    return (
        <div className='bannerSection'>
            <div className="bannerContent">
                <div className="bannerLeft">
                    <div className="bannerImage">
                        <img src={BannerImage} alt="" />
                    </div>
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
                    </div>
                </div>
            </div>
        </div>
    )
}
