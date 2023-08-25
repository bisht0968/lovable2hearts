import React, { useContext } from 'react'

import "./PreferenceDialogueBox.scss"

import { BsFillArrowThroughHeartFill, BsFillBalloonHeartFill } from "react-icons/bs"
import { AppContext } from '../../utils/Context'
import { useNavigate } from 'react-router-dom'

export default function PreferenceDialogueBox({ setShowGenderDialougeBox }) {

    const { setPreference, heading } = useContext(AppContext)
    const navigate = useNavigate();

    return (
        <div className='preferenceSection'>
            <div className="preferenceContent">
                <div className="preferenceContainer">
                    <div className="preferenceText">
                        <span className='welcomeMessage'> Welcome to <span>{heading}</span> Store</span>
                        <span className="prefenceSelectText">
                            Please Select Your Preferences
                        </span>
                    </div>
                    <div className="preferenceButtons">
                        <div className="preferenceButton" onClick={() => {
                            setPreference("straight")
                            navigate("/home")
                            window.scrollTo({ top: 0, behavior: 'smooth' })
                        }}>
                            He<BsFillArrowThroughHeartFill />She
                        </div>
                        <div className="preferenceButton" onClick={() => {
                            setPreference("lgbtq")
                            navigate("/home")
                            window.scrollTo({ top: 0, behavior: 'smooth' })
                        }}>
                            <span className="text">  He<BsFillBalloonHeartFill />He</span>
                            <span className='text'> / She<BsFillBalloonHeartFill />She</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
