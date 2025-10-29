import { useState } from "react";

export default function Cart({ cartItems, onClose, onRemove }) {
  const [showAddress, setShowAddress] = useState(false);
  const [showPayment, setShowPayment] = useState(false);
  const [address, setAddress] = useState({
    name: "",
    phone: "",
    street: "",
    city: "",
    pincode: "",
  });

  const total = cartItems.reduce((sum, item) => sum + Number(item.price || 0), 0);

  const handleBuyNow = () => {
    if (cartItems.length === 0) {
      alert("Your cart is empty!");
      return;
    }
    setShowAddress(true); // open address modal first
  };

  const handleAddressSubmit = (e) => {
    e.preventDefault();
    const { name, phone, street, city, pincode } = address;
    if (!name || !phone || !street || !city || !pincode) {
      alert("Please fill all address details.");
      return;
    }
    setShowAddress(false);
    setShowPayment(true); // proceed to payment
  };

  const handlePayment = (method) => {
    if (method === "COD") {
      alert(`✅ Order placed successfully using Cash on Delivery!\n\nDeliver to:\n${address.name}, ${address.street}, ${address.city} - ${address.pincode}`);
    } else if (method === "Online") {
      alert("💳 Redirecting to online payment gateway...");
    }
    setShowPayment(false);
    window.location.reload();
  };

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        background: "rgba(0,0,0,0.5)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 1000,
      }}
    >
      <div
        style={{
          width: 400,
          background: "white",
          borderRadius: 12,
          padding: 20,
          boxShadow: "0 4px 12px rgba(0,0,0,0.2)",
          maxHeight: "80%",
          overflowY: "auto",
          position: "relative",
        }}
      >
        <h3 style={{ marginBottom: 20 }}>🛒 Your Cart</h3>

        {cartItems.length === 0 ? (
          <p>No items in cart.</p>
        ) : (
          <ul style={{ listStyle: "none", padding: 0 }}>
            {cartItems.map((item) => (
              <li
                key={item.cartId}
                style={{
                  marginBottom: 15,
                  borderBottom: "1px solid #eee",
                  paddingBottom: 10,
                  display: "flex",
                  alignItems: "center",
                  gap: 10,
                }}
              >
                {item.image && (
                  <img
                    src={item.image}
                    alt={item.name}
                    style={{
                      width: 60,
                      height: 60,
                      borderRadius: 8,
                      objectFit: "cover",
                    }}
                  />
                )}
                <div style={{ flex: 1 }}>
                  <b>{item.name}</b>
                  <p style={{ margin: 2 }}>Speciality: {item.speciality}</p>
                  <p style={{ margin: 2 }}>Price: ₹{item.price}</p>
                </div>
                <button
                  onClick={() => onRemove(item.cartId)}
                  style={{
                    background: "#ff4444",
                    color: "white",
                    border: "none",
                    padding: "6px 12px",
                    borderRadius: 5,
                    cursor: "pointer",
                    height: 30,
                  }}
                >
                  Remove
                </button>
              </li>
            ))}
          </ul>
        )}

        {cartItems.length > 0 && (
          <>
            <h4 style={{ textAlign: "right", marginTop: 10 }}>
              Total: ₹{total.toFixed(2)}
            </h4>

            <button
              onClick={handleBuyNow}
              style={{
                marginTop: 10,
                backgroundColor: "#4CAF50",
                color: "white",
                border: "none",
                padding: "10px",
                width: "100%",
                borderRadius: 5,
                cursor: "pointer",
              }}
            >
              Buy Now
            </button>
          </>
        )}

        <button
          onClick={onClose}
          style={{
            marginTop: 15,
            backgroundColor: "#ff5722",
            color: "white",
            border: "none",
            padding: "10px",
            width: "100%",
            borderRadius: 5,
            cursor: "pointer",
          }}
        >
          Close
        </button>

        {/* ===== Address Modal ===== */}
        {showAddress && (
          <div
            style={{
              position: "fixed",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              background: "rgba(0,0,0,0.6)",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              zIndex: 1100,
            }}
          >
            <div
              style={{
                background: "white",
                padding: 25,
                borderRadius: 10,
                width: 350,
                boxShadow: "0 4px 15px rgba(0,0,0,0.3)",
              }}
            >
              <h3>Enter Delivery Address</h3>
              <form onSubmit={handleAddressSubmit}>
                <input
                  type="text"
                  placeholder="Full Name"
                  value={address.name}
                  onChange={(e) => setAddress({ ...address, name: e.target.value })}
                  style={{ width: "100%", padding: 8, margin: "5px 0" }}
                />
                <input
                  type="tel"
                  placeholder="Phone Number"
                  value={address.phone}
                  onChange={(e) => setAddress({ ...address, phone: e.target.value })}
                  style={{ width: "100%", padding: 8, margin: "5px 0" }}
                />
                <input
                  type="text"
                  placeholder="Street / Area"
                  value={address.street}
                  onChange={(e) => setAddress({ ...address, street: e.target.value })}
                  style={{ width: "100%", padding: 8, margin: "5px 0" }}
                />
                <input
                  type="text"
                  placeholder="City"
                  value={address.city}
                  onChange={(e) => setAddress({ ...address, city: e.target.value })}
                  style={{ width: "100%", padding: 8, margin: "5px 0" }}
                />
                <input
                  type="text"
                  placeholder="Pincode"
                  value={address.pincode}
                  onChange={(e) => setAddress({ ...address, pincode: e.target.value })}
                  style={{ width: "100%", padding: 8, margin: "5px 0" }}
                />

                <button
                  type="submit"
                  style={{
                    background: "#4CAF50",
                    color: "white",
                    border: "none",
                    padding: "10px",
                    width: "100%",
                    borderRadius: 5,
                    marginTop: 10,
                    cursor: "pointer",
                  }}
                >
                  Proceed to Payment
                </button>

                <button
                  type="button"
                  onClick={() => setShowAddress(false)}
                  style={{
                    background: "#ff4444",
                    color: "white",
                    border: "none",
                    padding: "10px",
                    width: "100%",
                    borderRadius: 5,
                    marginTop: 10,
                    cursor: "pointer",
                  }}
                >
                  Cancel
                </button>
              </form>
            </div>
          </div>
        )}

        {/* ===== Payment Modal ===== */}
        {showPayment && (
          <div
            style={{
              position: "fixed",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              background: "rgba(0,0,0,0.6)",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              zIndex: 1200,
            }}
          >
            <div
              style={{
                background: "white",
                padding: 25,
                borderRadius: 10,
                width: 300,
                textAlign: "center",
                boxShadow: "0 4px 15px rgba(0,0,0,0.3)",
              }}
            >
              <h3>Choose Payment Method</h3>
              <p>Total Amount: ₹{total.toFixed(2)}</p>

              <button
                onClick={() => handlePayment("COD")}
                style={{
                  background: "#2196F3",
                  color: "white",
                  border: "none",
                  padding: "10px",
                  width: "100%",
                  borderRadius: 5,
                  marginTop: 10,
                  cursor: "pointer",
                }}
              >
                Cash on Delivery
              </button>

              <button
                onClick={() => handlePayment("Online")}
                style={{
                  background: "#4CAF50",
                  color: "white",
                  border: "none",
                  padding: "10px",
                  width: "100%",
                  borderRadius: 5,
                  marginTop: 10,
                  cursor: "pointer",
                }}
              >
                Online Payment
              </button>

              <button
                onClick={() => setShowPayment(false)}
                style={{
                  background: "#ff4444",
                  color: "white",
                  border: "none",
                  padding: "10px",
                  width: "100%",
                  borderRadius: 5,
                  marginTop: 15,
                  cursor: "pointer",
                }}
              >
                Cancel
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
