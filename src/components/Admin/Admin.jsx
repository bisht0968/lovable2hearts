import React, { useContext, useEffect, useState } from 'react'
import "./Admin.scss"
import AdminProducts from './AdminProducts/AdminProducts';
import AdminAddProducts from './AdminAddProducts/AdminAddProducts';
import AdminRemoveProducts from './AdminRemoveProducts/AdminRemoveProducts';
import AdminModifyProducts from './AdminModifyProducts/AdminModifyProducts';
import { AppContext } from '../../utils/Context';

export default function Admin() {

    const [showProductsList, setShowProductsList] = useState(true)
    const [showAddProducts, setShowAddProducts] = useState(false)
    const [showRemoveProducts, setShowRemoveProducts] = useState(false)
    const [showModifyProducts, setShowModifyProducts] = useState(false)
    const [activeStatus, setActiveStatus] = useState("products")

    const { heading, setShowHeader } = useContext(AppContext)

    useEffect(() => {
        setShowHeader(false)
    }, [])

    return (
        <div className='adminSection'>
            <div className="adminContent">
                <div className="adminWelcomeMessage">
                    Welcome To <span>{heading}hulalal </span>Store
                </div>
                <div className="adminPanelButtons">
                    <div className={`adminPanelButton  ${activeStatus === "products" ? "showActiveStatus" : ""}`} onClick={() => {
                        setShowProductsList(true)
                        setShowAddProducts(false)
                        setShowRemoveProducts(false)
                        setShowModifyProducts(false)
                        setActiveStatus("products")
                    }}>
                        Products
                    </div>
                    <div className={`adminPanelButton  ${activeStatus === "addProducts" ? "showActiveStatus" : ""}`} onClick={() => {
                        setShowProductsList(false)
                        setShowAddProducts(true)
                        setShowRemoveProducts(false)
                        setShowModifyProducts(false)
                        setActiveStatus("addProducts")
                    }}>
                        Add product
                    </div>
                    <div className={`adminPanelButton  ${activeStatus === "removeProducts" ? "showActiveStatus" : ""}`} onClick={() => {
                        setShowProductsList(false)
                        setShowAddProducts(false)
                        setShowRemoveProducts(true)
                        setShowModifyProducts(false)
                        setActiveStatus("removeProducts")
                    }}>
                        Remove Product
                    </div>
                    <div className={`adminPanelButton  ${activeStatus === "modifyProducts" ? "showActiveStatus" : ""}`} onClick={() => {
                        setShowProductsList(false)
                        setShowAddProducts(false)
                        setShowRemoveProducts(false)
                        setShowModifyProducts(true)
                        setActiveStatus("modifyProducts")
                    }}>
                        Modify Existing Product
                    </div>
                </div>
                <div className="adminPanelContainer">
                    {showProductsList && <AdminProducts />}
                    {showAddProducts && <AdminAddProducts />}
                    {showRemoveProducts && <AdminRemoveProducts />}
                    {showModifyProducts && <AdminModifyProducts />}
                </div>
            </div>
        </div>
    )
}
