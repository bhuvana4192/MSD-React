import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cookRoutes from "./routes/cookRoutes.js";

dotenv.config();

const app = express();

// ===== Middleware =====
app.use(cors());
app.use(express.json());

// ===== MongoDB Connection (Atlas) =====
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    serverSelectionTimeoutMS: 10000, // ⏳ Wait up to 10s before timeout
  })
  .then(() => console.log("✅ MongoDB connected"))
  .catch((err) => console.error("❌ MongoDB connection error:", err.message));

// ===== Routes =====
app.use("/api/cooks", cookRoutes);

// ===== Root Route =====
app.get("/", (req, res) => {
  res.send("🍽️ HomelySpoon backend is running 🚀");
});

// ===== Server Setup =====
const PORT = process.env.PORT || 5000;

if (process.env.NODE_ENV !== "production") {
  app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
}

// ===== Export for Vercel =====
export default app;
