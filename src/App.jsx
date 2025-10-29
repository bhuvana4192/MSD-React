import { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./pages/Navbar";
import Home from "./pages/HomePage";
import Login from "./pages/Login";
import RegisterCook from "./pages/RegisterCook";
import ChefsPage from "./pages/ChefsPage";
import Cart from "./pages/Cart";

export default function App() {
  const [cartItems, setCartItems] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [cooks, setCooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(
    localStorage.getItem("isLoggedIn") === "true"
  );

  // Fetch cooks
  useEffect(() => {
    const fetchCooks = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/cooks");
        const data = await res.json();
        setCooks(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchCooks();
  }, []);

  const toggleCart = () => setIsCartOpen(!isCartOpen);

  const addToCart = (cook) => {
    const cookWithId = { ...cook, cartId: Date.now() };
    setCartItems((prev) => [...prev, cookWithId]);
    setIsCartOpen(true);
  };

  const removeFromCart = (cartId) => {
    setCartItems((prev) => prev.filter((item) => item.cartId !== cartId));
  };

  const registerCook = async (cookData) => {
    try {
      const payload = {
        ...cookData,
        price: Number(cookData.price),
        email: cookData.email.trim(),
        location: cookData.location.trim(),
        image: cookData.image || "",
      };

      const res = await fetch("http://localhost:5000/api/cooks", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) throw new Error("Failed to register cook");
      const savedCook = await res.json();
      setCooks((prev) => [...prev, savedCook]);
    } catch (err) {
      console.error(err);
      alert("Something went wrong!");
    }
  };

  return (
    <Router>
      {isLoggedIn && <Navbar cartItemsCount={cartItems.length} toggleCart={toggleCart} />}

      <Routes>
        <Route
          path="/login"
          element={<Login setIsLoggedIn={setIsLoggedIn} />}
        />

        <Route
          path="/"
          element={
            isLoggedIn ? (
              <Home />
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />

        <Route
          path="/register-cook"
          element={
            isLoggedIn ? (
              <RegisterCook onRegister={registerCook} />
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />

        <Route
          path="/chefs"
          element={
            isLoggedIn ? (
              <ChefsPage cooks={cooks} loading={loading} onAddToCart={addToCart} />
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />
      </Routes>

      {isCartOpen && (
        <Cart cartItems={cartItems} onClose={toggleCart} onRemove={removeFromCart} />
      )}
    </Router>
  );
}
