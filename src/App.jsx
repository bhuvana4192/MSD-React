import { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./pages/Navbar";
import Home from "./pages/HomePage";
import Login from "./pages/Login";
import RegisterCook from "./pages/RegisterCook";
import ChefsPage from "./pages/ChefsPage";
import Cart from "./pages/Cart";

// ✅ Use your deployed backend URL
// ✅ For production (deployed backend)
const API_URL = "https://msd-react-hv9l-nunl5nkqu-bhuvana4192s-projects.vercel.app";



export default function App() {
  const [cartItems, setCartItems] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [cooks, setCooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem("loggedInUser"));

  // ✅ Fetch all cooks from your deployed backend
  useEffect(() => {
    const fetchCooks = async () => {
      try {
        const res = await fetch(`${API_URL}/api/cooks`);
        if (!res.ok) throw new Error("Failed to fetch cooks");
        const data = await res.json();
        setCooks(data);
      } catch (err) {
        console.error("Error fetching cooks:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchCooks();
  }, []);

  // 🛒 Cart Functions
  const toggleCart = () => setIsCartOpen(!isCartOpen);

  const addToCart = (cook) => {
    const cookWithId = { ...cook, cartId: Date.now() };
    setCartItems((prev) => [...prev, cookWithId]);
    setIsCartOpen(true);
  };

  const removeFromCart = (cartId) => {
    setCartItems((prev) => prev.filter((item) => item.cartId !== cartId));
  };

  // 👨‍🍳 Register a new cook
  const registerCook = async (cookData) => {
    try {
      const payload = {
        ...cookData,
        price: Number(cookData.price),
        email: cookData.email.trim(),
        location: cookData.location.trim(),
        image: cookData.image || "",
      };

      const res = await fetch(`${API_URL}/api/cooks`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const errText = await res.text();
        console.error("Server error:", errText);
        throw new Error("Failed to register cook");
      }

      const savedCook = await res.json();
      setCooks((prev) => [...prev, savedCook]);
      alert("Cook registered successfully!");
    } catch (err) {
      console.error("Error registering cook:", err);
      alert("Something went wrong!");
    }
  };

  // 🚪 Logout
  const handleLogout = () => {
    localStorage.removeItem("loggedInUser");
    setIsLoggedIn(false);
  };

  // 🧭 Render Routes
  return (
    <Router>
      {isLoggedIn && (
        <Navbar
          cartItemsCount={cartItems.length}
          toggleCart={toggleCart}
          onLogout={handleLogout}
        />
      )}

      <Routes>
        {!isLoggedIn ? (
          <Route path="*" element={<Login />} />
        ) : (
          <>
            <Route path="/" element={<Home />} />
            <Route
              path="/register-cook"
              element={<RegisterCook onRegister={registerCook} />}
            />
            <Route
              path="/chefs"
              element={
                <ChefsPage
                  cooks={cooks}
                  loading={loading}
                  onAddToCart={addToCart}
                />
              }
            />
            <Route path="/login" element={<Navigate to="/" />} />
          </>
        )}
      </Routes>

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
