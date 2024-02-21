import { createContext, useState } from "react";

const AuthContext = createContext({});

const AuthProvider = ({ children })=> {
    const [token, setToken] = useState(null);
    const [username, setUsername] = useState(null);
    const [loginSuccess, setLoginSuccess] = useState(false);
    const [cartItems, setCartItems] = useState([]);

    const login = (token, username) => {
        console.log('Welcome -> ', username);
        setToken(token);
        setUsername(username);
        setLoginSuccess(true);
    };

    const logout = () => {
        setToken(null);
        setUsername(null);
        setLoginSuccess(false);
        localStorage.removeItem("cartItems");
        setCartItems([]);
    };

    const isAuthenticated = () => {
        return username !== null;
      };

return(
        <AuthContext.Provider value={{token, username, loginSuccess, login, logout, isAuthenticated}}>
            {children}
        </AuthContext.Provider>
    );
};

export {AuthContext, AuthProvider};