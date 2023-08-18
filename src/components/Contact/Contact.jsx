import React from 'react'
import "./Contact.scss"
import ContactMap from "../../assets/Map Contact Us.png"

export default function Contact() {
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
                        <input type="text"
                            name="username" placeholder='Username' required />
                        <input type="text"
                            name="email" placeholder='Email Address' required />
                        <textarea cols="30" rows="10" name="message" placeholder='Enter Your Message...' />
                        <button type="submit" className="contactButton">Submit</button>
                    </form>
                </div>
            </div>
        </div>
    )
}
