import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";

import cookRoutes from "./routes/cookRoutes.js";

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json()); // must be before routes

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.log(err));

app.use("/api/cooks", cookRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
