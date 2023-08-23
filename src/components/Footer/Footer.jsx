import React from 'react'

import "./Footer.scss"

import { AiOutlineInstagram, AiOutlineYoutube, AiOutlineGithub, AiOutlinePhone } from "react-icons/ai"
import { BiLogoGmail } from "react-icons/bi"
import { useNavigate } from "react-router-dom"

export default function Footer() {

    const navigate = useNavigate();

    return (
        <div className='footerSection'>
            <div className="footerContent">
                <div className="footerUpperSection">
                    <div className="section">
                        <div className="footerHeading">
                            Babsu Store
                        </div>
                        <div className="footerUpperText">
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Libero, alias.
                        </div>
                    </div>
                    <div className="section mobileSection">
                        <ul className="footerMenu">
                            <li onClick={() => {
                                navigate('/')
                                window.scrollTo({ top: 0, behavior: 'smooth' })
                            }}>Home</li>
                            <li onClick={() => {
                                navigate('/about')
                                window.scrollTo({ top: 0, behavior: 'smooth' })
                            }}>About</li>
                            <li onClick={() => {
                                navigate('/products')
                                window.scrollTo({ top: 0, behavior: 'smooth' })
                            }}>Products</li>
                            <li onClick={() => {
                                navigate('/contact')
                                window.scrollTo({ top: 0, behavior: 'smooth' })
                            }}>Contact</li>
                        </ul>
                    </div>
                    <div className="section mobileSection">
                        <div className="footerHeading">
                            Follow Us
                        </div>
                        <div className="footerIcons">
                            <AiOutlineInstagram />
                            <AiOutlineYoutube />
                            <AiOutlineGithub />
                        </div>
                    </div>
                    <div className="section footerContactSection">
                        <div className="footerHeading">
                            Contact Us
                        </div>
                        <div className="footerContact">
                            <div className="footerContactText">
                                <span className="footerIcon">
                                    <AiOutlinePhone />
                                </span>
                                +1234567890
                            </div>
                            <div className="footerContactText">
                                <span className="footerIcon">
                                    <BiLogoGmail />
                                </span>
                                babsu@gmail.com
                            </div>
                        </div>
                    </div>
                </div>
                <div className="footerLowerSection">
                    <div className="copyrightMessage">
                        @2023 BabsuStore. All Rights Reserved
                    </div>
                    <ul className="footerLowerMenu">
                        <li className='footerLowerText'>PRIVACY POLICY</li>
                        <li className='footerLowerText'>TERMS & CONDITIONS</li>
                    </ul>
                </div>
            </div>
        </div>
    )
}
