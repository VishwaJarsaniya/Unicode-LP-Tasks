import React , {useContext, createContext, useState, useEffect} from "react";

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({children}) => {
    const [cartItems, setCartItems] = useState([]);

    const addToCart = (newItem) => {
        setCartItems((prevCartItems) => [...prevCartItems, newItem]);
        localStorage.setItem('cartItems', JSON.stringify([...cartItems, newItem]));
    };

    const removeFromCart = (itemId) => {
      const updatedCartItems = cartItems.filter(item => item.id !== itemId);
      setCartItems(updatedCartItems);
      localStorage.setItem('cartItems', JSON.stringify(updatedCartItems));
      };

    const getCartItems = () => {
        return cartItems;
    };

    useEffect(() => {
        // Retrieve cart items from localStorage on component mount
        const storedCartItems = localStorage.getItem('cartItems');
        if (storedCartItems) {
          setCartItems(JSON.parse(storedCartItems));
        }
      }, []);

    return(
        <CartContext.Provider value={{addToCart, getCartItems, removeFromCart}}>
            {children}
        </CartContext.Provider>
    );
};