import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useContext, useEffect, useState } from "react";

import './App.css';

import Home from './components/Home/Home';
import Products from './components/Products/Products';
import SingleProduct from './components/Products/SingleProduct/SingleProduct';
import Cart from './components/Cart/Cart';
import ErrorPage from './components/ErrorPage/ErrorPage';
import Header from "./components/Header/Header"
import Footer from './components/Footer/Footer';
import { AppContext } from "./utils/Context";
import SignUp from "./components/Login_SignUp/SignUp/SignUp.jsx";
import Login from "./components/Login_SignUp/Login/Login.jsx";


function App() {

  const { showHeader, heading } = useContext(AppContext)

  const [mobileLayout, setMobileLayout] = useState(true)

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 768) {
        setMobileLayout(true);
      } else {
        setMobileLayout(false);
      }
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    document.title = `${heading} - The only Store where you can buy for both`;
  }, []);

  return (
    <BrowserRouter>
      {showHeader && <Header />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<Products mobileLayout={mobileLayout} />} />
        <Route path="/singleproduct/:id" element={<SingleProduct />} />
        <Route path="/cart" element={<Cart mobileLayout={mobileLayout} />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
        <Route path="*" element={<ErrorPage />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
