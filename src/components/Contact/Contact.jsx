import React from 'react'

import "./Contact.scss"

import ContactMap from "../../assets/Map Contact Us.png"
import { useAuth0 } from '@auth0/auth0-react'

export default function Contact() {

    const { user, isAuthenticated } = useAuth0();

    return (
        <div className='contactSection'>
            <div className="contactContent">
                <div className="contatcHeading">
                    Feel Free To Contact Us
                </div>
                <div className="contactContainer">

                    <div className="contactMap">
                        <img src={ContactMap} alt="" />
                    </div>
                    <form method='POST'
                        action='https://formspree.io/f/xwkdokqq' className='contactForm'>
                        <input
                            type="text"
                            name="username"
                            placeholder='Username'
                            required
                            value={isAuthenticated ? user.name.toUpperCase() : ""}
                            onChange={() => { }}
                        />
                        <input
                            type="text"
                            name="email"
                            placeholder='Email Address'
                            required
                            value={isAuthenticated ? user.email.toUpperCase() : ""
                            }
                            onChange={() => { }}
                        />
                        <textarea cols="30" rows="10" name="message" placeholder='Enter Your Message...' />
                        <button type="submit" className="contactButton">Submit</button>
                    </form>
                </div>
            </div>
        </div>
    )
}
