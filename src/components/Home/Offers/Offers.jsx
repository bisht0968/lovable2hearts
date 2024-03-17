import React from 'react'
import "./Offers.scss"

import Pic from "../../../assets/offers.jpg.crdownload"

export default function Offers() {
    return (
        <div className='offersSection'>
            <div className="offersContent">
                <div className="offersContainer">
                    <div className="offersLeft">
                        <p>Exclusive Offers!</p>
                        <h1>Get the best deals on our products.</h1>
                        <div className="saleButton">
                            <button>Sale Now!</button>
                        </div>
                    </div>
                    <div className="offersRight">
                        <img src={Pic} alt="" />
                    </div>
                </div>
            </div>
        </div>
    )
}
