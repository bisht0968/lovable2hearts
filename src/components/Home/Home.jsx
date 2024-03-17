import React, { useContext } from 'react'

import "./Home.scss"

import Banner from "./Banner/Banner"
import Services from './Services/Services'
import FeatureProducts from './FeatureProducts/FeatureProducts'
import Offers from './Offers/Offers'
import { AppContext } from '../../utils/Context'
import NewsLetter from './NewsLetter/NewsLetter'

export default function Home() {

    const { heading } = useContext(AppContext)

    return (
        <div className='homeSection'>
            <div className="homeContent">
                <div className="heroBanner">
                    <Banner heading={heading} />
                </div>
                <div className="features">
                    <FeatureProducts />
                </div>
                <div className="offers">
                    <Offers />
                </div>
                <div className="servicesAndTrustedSection">
                    <Services />
                </div>
                <div className="newsLetter">
                    <NewsLetter />
                </div>
            </div>
        </div>
    )
}
