import axios from "axios";
import { createContext, useEffect, useState } from "react";

const AppContext = createContext();

const AppProvider = ({ children }) => {

    const API = process.env.REACT_APP_API

    const heading = "Lovable2Hearts"

    const about = "Your Ultimate Destination for Heartfelt Gifts and Home Treasures! Explore our curated collection of delightful home decor, stylish accents, and heartfelt gifts that celebrate love in every form. From cozy essentials to charming decor pieces, find everything you need to infuse warmth and joy into your home. Spread love and elevate your living space with Lovable2Hearts today!"

    const footerAbout = "Elevate your home with Lovable2Hearts – where love meets decor. Discover unique finds and heartfelt gifts to adorn every corner with warmth and style."

    const getLocalCartData = () => {
        const localCartData = localStorage.getItem("LocalStorageCartData");
        if (!localCartData || localCartData.length === 0) {
            return [];
        } else {
            try {
                const parsedData = JSON.parse(localCartData);
                if (Array.isArray(parsedData)) {
                    return parsedData;
                } else {
                    return [];
                }
            } catch (error) {
                console.error("Error parsing localCartData:", error);
                return [];
            }
        }
    }

    const [cartProductData, setCartProductData] = useState(getLocalCartData());
    const [cartItemQuantity, setCartItemQuantity] = useState(1);
    const [cartIconQuantity, setCartIconQuantity] = useState(0)
    const [productItemQuantity, setProductItemQuantity] = useState(1);
    const [showHeader, setShowHeader] = useState(true)
    const [menuHorizontalLine, setMenuHorizontalLine] = useState("home");
    const [userName, setUserName] = useState("")

    const handleDecrement = () => {
        const quantity = productItemQuantity;
        if (productItemQuantity > 1) {
            setCartItemQuantity(quantity - 1)
            setProductItemQuantity(quantity - 1)
        }
    }

    const handleIncrement = (product) => {
        const quantity = productItemQuantity;
        if (productItemQuantity < product.quantity) {
            setCartItemQuantity(quantity + 1)
            setProductItemQuantity(quantity + 1)
        }
    }

    const addUserCart = async (item, quantity, auth_token) => {
        try {
            await fetch(`${API}/addUserCart`, {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'auth-token': auth_token,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ itemId: item, quantity: quantity })
            }).then((res) => res.json())
                .then((data) => {
                    if (!data.success) console.error("Error in updating User Cart Data")
                })
        } catch (err) {
            console.log("Error in updating User Cart Data catch block", err)
        }
    };

    const handleAddToCart = (product, cartQuantity) => {
        cartQuantity = Array.isArray(cartQuantity) ? cartQuantity[0] : cartQuantity;

        let items = [...cartProductData];
        let index = items.findIndex(p => p.id === product.id);

        if (index !== -1) {
            if (items[index].cartQuantity + cartQuantity < product.quantity) {
                items[index].cartQuantity += cartQuantity;
                if (!items[index].cartQuantity) {
                    items[index].cartQuantity = 1;
                }
            }
        } else {
            product.cartQuantity = cartQuantity;
            items = [...items, product];
        }

        setCartProductData(items);

        if (localStorage.getItem('auth-token')) {
            addUserCart(product.id, cartQuantity, localStorage.getItem('auth-token'));
        }
    };


    const removeUserCart = async (item, auth_token) => {
        try {
            await fetch(`${API}/removeUserCart`, {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'auth-token': auth_token,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ itemId: item })
            })
                .then((res) => res.json())
                .then((data) => {
                    if (!data.success) console.error("Error in updating User Cart Data")
                });
        } catch (err) {
            console.error(err);
        }
    };


    const handleRemoveFromCart = (product) => {
        let items = [...cartProductData];
        items = items.filter(p => p.id !== product.id);
        setCartProductData(items)
        if (localStorage.getItem("auth-token")) {
            removeUserCart(product.id, localStorage.getItem('auth-token'))
        }
    }

    const handleCartProductQuantity = (type, product) => {
        let items = [...cartProductData];

        const index = items.findIndex(p => p.id === product.id);
        if (index >= 0) {
            if (type === "increment") {
                if (items[index].quantity > items[index].cartQuantity)
                    items[index].cartQuantity += 1;
            } else if (type === "decrement") {
                if (items[index].cartQuantity === 1) {
                    return;
                }
                items[index].cartQuantity -= 1;
            }
            setCartProductData(items);
        }
    };

    const clearUserCart = async () => {
        for (let i = 0; i < cartProductData.length; i++) {
            await removeUserCart(cartProductData[i].id, localStorage.getItem('auth-token'))
        }
    };


    const handleClearCart = () => {
        setCartProductData([])
        if (localStorage.getItem('auth-token')) {
            clearUserCart()
        }
    }

    useEffect(() => {
        localStorage.setItem("LocalStorageCartData", JSON.stringify(cartProductData));
    }, [cartProductData]);



    const [productData, setProductData] = useState([]);

    const getProductData = async (url) => {
        try {
            const res = await axios.get(url);
            if (Array.isArray(res.data)) {
                setProductData(res.data);
            } else {
                setProductData([res.data]);
            }
        } catch (error) {
            console.error('Error fetching products:', error);
            setProductData([]);
        }
        if (localStorage.getItem('auth-token')) {
            try {
                const response = await fetch(`${API}/getUserCart`, {
                    method: 'POST',
                    headers: {
                        Accept: 'application/json',
                        'auth-token': localStorage.getItem('auth-token'),
                        'Content-Type': 'application/json'
                    },
                });
                if (response.ok) {
                    const data = await response.json();
                    if (data.success) {
                        const cartDataEntries = Object.entries(data.cartData);
                        let newCartData = [];

                        for (let i = 0; i < cartDataEntries.length; i++) {
                            const [productId, cartQuantity] = cartDataEntries[i];
                            const productMatch = productData.find(product => {
                                return product.id === Number(productId);
                            });
                            if (productMatch) {
                                productMatch.cartQuantity = cartQuantity
                                newCartData.push(productMatch);
                            }
                        }
                        setCartProductData(newCartData);
                    }
                } else {
                    console.error('Failed to fetch user cart:', response.statusText);
                }
            } catch (err) {
                console.error('Error fetching user cart:', err);
            }
        } else {
        }
    };

    const fetchUserDetials = async (req, res) => {
        if (localStorage.getItem('auth-token'))
            try {
                const token = localStorage.getItem('auth-token');
                const response = await fetch(`${API}/getUserDetails`, {
                    method: 'GET',
                    headers: {
                        Accept: 'application/json',
                        'Content-Type': 'application/json',
                        'auth-token': token
                    }
                });
                const userData = await response.json();
                setUserName(userData.userName);
            } catch (err) {
                console.log(err);
            }
    }

    return <AppContext.Provider value={{
        heading,
        handleAddToCart,
        cartProductData,
        cartItemQuantity,
        setCartItemQuantity,
        handleDecrement,
        handleIncrement,
        handleCartProductQuantity,
        handleRemoveFromCart,
        handleClearCart,
        cartIconQuantity,
        setCartIconQuantity,
        productItemQuantity,
        setProductItemQuantity,
        showHeader,
        setShowHeader,
        menuHorizontalLine,
        setMenuHorizontalLine,
        productData,
        getProductData,
        API,
        userName,
        fetchUserDetials,
        about,
        footerAbout
    }}>{children}</AppContext.Provider>
}

export { AppProvider, AppContext }