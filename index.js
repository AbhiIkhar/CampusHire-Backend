import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./utils/db.js";
import userRoute from "./routes/user.route.js";
import companyRoute from "./routes/company.route.js";
import jobRoute from "./routes/job.route.js";
import applicationRoute from "./routes/application.route.js";
import path from "path";

dotenv.config({});

const app = express();
const _dirname = path.resolve();

// middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
/*
origin: 'http://localhost:5173': This means that your backend will accept requests that come from the frontend running on http://localhost:5173 
credentials: true: This allows the backend to accept cookies and other credentials (such as authentication tokens) from the frontend.
*/
const corsOptions = {
  origin: process.env.FRONTEND_URL,
  credentials: true,
};

app.use(cors(corsOptions));

const PORT = process.env.PORT || 3000;

// api's
app.use("/api/v1/user", userRoute);
app.use("/api/v1/company", companyRoute);
app.use("/api/v1/job", jobRoute);
app.use("/api/v1/application", applicationRoute);
app.use(express.static(path.resolve(_dirname, "dist")));

app.get("*", (req, res) =>
  res.sendFile(path.join(_dirname, "dist", "index.html"))
);
app.listen(PORT, () => {
  connectDB();
});
