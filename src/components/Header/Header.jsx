import React from 'react'
import "./Header.scss"
import { BiSolidUser, BiSearchAlt2 } from "react-icons/bi"
import { BsCartFill } from "react-icons/bs"

export default function Header() {
    return (
        <div className='headerSection'>
            <div className="headerContent">
                <div className='headerLeft'>
                    <div className="headerLogo">
                        logo
                    </div>
                </div>
                <div className="headerRight">
                    <ul className='headerItems'>
                        <li>ITEM1</li>
                        <li>ITEM2</li>
                        <li>ITEM3</li>
                    </ul>
                    <div className="headerIcons">
                        <div className="headerUser">
                            <BiSolidUser />
                        </div>
                        <div className="headerSearch">
                            <BiSearchAlt2 />
                        </div>
                        <div className="headerCart">
                            <BsCartFill />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
