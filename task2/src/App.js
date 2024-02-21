import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './Login';
import SignUp from './SignUp';
import LPApp1 from './landingPage/LPApp1';
import AuthContext, { AuthProvider } from './AuthProvider';

function App() {
return(
  <AuthProvider>  
  <Router>
  <Routes>
  <Route path="/signup" element={<SignUp />} />
  <Route path='/login' element={<Login />} />
  <Route path="/" element={<LPApp1 />} />
  </Routes>
</Router>
</AuthProvider>
);
}
export default App;

