import { createContext, useEffect, useState } from "react";

const AppContext = createContext();

const AppProvider = ({ children }) => {

    const getLocalCartData = () => {
        const localCartData = localStorage.getItem("LocalStorageCartData");

        if (!localCartData || localCartData.length === 0) {
            return [];
        } else {
            return JSON.parse(localCartData);
        }
    }

    const [cartProductData, setCartProductData] = useState(getLocalCartData());
    const [cartItemQuantity, setCartItemQuantity] = useState(1);
    const [cartIconQuantity, setCartIconQuantity] = useState(0)
    const [productItemQuantity, setProductItemQuantity] = useState(1);
    const [pageSelect, setPageSelect] = useState("straight");

    const handleDecrement = () => {
        const quantity = productItemQuantity;
        if (productItemQuantity > 1) {
            setCartItemQuantity(quantity - 1)
            setProductItemQuantity(quantity - 1)
        }
    }

    const handleIncrement = (product) => {
        const quantity = productItemQuantity;
        if (productItemQuantity <= product.stock) {
            setCartItemQuantity(quantity + 1)
            setProductItemQuantity(quantity + 1)
        }
    }

    const handleAddToCart = (product, quantity) => {
        let items = [...cartProductData];
        let index = items.findIndex(p => p.id === product.id);
        if (index !== -1) {
            if (items[index].quantity <= product.stock)
                items[index].quantity += quantity;
        } else {
            product.quantity = quantity;
            items = [...items, product]
        }
        setCartProductData(items)
    }

    const handleRemoveFromCart = (product) => {
        let items = [...cartProductData];
        items = items.filter(p => p.id !== product.id);
        setCartProductData(items)
    }

    const handleCartProductQuantity = (type, product) => {
        let items = [...cartProductData];

        const index = items.findIndex(p => p.id === product.id);
        if (index >= 0) {
            if (type === "increment") {
                if (items[index].stock >= items[index].quantity)
                    items[index].quantity += 1;
            } else if (type === "decrement") {
                if (items[index].quantity === 1) {
                    return;
                }
                items[index].quantity -= 1;
            }
            setCartProductData(items);
        }
    };

    const handleClearCart = () => {
        setCartProductData([])
    }

    const handleGenderPage = () => {
        if (pageSelect === "straight") setPageSelect("lgbtq")
        else setPageSelect("straight")
    }

    useEffect(() => {
        localStorage.setItem("LocalStorageCartData", JSON.stringify(cartProductData));
    }, [cartProductData]);


    return <AppContext.Provider value={{
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
        pageSelect,
        handleGenderPage,
        setPageSelect
    }}>{children}</AppContext.Provider>
}

export { AppProvider, AppContext }