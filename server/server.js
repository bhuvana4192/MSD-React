import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cookRoutes from "./routes/cookRoutes.js";

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB connection (Atlas)
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB connected"))
  .catch((err) => console.error("❌ MongoDB connection error:", err));

// Routes
app.use("/api/cooks", cookRoutes);

// Root route
app.get("/", (req, res) => {
  res.send("HomelySpoon backend is running 🚀");
});

const PORT = process.env.PORT || 5000;

// Only listen locally — Vercel handles the listener automatically
if (process.env.NODE_ENV !== "production") {
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
}

export default app;
