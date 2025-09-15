export default function Cart({ cartItems, onClose, onRemove }) {
 const total = cartItems.reduce((sum, item) => sum + Number(item.price || 0), 0);
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
        }}
      >
        <h3 style={{ marginBottom: 20 }}>🛒 Your Cart</h3>

        {cartItems.length === 0 ? (
          <p>No items in cart.</p>
        ) : (
          <ul style={{ listStyle: "none", padding: 0 }}>
            {cartItems.map((item, i) => (
              <li
                key={item.cartId || i} // unique key
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
                    style={{ width: 60, height: 60, borderRadius: 8, objectFit: "cover" }}
                  />
                )}
                <div style={{ flex: 1 }}>
                  <b>{item.name}</b>
                  <p style={{ margin: 2 }}>Speciality: {item.speciality}</p>
                  <p style={{ margin: 2 }}>Price: ₹{item.price}</p>
                </div>
                <button
                  onClick={() => onRemove(i)}
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
          <h4 style={{ textAlign: "right", marginTop: 10 }}>
            Total: ₹{total.toFixed(2)}
          </h4>
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
      </div>
    </div>
  );
}
