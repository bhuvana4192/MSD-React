import { useState, useEffect } from "react";
import "./ChefsPage.css";

export default function ChefsPage({ onAddToCart }) {
  const [chefs, setChefs] = useState([]);

  // Load chefs from localStorage on component mount
  useEffect(() => {
    const storedCooks = JSON.parse(localStorage.getItem("cooks")) || [];
    setChefs(storedCooks);
  }, []);

  const handleAddToCart = (chef) => {
    onAddToCart(chef); 
  };

  return (
    <div className="chefs-page">
      <h2>Our Chefs</h2>
      {chefs.length === 0 ? (
        <p>No chefs registered yet.</p>
      ) : (
        <div className="chefs-list">
          {chefs.map((chef, i) => (
            <div className="chef-card" key={i}>
              {chef.image && (
                <img src={chef.image} alt={chef.speciality} />
              )}
              <h3>{chef.name}</h3>
              <p><strong>Speciality:</strong> {chef.speciality}</p>
              <p><strong>Email:</strong> {chef.email}</p>
              <p><strong>Location:</strong> {chef.location || "Not specified"}</p>
              <p><strong>Price:</strong> ₹{chef.price}</p>
              <button
                className="add-to-cart-btn"
                onClick={() => handleAddToCart(chef)}
              >
                Add to Cart
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
