import React from 'react'
import { useNavigate } from "react-router-dom"

import "./ErrorPage.scss"

import Pic from "../../assets/error_dog_png-removebg-preview.png"

export default function ErrorPage() {

    const navigate = useNavigate();

    return (
        <div className='errorPageSection'>
            <div className="errorPageContent">
                <div className="errorContainer">
                    <div className="errorStatus">
                        404
                    </div>
                    <div className="errorImage">
                        <img src={Pic} alt="" />
                    </div>
                    <div className="errorMessage">
                        <span className="bigText">
                            UH OH! You're lost.
                        </span>
                        <span className="smallText">
                            The page you are looking for does not exist. How you got here is a mystery. But you can click the below button to go back to the Homepage.
                        </span>
                    </div>
                    <div className="errorButton" onClick={() => {
                        navigate('/')
                        window.scrollTo({ top: 0, behavior: 'smooth' })
                    }}>
                        HOME
                    </div>
                </div>
            </div>
        </div>
    )
}
