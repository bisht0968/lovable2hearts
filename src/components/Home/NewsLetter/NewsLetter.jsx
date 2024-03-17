import React from 'react'
import './NewsLetter.scss'

export default function NewsLetter() {
    return (
        <div className='newsLetterSection'>
            <div className="newsLetterContent">
                <div className="newsLetterContainer">
                    <h1>Subscribe  to our newsletter!</h1>
                    <p>Get the latest updates and offers directly in your mailbox.</p>
                    <form action="#">
                        <input type="email" placeholder='Enter your Email' />
                        <button>
                            Subscribe
                        </button>
                    </form>
                </div>
            </div>
        </div>
    )
}
