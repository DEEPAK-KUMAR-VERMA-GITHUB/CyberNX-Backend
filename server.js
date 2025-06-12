import express from "express";
import dotenv from "dotenv";
import errorMiddleware from "./middlewares/error.middleware.js";
import userRoutes from "./routes/user.route.js";
import { DbConnect } from "./config/dbConfig.js";
import cors from "cors";
import cookieParser from "cookie-parser";
import jobRoutes from "./routes/job.route.js";
import applicationRoutes from "./routes/application.route.js";

dotenv.config();
await DbConnect();

const app = express();

// middlewares
app.use(
  cors({
    origin: "https://cyber-nx-frontend.vercel.app",
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.get("/",(req,res) => {
  res.send("Server is healthy");
})

// routes
app.use("/api/v1/users", userRoutes);
app.use("/api/v1/jobs", jobRoutes);
app.use("/api/v1/applications", applicationRoutes);

app.use(errorMiddleware);

app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});
