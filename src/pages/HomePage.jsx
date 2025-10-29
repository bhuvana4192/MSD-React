import { Link } from 'react-router-dom';
import './HomePage.css';

export default function HomePage() {
  return (
    <div className="home-page">
      <section className="hero">
        <h1>From one home to another</h1>
        <h1>Welcome To The Homely Spoon</h1>
        <p>Enjoy special homemade dishes cooked with love by local home chefs.</p>
        <br />
        <Link to="/chefs"><button>Our Chefs</button></Link>
      </section>

      <section id="about" className="section">
        <h2>About The Homely Spoon</h2>
        <p>
          The Homely Spoon helps talented home cooks share their special recipes
          with others nearby. It's perfect for people missing home food and gives
          households a way to earn and feel proud of their cooking.
        </p>
      </section>

      <section id="features" className="section">
        <h2>Key Features</h2>
        <p>
          👩‍🍳 Create your chef profile <br />
          🗺️ Discover food nearby on the map <br />
          💬 Order, rate, and support local cooks
        </p>
      </section>

      <footer>
        © 2025 The Homely Spoon — Made with love and tradition.
      </footer>
    </div>
  );
}
