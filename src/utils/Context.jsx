import { createContext, useState } from "react";

const AppContext = createContext();


const AppProvider = ({ children }) => {

    const [cartProductData, setCartProductData] = useState([])
    const [cartItemQuantity, setCartItemQuantity] = useState(1);

    const handleDecrement = () => {
        const quantity = cartItemQuantity;
        if (cartItemQuantity > 1) {
            setCartItemQuantity(quantity - 1)
        }
    }

    const handleIncrement = () => {
        const quantity = cartItemQuantity;
        if (cartItemQuantity < 5) {
            setCartItemQuantity(quantity + 1)
        }
    }

    const handleAddToCart = (product, quantity) => {
        let items = [...cartProductData];
        let index = items.findIndex(p => p.id === product.id);
        if (index !== -1) {
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

    return <AppContext.Provider value={{
        handleAddToCart,
        cartProductData,
        cartItemQuantity,
        setCartItemQuantity,
        handleDecrement,
        handleIncrement,
        handleCartProductQuantity,
        handleRemoveFromCart,
        handleClearCart
    }}>{children}</AppContext.Provider>
}

export { AppProvider, AppContext }