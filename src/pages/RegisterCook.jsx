import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./RegisterCook.css";

export default function RegisterCook({ onRegister }) {
  const [form, setForm] = useState({
    name: "",
    speciality: "",
    price: "",
    email: "",
    image: "",
    location: "",
  });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (files) {
      const reader = new FileReader();
      reader.onloadend = () => setForm(prev => ({ ...prev, image: reader.result }));
      reader.readAsDataURL(files[0]);
    } else {
      setForm(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (form.name && form.speciality && form.price && form.email && form.location) {
      setLoading(true);
      await onRegister(form);
      setForm({ name: "", speciality: "", price: "", email: "", image: "", location: "" });
      setLoading(false);
      navigate("/chefs");
    } else {
      alert("Please fill all required fields");
    }
  };

  return (
    <div className="register-container">
      <h2>Register as a Home Chef</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" name="name" placeholder="Your Name" value={form.name} onChange={handleChange} required />
        <input type="text" name="speciality" placeholder="Your Speciality" value={form.speciality} onChange={handleChange} required />
        <input type="number" name="price" placeholder="Price in Rs" value={form.price} onChange={handleChange} required />
        <input type="email" name="email" placeholder="Your Email" value={form.email} onChange={handleChange} required />
        <input type="text" name="location" placeholder="Your Location" value={form.location} onChange={handleChange} required />
        <input type="file" name="image" accept="image/*" onChange={handleChange} />
        <button type="submit" disabled={loading}>{loading ? "Registering..." : "Register"}</button>
      </form>
    </div>
  );
}
