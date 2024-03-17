import React, { useContext, useEffect, useState } from 'react'
import "./SignUp.scss"
import { useNavigate } from 'react-router-dom'
import { AppContext } from '../../../utils/Context'

export default function SignUp() {

    const [savedSuccessfully, setSavedSuccessfully] = useState(false)

    const [errorMessage, setErrorMessage] = useState(false)

    const [agreed, setAgreed] = useState(false)

    const [signupUserDetails, setSignupUserDetails] = useState({
        name: "",
        email: "",
        phoneNumber: "",
        password: ""
    })

    const handleOnChange = (e) => {
        setSignupUserDetails({ ...signupUserDetails, [e.target.name]: e.target.value });
    }

    const { API } = useContext(AppContext)

    const handleSaveUserDetails = async () => {

        try {
            const response = await fetch(`${API}/signup`, {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(signupUserDetails),
            })
            const data = await response.json();
            console.log(data.error);

            if (data.success) {
                setSavedSuccessfully(true)
            }
            else setErrorMessage(true)
            setSignupUserDetails({
                name: "",
                email: "",
                phoneNumber: "",
                password: ""
            });

            setTimeout(() => {
                setSavedSuccessfully(false);
                setErrorMessage(false)
            }, 5000);

        } catch (error) {
            console.error('Error saving user details:', error);
            alert("Error", error);
        }
    }



    useEffect(() => {
        setSavedSuccessfully(false)
        setErrorMessage(false)
    }, [])


    const navigate = useNavigate()

    return (
        <div className='signUpSection'>
            <div className="signUpContent">
                <div className="signUpContainer">
                    <h1>Sign Up</h1>
                    <div className="signUpFields">
                        <input
                            type="text"
                            placeholder='User Name'
                            required
                            onChange={handleOnChange}
                            name='name'
                            value={signupUserDetails.name} />
                        <input
                            type="email"
                            placeholder='Email Address'
                            required
                            onChange={handleOnChange}
                            name='email'
                            value={signupUserDetails.email} />
                        <input
                            type="password"
                            placeholder='Password'
                            required
                            onChange={handleOnChange}
                            name='password'
                            value={signupUserDetails.password} />
                        <input
                            type="text"
                            placeholder='Phone Number'
                            required
                            onChange={handleOnChange}
                            name='phoneNumber'
                            value={signupUserDetails.phoneNumber} />
                    </div>
                    <div className="signUpButton">
                        <button
                            onClick={() => {
                                handleSaveUserDetails()
                                navigate('/login')
                                window.scrollTo({ top: 0, behavior: 'smooth' })
                            }}
                            disabled={!agreed}
                        >
                            Continue
                        </button>
                    </div>
                    {savedSuccessfully || errorMessage ?
                        <div className="savedSuccessfullyMessage">
                            {savedSuccessfully ? "User Created Successfully!" : "Email Address already Exists"}
                        </div>
                        : <></>}
                    <div className="loginButton">
                        Already Have an Account <span onClick={() => {
                            navigate('/login')
                            window.scrollTo({ top: 0, behavior: 'smooth' })
                        }}>Login Here</span>
                    </div>
                    <div className="signUpAgree">
                        <input
                            type="checkbox"
                            required
                            onChange={() => { setAgreed(!agreed) }}
                        />
                        <p>By continuing, I agree to the of use and privacy policy.</p>
                    </div>
                </div>
            </div>
        </div>
    )
}
