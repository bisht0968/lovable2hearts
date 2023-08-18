import React from 'react'
import "./Home.scss"
import Banner from "../Banner/Banner"
import Services from '../Services/Services'

export default function Home() {
    return (
        <div className='homeSection'>
            <div className="homeContent">
                <div className="heroBanner">
                    <Banner heading={"Babsu Store"} />
                </div>
                <div className="servicesAndTrustedSection">
                    <Services />
                </div>
            </div>
        </div>
    )
}
