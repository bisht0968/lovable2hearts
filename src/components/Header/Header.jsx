import React, { useContext, useEffect, useState } from 'react'

import "./Header.scss"
import { AppContext } from '../../utils/Context'

import { BiSolidUser, BiSearchAlt2 } from "react-icons/bi"
import { BsCartFill } from "react-icons/bs"
import { useNavigate } from 'react-router-dom'
import { GiHamburgerMenu } from "react-icons/gi"
import { RxCross2 } from "react-icons/rx"
import { IoMdTransgender } from "react-icons/io"
import { GiLovers } from "react-icons/gi"

export default function Header() {

    const { cartIconQuantity, pageSelect, handleGenderPage } = useContext(AppContext)

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

    return (
        <>
            <div className={`headerSection ${scrolled ? "stickyHeader" : ""}`}>
                <div className="headerContent">
                    <div className='headerLeft'>
                        <div className="headerLogo" onClick={() => {
                            navigate('/')
                            window.scrollTo({ top: 0, behavior: 'smooth' })
                        }}>
                            Babsu
                        </div>
                    </div>
                    <div className="headerRight">
                        <ul className='headerItems'>
                            <li onClick={() => {
                                navigate('/')
                                window.scrollTo({ top: 0, behavior: 'smooth' })
                            }}>HOME</li>
                            <li onClick={() => {
                                navigate('/about')
                                window.scrollTo({ top: 0, behavior: 'smooth' })
                            }}>ABOUT</li>
                            <li onClick={() => {
                                navigate('/products')
                                window.scrollTo({ top: 0, behavior: 'smooth' })
                            }}>PRODUCTS</li>
                            <li onClick={() => {
                                navigate('/contact')
                                window.scrollTo({ top: 0, behavior: 'smooth' })
                            }}>CONTACT</li>
                        </ul>
                        <div className="headerGenderSwitch" onClick={() => handleGenderPage()}>
                            {pageSelect === "lgbtq" ?
                                <>
                                    <span>Straight</span>
                                    <span><GiLovers /></span>
                                </>
                                :
                                <>
                                    <span>lgbtq</span>
                                    <span><IoMdTransgender /></span>
                                </>
                            }
                        </div>
                        <div className="headerIcons">
                            <div className="headerUser">
                                <BiSolidUser />
                            </div>
                            <div className="headerSearch">
                                <BiSearchAlt2 />
                            </div>
                            <div className="headerCart" onClick={() => {
                                navigate("/cart")
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
                                    }}>HOME</li>
                                    <li onClick={() => {
                                        navigate('/about')
                                        window.scrollTo({ top: 0, behavior: 'smooth' })
                                        setShowMenu(false)
                                    }}>ABOUT</li>
                                    <li onClick={() => {
                                        navigate('/products')
                                        window.scrollTo({ top: 0, behavior: 'smooth' })
                                        setShowMenu(false)
                                    }}>PRODUCTS</li>
                                    <li onClick={() => {
                                        navigate('/contact')
                                        window.scrollTo({ top: 0, behavior: 'smooth' })
                                        setShowMenu(false)
                                    }}>CONTACT</li>
                                    <li className='mobileHeaderLogin'>
                                        <span className='menuItemsIcon'><BiSolidUser /></span>
                                        <span className="menuItemsText">Log in</span>
                                    </li>
                                    <li>
                                        <span>  <BiSearchAlt2 /></span>
                                        <span className="menuItemsText">Search</span>
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
