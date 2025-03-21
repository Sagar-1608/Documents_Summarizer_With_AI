import express from "express";
import cors from "cors";
import fileRoutes from "./routes/fileRoutes.js";
import aiRoutes from "./routes/aiRoutes.js";
import dotenv from "dotenv";

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());
app.use("/uploads", express.static("uploads"));
app.use("/api/files", fileRoutes);
app.use("/api/ai", aiRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
