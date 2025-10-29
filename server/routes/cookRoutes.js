import express from "express";
import Cook from "../models/Cook.js";

const router = express.Router();

// GET all cooks
router.get("/", async (req, res) => {
  try {
    const cooks = await Cook.find({});
    res.json(cooks);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST new cook
router.post("/", async (req, res) => {
  try {
    const { name, speciality, price, email, location, image } = req.body;

    if (!name || !speciality || !price || !email || !location) {
      return res.status(400).json({ error: "All fields are required" });
    }

    const newCook = new Cook({
      name: name.trim(),
      speciality: speciality.trim(),
      price: Number(price),
      email: email.trim(),
      location: location.trim(),
      image: image || "",
    });

    const savedCook = await newCook.save();
    res.status(201).json(savedCook);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
