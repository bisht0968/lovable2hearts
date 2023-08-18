import React from 'react'
import "./Banner.scss"
import BannerImage from "../../assets/Home Banner.avif"

export default function Banner({ heading }) {
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
                    <div className="bannerButton">
                        Shop Now
                    </div>
                </div>
            </div>
        </div>
    )
}
