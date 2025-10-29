import "./ChefsPage.css";

export default function ChefsPage({ cooks, loading, onAddToCart }) {
  if (loading) return <p>Loading...</p>;

  return (
    <div className="chefs-page">
      <h2>Our Chefs</h2>
      {cooks.length === 0 ? (
        <p>No chefs registered yet.</p>
      ) : (
        <div className="chefs-list">
          {cooks.map((cook) => (
            <div className="chef-card" key={cook._id}>
              {cook.image && <img src={cook.image} alt={cook.speciality} />}
              <h3>{cook.name}</h3>
              <p><strong>Speciality:</strong> {cook.speciality}</p>
              <p><strong>Email:</strong> {cook.email}</p>
              <p><strong>Location:</strong> {cook.location}</p>
              <p><strong>Price:</strong> ₹{cook.price}</p>
              <button onClick={() => onAddToCart(cook)}>Add to Cart</button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
