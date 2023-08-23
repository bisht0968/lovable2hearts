import React, { useState, useEffect } from 'react'
import axios from 'axios';

import "./Products.scss"

import Product from "./Product/Product"

import { BsFillGridFill, BsList, BsSearch } from "react-icons/bs"
import { RxCross2 } from "react-icons/rx"

export default function Products() {

    const API = "https://api.pujakaitem.com/api/products"

    const [productData, setProductData] = useState([]);
    const [filteredProductData, setFilteredProductData] = useState([]);
    const [gridLayout, setGridLayout] = useState(true);
    const [sortedValue, setSortedValue] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("");
    const [selectedCompnayCategory, setSelectedCompnayCategory] = useState("");
    const [text, setText] = useState("");
    const [categoryMenuActivated, setCategoryMenuActivated] = useState("all");
    const [mobileLayout, setMobileLayout] = useState(true)
    const [showMobileFilter, setShowMobileFilter] = useState(false)

    const getProductData = async (url) => {
        try {
            const res = await axios.get(url)
            const limitedData = res.data.slice(0, 12)
            setProductData(limitedData)
        } catch (error) {
            console.error('Error fetching products:', error);
        }
    }

    useEffect(() => {
        getProductData(API)
    }, [])

    const handleSorting = () => {
        const userSortedValue = document.getElementById("sort");
        const sortValue = userSortedValue.options[userSortedValue.selectedIndex].value;
        setSortedValue(sortValue)
    }

    useEffect(() => {
        let sortedData = [...productData];

        if (sortedValue === "lowest") {
            sortedData.sort((a, b) => a.price - b.price);
        } else if (sortedValue === "highest") {
            sortedData.sort((a, b) => b.price - a.price);
        } else if (sortedValue === "ascending") {
            sortedData.sort((a, b) => a.name.localeCompare(b.name));
        } else if (sortedValue === "descending") {
            sortedData.sort((a, b) => b.name.localeCompare(a.name));
        }

        setFilteredProductData(sortedData);
    }, [sortedValue, productData]);

    const filterByCategory = (category) => {
        if (category === "") {
            setSelectedCategory("")
        } else {
            setSelectedCategory(category)
        }
    }

    useEffect(() => {
        if (selectedCategory === "") {
            setFilteredProductData([]);
            getProductData(API)
        } else {
            const filteredData = productData.filter(product => product.category === selectedCategory);
            setFilteredProductData(filteredData)
        }
    }, [selectedCategory]);

    const updateSearchValue = (event) => {
        const value = event.target.value;
        if (value === "") {
            setText("")
        } else {
            setText(value)
        }
    }

    useEffect(() => {
        if (text === "") {
            setFilteredProductData([])
            getProductData(API)
        } else {
            const filteredData = productData.filter((element) => {
                return element.name.toLowerCase().includes(text)
            })
            setFilteredProductData(filteredData)
        }
    }, [text])

    const handleCompanySorting = () => {
        const userSortedCompanyValue = document.getElementById("companySort");
        const sortedCompanyValue = userSortedCompanyValue.options[userSortedCompanyValue.selectedIndex].value;
        setSelectedCompnayCategory(sortedCompanyValue)
    }

    useEffect(() => {
        if (selectedCompnayCategory === "all") {
            setFilteredProductData([])
            getProductData(API)
        } else {
            const filteredData = productData.filter(product => product.company === selectedCompnayCategory);
            setFilteredProductData(filteredData)
        }
    }, [selectedCompnayCategory])

    const handleClearFilters = () => {
        setSelectedCompnayCategory("all")
        setText("")
        setSelectedCategory("")
        setSortedValue("")
        setCategoryMenuActivated("all")
        setSortedValue("")
    }

    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth <= 768) {
                setMobileLayout(true);
            } else {
                setMobileLayout(false);
            }
        };
        handleResize();
        window.addEventListener("resize", handleResize);
        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, []);

    return (
        <div className='productsSection'>
            <div className="productsContent">
                {!mobileLayout ?
                    <div className="productsLeft">
                        <div className="searchBar">
                            <form onSubmit={(e) => e.preventDefault()}>
                                <input type="text" placeholder='Search' onChange={updateSearchValue} value={text}
                                    name='searchText' />
                            </form>
                            <div className="searcIcon">
                                <BsSearch />
                            </div>
                        </div>
                        <div className="categoryFilter">
                            <div className="title">
                                Category
                            </div>
                            <ul className="categoryMenu">
                                <li className={`${categoryMenuActivated === "all" ? "categoryMenuActive" : ""}`} onClick={() => {
                                    filterByCategory("")
                                    setCategoryMenuActivated("all")
                                }}>
                                    All
                                </li>
                                <li className={`${categoryMenuActivated === "mobile" ? "categoryMenuActive" : ""}`} onClick={() => {
                                    filterByCategory("mobile")
                                    setCategoryMenuActivated("mobile")
                                }}>
                                    Mobile
                                </li>
                                <li className={`${categoryMenuActivated === "laptop" ? "categoryMenuActive" : ""}`} onClick={() => {
                                    filterByCategory("laptop")
                                    setCategoryMenuActivated("laptop")
                                }}>
                                    Laptop
                                </li>
                                <li className={`${categoryMenuActivated === "computer" ? "categoryMenuActive" : ""}`} onClick={() => {
                                    filterByCategory("computer")
                                    setCategoryMenuActivated("computer")
                                }}>
                                    Computer
                                </li>
                                <li className={`${categoryMenuActivated === "accessories" ? "categoryMenuActive" : ""}`} onClick={() => {
                                    filterByCategory("accessories")
                                    setCategoryMenuActivated("accessories")
                                }}>
                                    Accessories
                                </li>
                                <li className={`${categoryMenuActivated === "watch" ? "categoryMenuActive" : ""}`} onClick={() => {
                                    filterByCategory("watch")
                                    setCategoryMenuActivated("watch")
                                }}>
                                    Watch
                                </li>
                            </ul>
                        </div>
                        <div className="companyFilter">
                            <div className="title">
                                Company
                            </div>
                            <div className="companyDropdown">
                                <form action="#">
                                    <select name="companySort" id="companySort" onChange={handleCompanySorting} value={selectedCompnayCategory} >
                                        <option value="all">All</option>
                                        {productData.map(data => (
                                            <option value={data.company} key={data.id} >{data.company}</option>
                                        ))}
                                    </select>
                                </form>
                            </div>
                        </div>

                        {/* <div className="priceFilter">
                            <div className="heading">
                                Price
                            </div>
                            <div className="maxPriceValue" >
                                {Intl.NumberFormat("en-IN", {
                                    style: "currency",
                                    currency: "INR",
                                    maximumFractionDigits: 2
                                }).format(price / 100)}
                            </div>
                            <div className="priceRangeDragger">
                                <input type="range" step={1} min={minPrice} max={maxPrice} onChange={handlePriceFilterValue} value={price} />
                            </div>
                        </div> */}

                        <div className="clearFilters">
                            <div className="clearFilterButton" onClick={handleClearFilters}>
                                Clear Filters
                            </div>
                        </div>
                    </div>
                    :
                    <>
                        <div className="prodcutsMobileFilterButton" onClick={() => setShowMobileFilter(true)}>
                            Filters
                        </div>
                        {showMobileFilter ?
                            <div className='mobileFilterLayout'>
                                <div className="mobileFilterHeading">
                                    <span className="text">
                                        Filters
                                    </span>
                                    <span className="crossIcon" onClick={() => { setShowMobileFilter(false) }}>
                                        <RxCross2 />
                                    </span>
                                </div>
                                <div className="searchBar">
                                    <form onSubmit={(e) => e.preventDefault()}>
                                        <input type="text" placeholder='Search' onChange={updateSearchValue} value={text}
                                            name='searchText' />
                                    </form>
                                    <div className="searcIcon">
                                        <BsSearch />
                                    </div>
                                </div>
                                <div className="categoryFilter">
                                    <div className="title">
                                        Category
                                    </div>
                                    <ul className="categoryMenu">
                                        <li className={`${categoryMenuActivated === "all" ? "categoryMenuActive" : ""}`} onClick={() => {
                                            filterByCategory("")
                                            setCategoryMenuActivated("all")
                                            setShowMobileFilter(false)
                                        }}>
                                            All
                                        </li>
                                        <li className={`${categoryMenuActivated === "mobile" ? "categoryMenuActive" : ""}`} onClick={() => {
                                            filterByCategory("mobile")
                                            setCategoryMenuActivated("mobile")
                                            setShowMobileFilter(false)
                                        }}>
                                            Mobile
                                        </li>
                                        <li className={`${categoryMenuActivated === "laptop" ? "categoryMenuActive" : ""}`} onClick={() => {
                                            filterByCategory("laptop")
                                            setCategoryMenuActivated("laptop")
                                            setShowMobileFilter(false)
                                        }}>
                                            Laptop
                                        </li>
                                        <li className={`${categoryMenuActivated === "computer" ? "categoryMenuActive" : ""}`} onClick={() => {
                                            filterByCategory("computer")
                                            setCategoryMenuActivated("computer")
                                            setShowMobileFilter(false)
                                        }}>
                                            Computer
                                        </li>
                                        <li className={`${categoryMenuActivated === "accessories" ? "categoryMenuActive" : ""}`} onClick={() => {
                                            filterByCategory("accessories")
                                            setCategoryMenuActivated("accessories")
                                            setShowMobileFilter(false)
                                        }}>
                                            Accessories
                                        </li>
                                        <li className={`${categoryMenuActivated === "watch" ? "categoryMenuActive" : ""}`} onClick={() => {
                                            filterByCategory("watch")
                                            setCategoryMenuActivated("watch")
                                            setShowMobileFilter(false)
                                        }}>
                                            Watch
                                        </li>
                                    </ul>
                                </div>
                                <div className="companyFilter">
                                    <div className="title">
                                        Company
                                    </div>
                                    <div className="companyDropdown">
                                        <form action="#">
                                            <select name="companySort" id="companySort" onChange={handleCompanySorting} value={selectedCompnayCategory} >
                                                <option value="all">All</option>
                                                {productData.map(data => (
                                                    <option value={data.company} key={data.id} >{data.company}</option>
                                                ))}
                                            </select>
                                        </form>
                                    </div>
                                </div>
                                <div className="clearFilters">
                                    <div className="clearFilterButton" onClick={handleClearFilters}>
                                        Clear Filters
                                    </div>
                                </div>
                            </div>
                            : ""}
                    </>
                }
                <div className="productsRight">
                    <div className="productsFilterRight">
                        <div className="layoutSwitchButtons">
                            <div className={`layoutButton ${gridLayout ? "backgroundColor" : ""}`} onClick={() => setGridLayout(true)} >
                                <BsFillGridFill />
                            </div>
                            <div className={`layoutButton ${!gridLayout ? "backgroundColor" : ""}`} onClick={() => setGridLayout(false)}>
                                <BsList />
                            </div>
                        </div>
                        <div className="productsQuantity">
                            {filteredProductData.length === 0 ? productData.length : filteredProductData.length} total products.
                        </div>
                        <div className="filterDropdown">
                            <form action="#">
                                <select name="sort" id="sort" onChange={handleSorting} value={sortedValue}>
                                    <option value="">
                                        Select Category
                                    </option>
                                    <option value="lowest">
                                        Price (lowest)
                                    </option>
                                    <option value="highest">
                                        Price (highest)
                                    </option>
                                    <option value="ascending">
                                        Price (a-z)
                                    </option>
                                    <option value="descending">
                                        Price (z-a)
                                    </option>
                                </select>
                            </form>
                        </div>
                    </div>
                    {gridLayout ? (
                        <div className="productsContainerGridLayout">
                            {filteredProductData.length === 0
                                ? productData.map(data => (
                                    <div className="productsItemGridLayout" key={data.id}>
                                        <Product productDetailsData={data} gridLayout={gridLayout} />
                                    </div>
                                ))
                                : filteredProductData.map(data => (
                                    <div className="productsItemGridLayout" key={data.id}>
                                        <Product productDetailsData={data} gridLayout={gridLayout} />
                                    </div>
                                ))}
                        </div>
                    ) : (
                        <div className="productsContainerListLayout">
                            {filteredProductData.length === 0
                                ? productData.map(data => (
                                    <div className="productsItemListLayout" key={data.id}>
                                        <Product productDetailsData={data} gridLayout={gridLayout} />
                                    </div>
                                ))
                                : filteredProductData.map(data => (
                                    <div className="productsItemListLayout" key={data.id}>
                                        <Product productDetailsData={data} gridLayout={gridLayout} />
                                    </div>
                                ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}