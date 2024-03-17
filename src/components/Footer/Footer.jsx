import React, { useContext } from 'react'

import "./Footer.scss"

import { AiOutlineInstagram, AiOutlineYoutube, AiOutlinePhone } from "react-icons/ai"
import { FaWhatsapp } from "react-icons/fa";
import { BiLogoGmail } from "react-icons/bi"
import { useNavigate } from "react-router-dom"

import { AppContext } from '../../utils/Context'

export default function Footer() {

    const { setMenuHorizontalLine } = useContext(AppContext)

    const navigate = useNavigate();

    const { footerAbout } = useContext(AppContext)

    return (
        <div className='footerSection'>
            <div className="footerContent">
                <div className="footerUpperSection">
                    <div className="section">
                        <div className="footerHeading">
                            Lovable2Hearts
                        </div>
                        <div className="footerUpperText">
                            {footerAbout}
                        </div>
                    </div>
                    <div className="section mobileSection">
                        <ul className="footerMenu">
                            <li onClick={() => {
                                navigate('/')
                                window.scrollTo({ top: 0, behavior: 'smooth' })
                                setMenuHorizontalLine("home")
                            }}>Home</li>
                            <li onClick={() => {
                                navigate('/products')
                                setMenuHorizontalLine("products")
                                window.scrollTo({ top: 0, behavior: 'smooth' })
                            }}>Products</li>
                        </ul>
                    </div>
                    <div className="section mobileSection">
                        <div className="footerHeading">
                            Follow Us
                        </div>
                        <div className="footerIcons">
                            <AiOutlineInstagram />
                            <AiOutlineYoutube />
                            <FaWhatsapp />
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
                                lovable2hearts@gmail.com
                            </div>
                        </div>
                    </div>
                </div>
                <div className="footerLowerSection">
                    <div className="copyrightMessage">
                        @2023 Lovable2Hearts. All Rights Reserved
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
