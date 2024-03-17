
import React, { useContext, useEffect, useState } from 'react'

import "./Header.scss"
import { AppContext } from '../../utils/Context'

import { BsCartFill } from "react-icons/bs"
import { useNavigate } from 'react-router-dom'
import { GiHamburgerMenu } from "react-icons/gi"
import { RxCross2 } from "react-icons/rx"
import { FaUser } from "react-icons/fa";

export default function Header() {

    const { cartIconQuantity, heading, menuHorizontalLine, setMenuHorizontalLine, userName, fetchUserDetials } = useContext(AppContext)

    const navigate = useNavigate();

    const [scrolled, setScrolled] = useState(false);
    const [showMenu, setShowMenu] = useState(false)

    const handleScroll = () => {
        const offset = window.scrollY;
        if (offset > 250) {
            setScrolled(true)
        } else {
            setScrolled(false)
        }
    }

    useEffect(() => {
        window.addEventListener('scroll', handleScroll)
    }, [])

    useEffect(() => {
        fetchUserDetials()
    }, [])

    return (
        <>
            <div className={`headerSection ${scrolled ? "stickyHeader" : ""}`}>
                <div className="headerContent">
                    <div className='headerLeft'>
                        <div className="headerLogo" onClick={() => {
                            navigate('/')
                            setMenuHorizontalLine("home")
                            window.scrollTo({ top: 0, behavior: 'smooth' })
                        }}>
                            {heading}
                        </div>
                    </div>
                    <div className="headerRight">
                        <ul className='headerItems'>
                            <li onClick={() => {
                                navigate('/')
                                setMenuHorizontalLine("home")
                                window.scrollTo({ top: 0, behavior: 'smooth' })
                            }}>Home{menuHorizontalLine === "home" ? <hr /> : <></>}</li>
                            <li onClick={() => {
                                navigate('/products')
                                setMenuHorizontalLine("products")
                                window.scrollTo({ top: 0, behavior: 'smooth' })
                            }}>Products{menuHorizontalLine === "products" ? <hr /> : <></>}</li>
                        </ul>
                        <div className="headerIcons">
                            {localStorage.getItem('auth-token') ?
                                <>
                                    <div className="headerUser">
                                        <div className="userIcon">
                                            <div className="icons">
                                                <FaUser />
                                            </div>
                                            <div className="username">
                                                {userName}
                                            </div>
                                        </div>
                                        <div className="logoutButton">
                                            <button
                                                onClick={() => {
                                                    localStorage.removeItem('auth-token')
                                                    setMenuHorizontalLine("home")
                                                    navigate('/')
                                                    window.scrollTo({ top: 0, behavior: 'smooth' })
                                                }}>
                                                Logout
                                            </button>
                                        </div>
                                    </div>
                                </>
                                :
                                <div className="headerUser">
                                    <button onClick={() => {
                                        navigate('/login')
                                        setMenuHorizontalLine("")
                                        window.scrollTo({ top: 0, behavior: 'smooth' })
                                    }}>
                                        Log In
                                    </button>
                                </div>
                            }

                            <div className="headerCart" onClick={() => {
                                navigate("/cart")
                                setMenuHorizontalLine("")
                                window.scrollTo({ top: 0, behavior: 'smooth' })
                            }}>
                                <BsCartFill />
                                {cartIconQuantity > 0 ?
                                    <span className="cartItemsCount">
                                        {cartIconQuantity}
                                    </span> : ""
                                }
                            </div>
                        </div>
                        <div className="mobileMenu">
                            <div className="mobileHeaderIcons" onClick={() => setShowMenu(true)}><GiHamburgerMenu /></div>
                            {showMenu && <div className="menu">
                                <div className="crossMenu" onClick={() => setShowMenu(false)}>
                                    <RxCross2 />
                                </div>
                                <ul className="menuItems">
                                    <li onClick={() => {
                                        navigate('/')
                                        window.scrollTo({ top: 0, behavior: 'smooth' })
                                        setShowMenu(false)
                                    }}>Home</li>
                                    <li onClick={() => {
                                        navigate('/products')
                                        window.scrollTo({ top: 0, behavior: 'smooth' })
                                        setShowMenu(false)
                                    }}>Products</li>
                                    <li className='mobileHeaderLogin' style={{ border: localStorage.getItem('auth-token') ? '1px dotted #aaaa1e' : 'none' }}>
                                        {localStorage.getItem('auth-token') ?
                                            <span className='menuItemsIcon'>
                                                {localStorage.getItem('auth-token') && <span className="userName">  <FaUser />{userName}</span>}
                                                <button onClick={() => {
                                                    navigate('/login')
                                                    window.scrollTo({ top: 0, behavior: 'smooth' })
                                                    setShowMenu(false)
                                                    localStorage.removeItem('auth-token')
                                                }}>Log Out</button>
                                            </span> : <span className='menuItemsIcon'>
                                                <button onClick={() => {
                                                    navigate('/login')
                                                    window.scrollTo({ top: 0, behavior: 'smooth' })
                                                    setShowMenu(false)
                                                }}>Log In</button>
                                            </span>
                                        }
                                    </li>
                                    <li>
                                        <div className='menuCart' onClick={() => {
                                            navigate('/cart')
                                            window.scrollTo({ top: 0, behavior: 'smooth' })
                                            setShowMenu(false)
                                        }}>   <BsCartFill />
                                            {cartIconQuantity > 0 ?
                                                <span className="cartItemsCount">
                                                    {cartIconQuantity}
                                                </span> : ""
                                            }
                                        </div>
                                    </li>
                                </ul>
                            </div>}
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
