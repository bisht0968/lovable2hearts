import React, { useContext } from 'react'

import "./Home.scss"

import Banner from "../Banner/Banner"
import Services from '../Services/Services'
import FeatureProducts from '../FeatureProducts/FeatureProducts'
import { AppContext } from '../../utils/Context'

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
                <div className="servicesAndTrustedSection">
                    <Services />
                </div>
            </div>
        </div>
    )
}
