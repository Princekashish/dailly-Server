import express from "express";
import userRoute from "./api/v1/routes/user.routes";
import productRoute from "./api/v1/routes/product.routes";
import categoryRoute from "./api/v1/routes/category.routes";
import cookieParser from "cookie-parser";
import connectDB from "./server";
import dotenv from "dotenv";
import cors from "cors";
dotenv.config();
const app = express();
const PORT = process.env.PORT || 8080;
connectDB()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`server is running on ${PORT}`);
    });
  })
  .catch((error) => {
    console.log(`MongooseDB connection FAIL ${error}`);
  });

app.use(cookieParser());
app.use(
  cors({
    origin: ["http://localhost:3000", "https://dailly-five.vercel.app", "http://localhost:5173", "https://dailyy-delivey.vercel.app"],
    credentials: true,
  })
);
app.use(express.json());
app.use("/api/v1/auth", userRoute);
app.use("/api/v1/product", productRoute);
app.use("/api/v1/categories", categoryRoute);
app.get("/health", (req, res) => res.json({ status: "its working" }));

app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error("Global error handler:", err);
  res.status(500).json({
    success: false,
    message: err.message || "Internal Server Error",
    error: err
  });
});



export default app;
