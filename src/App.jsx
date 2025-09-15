import { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./pages/Navbar";
import Home from "./pages/HomePage";
import Login from "./pages/Login";
import RegisterCook from "./pages/RegisterCook";
import ChefsPage from "./pages/ChefsPage";
import Cart from "./pages/Cart";

export default function App() {
  const [cartItems, setCartItems] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [chefs, setChefs] = useState([]);

  // Load chefs from localStorage on app start
  useEffect(() => {
    const storedChefs = JSON.parse(localStorage.getItem("chefs")) || [];
    setChefs(storedChefs);
  }, []);

  const toggleCart = () => {
    setIsCartOpen(!isCartOpen);
  };
  const addToCart = (chef) => {
    const chefWithId = { ...chef, cartId: Date.now() }; // unique id
    setCartItems([...cartItems, chefWithId]);
    setIsCartOpen(true); 
  };
  const removeFromCart = (index) => {
    setCartItems(cartItems.filter((_, i) => i !== index));
  };

  // Register new cook
  const registerCook = (chef) => {
    const updatedChefs = [...chefs, chef];
    setChefs(updatedChefs);
    localStorage.setItem("chefs", JSON.stringify(updatedChefs));
  };

  return (
    <Router>
      <Navbar cartItemsCount={cartItems.length} toggleCart={toggleCart} />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route
          path="/register-cook"
          element={<RegisterCook onRegister={registerCook} />}
        />
        <Route
          path="/chefs"
          element={<ChefsPage chefs={chefs} onAddToCart={addToCart} />}
        />
      </Routes>

      {/* Cart Popup */}
      {isCartOpen && (
        <Cart
          cartItems={cartItems}
          onClose={toggleCart}
          onRemove={removeFromCart}
        />
      )}
    </Router>
  );
}
