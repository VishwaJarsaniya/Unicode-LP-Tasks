import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './Login';
import SignUp from './SignUp';
import AuthContext, { AuthProvider } from './AuthProvider';

function App() {
return(
  <AuthProvider>  
  <Router>
  <Routes>
  <Route path="/signup" element={<SignUp />} />
  <Route path="/" element={<Login />} />
  </Routes>
</Router>
</AuthProvider>
);
}
export default App;

