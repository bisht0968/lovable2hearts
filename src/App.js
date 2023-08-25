import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useContext, useEffect } from "react";

import './App.css';

import Home from './components/Home/Home';
import About from './components/About/About';
import Products from './components/Products/Products';
import Contact from './components/Contact/Contact';
import SingleProduct from './components/SingleProduct/SingleProduct';
import Cart from './components/Cart/Cart';
import ErrorPage from './components/ErrorPage/ErrorPage';
import Header from "./components/Header/Header"
import Footer from './components/Footer/Footer';
import PreferenceDialogueBox from "./components/PreferenceDialogueBox/PreferenceDialogueBox";
import Admin from "./components/Admin/Admin";
import AdminSingleProduct from "./components/Admin/AdminSingleProduct/AdminSingleProduct";
import { AppContext } from "./utils/Context";

function App() {

  const { showHeader } = useContext(AppContext)

  useEffect(() => {
    document.title = 'Babsu Store - The only Store where you can buy for both';
  }, []);

  return (
    <BrowserRouter>
      {showHeader && <Header />}
      <Routes>
        <Route path="/" element={<PreferenceDialogueBox />} />
        <Route path="/home" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/products" element={<Products />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/singleproduct/:id" element={<SingleProduct />} />
        <Route path="/admin-single-product/:id" element={<AdminSingleProduct />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="*" element={<ErrorPage />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
