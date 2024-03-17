import React from 'react'

import "./Services.scss"

import { LiaShippingFastSolid } from "react-icons/lia"
import { FaShieldAlt } from "react-icons/fa"
import { GiReceiveMoney } from "react-icons/gi"
import { RiSecurePaymentLine } from "react-icons/ri"

export default function Services() {
    return (
        <div className='servicesSection'>
            <div className="servicesContent">
                <div className="firstServiceColumn">
                    <div className="firstServiceColumnIcon">
                        <LiaShippingFastSolid />
                    </div>
                    <div className="serviceText">
                        Super Fast and Free Delivery
                    </div>
                </div>
                <div className="secondServiceColumn">
                    <div className="upperRow">
                        <span className="upperRowIcon"><FaShieldAlt /></span>
                        <span className="upperRowText">
                            Non-contact Shipping
                        </span>
                    </div>
                    <div className="lowerRow">
                        <span className="lowerRowIcon"><GiReceiveMoney /></span>
                        <span className="lowerRowText">
                            Money-back Guaranteed
                        </span>
                    </div>
                </div>
                <div className="thirdServiceColumn">
                    <div className="thirdServiceColumnIcon"><RiSecurePaymentLine /></div>
                    <div className="servicesText">
                        Super Secure Payment System
                    </div>
                </div>
            </div>
        </div>
    )
}
