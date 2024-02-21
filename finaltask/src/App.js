import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './Login_Signup/Login';
import SignUp from './Login_Signup/SignUp';
import Home from './Pages/Home';
import Product from './Products/indivProduct';
import Cart from './Products/Cart';
import AuthContext, { AuthProvider } from './Login_Signup/AuthProvider';
import Fashion from './Pages/Fashion';
import Grocery from './Pages/Grocery';
import Furniture from './Pages/Furniture';
import Electronics from './Pages/Electronics';
import MenFashion from './Pages/MenFashion';
import WomenFashion from './Pages/WomenFashion';
import SummerFashion from './Pages/SummerFashion';
import { CartProvider } from './Products/CartContext';

function App() {

  const [cartItems, setcartItems] = useState([]);
 
  console.log("App - " , cartItems);

  return (
    <AuthProvider> 
    <CartProvider>
    <Router>
    <Routes>
    <Route path="/signup" element={<SignUp />} />
    <Route path='/login' element={<Login />} />
    <Route path="/" element={<Home />} />
    <Route path="/product/:id" element={<Product/>} />
    <Route path="/cart" element={<Cart cartItems={cartItems}/>}   />
    <Route path="/fashion" element={<Fashion />} />
    <Route path="/grocery" element={<Grocery />} />
    <Route path="/furniture" element={<Furniture />} />
    <Route path="/elec" element={<Electronics />} />
    <Route path="/menFashion" element={<MenFashion />} />
    <Route path="/womenFashion" element={<WomenFashion />} />
    <Route path="/summerFashion" element={<SummerFashion />} />
    </Routes>
  </Router>
  </CartProvider> 
  </AuthProvider>
  );
}

export default App;
