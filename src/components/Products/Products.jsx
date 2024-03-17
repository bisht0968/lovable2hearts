import React, { useState, useEffect, useContext } from 'react'

import "./Products.scss"

import Product from "./Product/Product"

import { BsFillGridFill, BsList, BsSearch } from "react-icons/bs"
import { RxCross2 } from "react-icons/rx"
import { MdKeyboardArrowRight, MdKeyboardArrowLeft } from "react-icons/md";


import { AppContext } from '../../utils/Context';

export default function Products({ mobileLayout }) {

    const [filteredProductData, setFilteredProductData] = useState([]);
    const [gridLayout, setGridLayout] = useState(true);
    const [sortedValue, setSortedValue] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("");
    const [text, setText] = useState("");
    const [categoryMenuActivated, setCategoryMenuActivated] = useState("all");
    const [showMobileFilter, setShowMobileFilter] = useState(false)
    const { productData, getProductData, API } = useContext(AppContext)

    const newAPI = `${API}/allproducts`

    useEffect(() => {
        getProductData(newAPI)
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

        setCurrentProducts(sortedData);
    }, [sortedValue, productData]);

    const filterByCategory = (category) => {
        if (category === "all") {
            setSelectedCategory("all")
        } else {
            setSelectedCategory(category)
        }
    }

    const [currentProducts, setCurrentProducts] = useState([])
    useEffect(() => {
        if (selectedCategory === "all") {
            const newCurrentProducts = productData.slice(indexOfFirstProduct, indexOfLastProduct);

            setCurrentProducts(newCurrentProducts);
        } else {
            const filteredData = productData.filter(product => product.category === selectedCategory);
            setCurrentProducts(filteredData);
        }
    }, [selectedCategory]);

    const updateSearchValue = (event) => {
        const value = event.target.value;
        setText(value)
    }

    const [currentPage, setCurrentPage] = useState(1);
    const productsPerPage = 9;


    const nextPage = () => setCurrentPage(currentPage + 1);
    const prevPage = () => setCurrentPage(currentPage - 1);
    const indexOfLastProduct = currentPage * productsPerPage;
    const indexOfFirstProduct = indexOfLastProduct - productsPerPage;


    useEffect(() => {
        const filteredData = productData.filter((element) => {
            return element.name && element.name.toLowerCase().includes(text.toLowerCase());
        });
        setFilteredProductData(filteredData);

        const newCurrentProducts = filteredData.length === 0 && text === ""
            ? productData.slice(indexOfFirstProduct, indexOfLastProduct)
            : filteredData.slice(indexOfFirstProduct, indexOfLastProduct);

        setCurrentProducts(newCurrentProducts);
    }, [text, productData, indexOfFirstProduct, indexOfLastProduct]);


    const handleClearFilters = () => {
        setText("")
        setSelectedCategory("all")
        setSortedValue("")
        setCategoryMenuActivated("all")
        setSortedValue("")
    }

    useEffect(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }, [currentPage]);

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
                            <div className="searchIcon">
                                <BsSearch />
                            </div>
                        </div>
                        <div className="categoryFilter">
                            <div className="title">
                                Category
                            </div>
                            <ul className="categoryMenu">
                                <li className={`${categoryMenuActivated === "all" ? "categoryMenuActive" : ""}`} onClick={() => {
                                    filterByCategory("all")
                                    setCategoryMenuActivated("all")
                                }}>
                                    All
                                </li>

                                <li className={`${categoryMenuActivated === "Kid" ? "categoryMenuActive" : ""}`} onClick={() => {
                                    filterByCategory("Kid")
                                    setCategoryMenuActivated("Kid")
                                }}>
                                    Kid
                                </li>
                                <li className={`${categoryMenuActivated === "Men" ? "categoryMenuActive" : ""}`} onClick={() => {
                                    filterByCategory("Men")
                                    setCategoryMenuActivated("Men")
                                }}>
                                    Men
                                </li>
                                <li className={`${categoryMenuActivated === "Women" ? "categoryMenuActive" : ""}`} onClick={() => {
                                    filterByCategory("Women")
                                    setCategoryMenuActivated("Women")
                                }}>
                                    Women
                                </li>
                            </ul>
                        </div>
                        < div className="clearFilters">
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
                                    <div className="searchIcon">
                                        <BsSearch />
                                    </div>
                                </div>
                                <div className="categoryFilter">
                                    <div className="title">
                                        Category
                                    </div>
                                    <ul className="categoryMenu">
                                        <li className={`${categoryMenuActivated === "all" ? "categoryMenuActive" : ""}`} onClick={() => {
                                            filterByCategory("all")
                                            setCategoryMenuActivated("all")
                                            setShowMobileFilter(false)
                                        }}>
                                            All
                                        </li>
                                        <li className={`${categoryMenuActivated === "Kid" ? "categoryMenuActive" : ""}`} onClick={() => {
                                            filterByCategory("Kid")
                                            setCategoryMenuActivated("Kid")
                                            setShowMobileFilter(false)
                                        }}>
                                            Kid
                                        </li>
                                        <li className={`${categoryMenuActivated === "Men" ? "categoryMenuActive" : ""}`} onClick={() => {
                                            filterByCategory("Men")
                                            setCategoryMenuActivated("Men")
                                            setShowMobileFilter(false)
                                        }}>
                                            Men
                                        </li>
                                        <li className={`${categoryMenuActivated === "Women" ? "categoryMenuActive" : ""}`} onClick={() => {
                                            filterByCategory("Women")
                                            setCategoryMenuActivated("Women")
                                            setShowMobileFilter(false)
                                        }}>
                                            Women
                                        </li>
                                    </ul>
                                </div>
                                <div className="clearFilters">
                                    <div className="clearFilterButton" onClick={() => {
                                        handleClearFilters()
                                        setShowMobileFilter(false)
                                    }}>
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
                            {currentProducts.length === 0 ? 0 : currentProducts.length} / {filteredProductData.length} total products.
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
                            {currentProducts.length === 0
                                ? <></>
                                : currentProducts?.map(data => (
                                    <div className="productsItemGridLayout" key={data.id}>
                                        <Product productDetailsData={data} gridLayout={gridLayout} />
                                    </div>
                                ))}

                        </div>
                    ) : (
                        <div className="productsContainerListLayout">
                            {currentProducts.length === 0
                                ? <></>
                                : currentProducts?.map(data => (
                                    <div className="productsItemListLayout" key={data.id}>
                                        <Product productDetailsData={data} gridLayout={gridLayout} />
                                    </div>
                                ))}
                        </div>
                    )}
                    <div className="pagination">
                        <button onClick={prevPage} disabled={currentPage === 1}>
                            <MdKeyboardArrowLeft />
                        </button>
                        <button onClick={nextPage} disabled={currentProducts.length < productsPerPage}>
                            <MdKeyboardArrowRight />
                        </button>
                    </div>
                </div>
            </div >
        </div >
    )
}