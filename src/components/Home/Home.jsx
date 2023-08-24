import React, { useEffect, useState } from 'react'

import "./Home.scss"

import Banner from "../Banner/Banner"
import Services from '../Services/Services'
import FeatureProducts from '../FeatureProducts/FeatureProducts'

export default function Home() {
    return (
        <div className='homeSection'>
            <div className="homeContent">
                <div className="heroBanner">
                    <Banner heading={"Babsu Store"} />
                </div>
                <div className="features">
                    <FeatureProducts />
                </div>
                <div className="servicesAndTrustedSection">
                    <Services />
                </div>
            </div>
        </div>
    )
}
