import React, { useContext, useState } from 'react'
import "./Login.scss"
import { useNavigate } from 'react-router-dom';
import { AppContext } from '../../../utils/Context'
export default function Login() {

    const [loginUserDetails, setLoginUserDetails] = useState({
        email: '',
        password: ''
    })

    const [agreed, setAgreed] = useState(false)

    const handleOnChange = (e) => {
        setLoginUserDetails({
            ...loginUserDetails,
            [e.target.name]: e.target.value
        });
    }

    const { API } = useContext(AppContext)

    const handleLogin = async () => {
        try {
            const responseData = await fetch(`${API}/login`, {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(loginUserDetails),
            }).then((res) => res.json())
            if (!responseData.success) alert("Invalid username or password")
            else {
                navigate('/')
                window.scrollTo({ top: 0, behavior: 'smooth' })
                localStorage.setItem('auth-token', responseData.token);
            }
        }
        catch (error) {
            console.error('Error during login:', error);
        }
    }


    const navigate = useNavigate();

    return (
        <div className='loginSection'>
            <div className="loginContent">
                <div className="loginContainer">
                    <h1>Login</h1>
                    <div className="loginFields">
                        <input
                            type="email"
                            placeholder='Email Address'
                            required
                            name='email'
                            value={loginUserDetails.email}
                            onChange={handleOnChange} />
                        <input
                            type="password"
                            placeholder='Password'
                            required
                            name='password'
                            onChange={handleOnChange}
                            value={loginUserDetails.password} />
                    </div>
                    <div className="loginButton">
                        <button onClick={handleLogin} disabled={!agreed}>
                            Continue
                        </button>
                    </div>
                    <div className="signUpButton">
                        Create an account? <span onClick={() => {
                            navigate('/signup')
                            window.scrollTo({ top: 0, behavior: 'smooth' })
                        }}>Click here.</span>
                    </div>
                    <div className="loginAgree">
                        <input type="checkbox" name="" id='' required onChange={() => { setAgreed(!agreed) }} />
                        <p>By continuing, I agree to the of use and privacy policy.</p>
                    </div>
                </div>
            </div>
        </div>
    )
}
