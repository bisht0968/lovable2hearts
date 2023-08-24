import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useEffect } from "react";

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

function App() {

  useEffect(() => {
    document.title = 'Babsu Store - The only Store where you can buy for both';
  }, []);

  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/preference" element={<PreferenceDialogueBox />} />
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/products" element={<Products />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/singleproduct/:id" element={<SingleProduct />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="*" element={<ErrorPage />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
