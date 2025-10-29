import mongoose from "mongoose";

const cookSchema = new mongoose.Schema({
  name: { type: String, required: true },
  speciality: { type: String, required: true },
  price: { type: Number, required: true },
  email: { type: String, required: true },
  image: { type: String },
  location: { type: String, required: true },
}, { timestamps: true });

export default mongoose.model("Cook", cookSchema);
