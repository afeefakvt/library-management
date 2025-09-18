import express from "express";
import dotenv from "dotenv";
import morgan from "morgan";
import cors from "cors";
import connectDB from "./config/db";
import authRoutes from "./routes/userRoutes";
import bookRoutes from "./routes/bookRoutes";
import { errorHandler } from "./middlewares/error";


dotenv.config();
const app = express();

app.use(express.json());
app.use(cors());
app.use(morgan("dev"));

connectDB();

app.use("/api/auth", authRoutes);
app.use("/api/books", bookRoutes);

app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on ${PORT}`));
