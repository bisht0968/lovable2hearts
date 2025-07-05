import axios from "axios";
import { createContext, useEffect, useState } from "react";

const AppContext = createContext();

const AppProvider = ({ children }) => {
    const API = process.env.REACT_APP_API;
    const heading = "Lovable2Hearts";
    const about = "Your Ultimate Destination for Heartfelt Gifts and Home Treasures!..."; // Keep your existing text
    const footerAbout = "Elevate your home with Lovable2Hearts..."; // Keep your existing text

    // Safely get cart data from localStorage
    const getLocalCartData = () => {
        try {
            const localCartData = localStorage.getItem("LocalStorageCartData");
            return localCartData ? JSON.parse(localCartData) : [];
        } catch (error) {
            console.error("Error parsing cart data:", error);
            return [];
        }
    };

    const [cartProductData, setCartProductData] = useState(getLocalCartData());
    const [cartItemQuantity, setCartItemQuantity] = useState(1);
    const [cartIconQuantity, setCartIconQuantity] = useState(0);
    const [productItemQuantity, setProductItemQuantity] = useState(1);
    const [showHeader, setShowHeader] = useState(true);
    const [menuHorizontalLine, setMenuHorizontalLine] = useState("home");
    const [userName, setUserName] = useState("");
    const [productData, setProductData] = useState([]);

    // Validate product structure before adding to cart
    const validateProduct = (product) => {
        return {
            id: product.id,
            name: product.name || "Unnamed Product",
            price: product.price || 0,
            quantity: product.quantity || 1,
            image: product.image || [{ url: "" }], // Ensure image array exists
            cartQuantity: product.cartQuantity || 1
        };
    };

    const handleDecrement = () => {
        if (productItemQuantity > 1) {
            setCartItemQuantity(prev => prev - 1);
            setProductItemQuantity(prev => prev - 1);
        }
    };

    const handleIncrement = (product) => {
        if (productItemQuantity < (product?.quantity || 10)) { // Default max 10 if quantity missing
            setCartItemQuantity(prev => prev + 1);
            setProductItemQuantity(prev => prev + 1);
        }
    };

    // Updated addUserCart with better error handling
    const addUserCart = async (itemId, quantity, auth_token) => {
        try {
            const response = await fetch(`${API}/addUserCart`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'auth-token': auth_token
                },
                body: JSON.stringify({ itemId, quantity })
            });
            const data = await response.json();
            if (!data.success) console.error("Failed to update cart:", data.message);
        } catch (err) {
            console.error("Cart API error:", err);
        }
    };

    // Fixed handleAddToCart
    const handleAddToCart = (product, cartQuantity) => {
        const quantity = Array.isArray(cartQuantity) ? cartQuantity[0] : cartQuantity || 1;
        const validatedProduct = validateProduct(product);

        setCartProductData(prevItems => {
            const existingIndex = prevItems.findIndex(p => p.id === validatedProduct.id);

            if (existingIndex >= 0) {
                const updatedItems = [...prevItems];
                const newQuantity = updatedItems[existingIndex].cartQuantity + quantity;

                if (newQuantity <= (validatedProduct.quantity || 10)) {
                    updatedItems[existingIndex].cartQuantity = newQuantity;
                }
                return updatedItems;
            } else {
                return [...prevItems, { ...validatedProduct, cartQuantity: quantity }];
            }
        });

        if (localStorage.getItem('auth-token')) {
            addUserCart(validatedProduct.id, quantity, localStorage.getItem('auth-token'));
        }
    };

    // Updated remove functions
    const removeUserCart = async (itemId, auth_token) => {
        try {
            const response = await fetch(`${API}/removeUserCart`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'auth-token': auth_token
                },
                body: JSON.stringify({ itemId })
            });
            const data = await response.json();
            if (!data.success) console.error("Failed to remove item:", data.message);
        } catch (err) {
            console.error("Remove API error:", err);
        }
    };

    const handleRemoveFromCart = (product) => {
        setCartProductData(prev => prev.filter(p => p.id !== product.id));
        if (localStorage.getItem('auth-token')) {
            removeUserCart(product.id, localStorage.getItem('auth-token'));
        }
    };

    // Safer cart quantity updates
    const handleCartProductQuantity = (type, product) => {
        setCartProductData(prev => {
            return prev.map(item => {
                if (item.id === product.id) {
                    const newQuantity = type === "increment"
                        ? Math.min(item.cartQuantity + 1, item.quantity || 10)
                        : Math.max(item.cartQuantity - 1, 1);

                    return { ...item, cartQuantity: newQuantity };
                }
                return item;
            });
        });
    };

    // Persist cart to localStorage
    useEffect(() => {
        localStorage.setItem("LocalStorageCartData", JSON.stringify(cartProductData));
        setCartIconQuantity(cartProductData.length);
    }, [cartProductData]);

    // Fetch product data with error handling
    const getProductData = async (url) => {
        try {
            const res = await axios.get(url);
            const data = Array.isArray(res.data) ? res.data : [res.data];
            setProductData(data);

            // Sync with user cart if logged in
            if (localStorage.getItem('auth-token')) {
                const cartResponse = await fetch(`${API}/getUserCart`, {
                    method: 'POST',
                    headers: {
                        'auth-token': localStorage.getItem('auth-token')
                    }
                });

                if (cartResponse.ok) {
                    const cartData = await cartResponse.json();
                    if (cartData.success) {
                        const userCartItems = Object.entries(cartData.cartData)
                            .map(([id, qty]) => {
                                const product = data.find(p => p.id === Number(id));
                                return product ? { ...validateProduct(product), cartQuantity: qty } : null;
                            })
                            .filter(Boolean);

                        setCartProductData(userCartItems);
                    }
                }
            }
        } catch (error) {
            console.error("Data fetch error:", error);
        }
    };

    // Fetch user details
    const fetchUserDetials = async () => {
        if (!localStorage.getItem('auth-token')) return;

        try {
            const response = await fetch(`${API}/getUserDetails`, {
                headers: {
                    'auth-token': localStorage.getItem('auth-token')
                }
            });
            const userData = await response.json();
            setUserName(userData?.userName || "");
        } catch (err) {
            console.error("User details error:", err);
        }
    };

    return (
        <AppContext.Provider value={{
            heading,
            about,
            footerAbout,
            API,
            // State
            cartProductData,
            cartItemQuantity,
            cartIconQuantity,
            productItemQuantity,
            showHeader,
            menuHorizontalLine,
            productData,
            userName,
            // Handlers
            handleAddToCart,
            handleRemoveFromCart,
            handleClearCart: () => {
                setCartProductData([]);
                if (localStorage.getItem('auth-token')) {
                    cartProductData.forEach(item => {
                        removeUserCart(item.id, localStorage.getItem('auth-token'));
                    });
                }
            },
            handleCartProductQuantity,
            handleDecrement,
            handleIncrement,
            setCartIconQuantity,
            setProductItemQuantity,
            setShowHeader,
            setMenuHorizontalLine,
            getProductData,
            fetchUserDetials
        }}>
            {children}
        </AppContext.Provider>
    );
};

export { AppProvider, AppContext };