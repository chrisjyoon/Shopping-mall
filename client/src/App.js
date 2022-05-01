import React, { Suspense } from 'react';
import {
  BrowserRouter,
  Route,
  Routes
} from "react-router-dom";

import LandingPage from './components/views/LandingPage/LandingPage'; 
import LoginPage from './components/views/LoginPage/LoginPage';
import RegisterPage from './components/views/RegisterPage/RegisterPage';
import NavBar from './components/views/NavBar/NavBar';
import UploadProductPage from './components/views/UploadProductPage/UploadProductPage';
import DetailProductPage from './components/views/DetailProductPage/DetailProductPage';
import CartPage from './components/views/CartPage/CartPage';
// import Auth from './hoc/auth';

import './App.css';

function App() {
  return (
    <Suspense fallback={(<div>Loading...</div>)}>
      <NavBar />
      <BrowserRouter>
          <Routes>
            <Route exact path="/" element={<LandingPage />} />
            <Route exact path="/login" element={<LoginPage />} />
            <Route exact path="/register" element={<RegisterPage />} />
            <Route exact path="/product/upload" element={<UploadProductPage />} />
            <Route exact path="/product/:productId" element={<DetailProductPage />} />
            <Route exact path="/user/cart" element={<CartPage />} />
          </Routes>
      </BrowserRouter>
    </Suspense>
  );
}

export default App;

