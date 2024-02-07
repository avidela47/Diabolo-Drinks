//  Packages
import path from "path";
import colors from "colors";
import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";

// Utiles
import connectDB from "./config/db.js";
import userRoute from "./routes/userRoutes.js";
import categoryRoute from "./routes/categoryRoutes.js";
import productRoute from "./routes/productRoutes.js";
import uploadRoute from "./routes/uploadRoutes.js";
import orderRoute from "./routes/orderRoutes.js";

// Setting
const app = express();
dotenv.config();
connectDB();
const PORT = process.env.PORT || 8080;

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Routes
app.use("/api/users", userRoute);
app.use("/api/category", categoryRoute);
app.use("/api/products", productRoute);
app.use("/api/upload", uploadRoute);
app.use("/api/orders", orderRoute);

// Paypal
app.get("/api/config/paypal", (req, res) => {
  res.send({ clientId: process.env.PAYPAL_CLIENT_ID });
});

// Uploads
const __dirname = path.resolve();
app.use("/uploads", express.static(path.join(__dirname + "/uploads")));

// Server
const httpServer = app.listen(PORT, async () => {
  console.log(
    `Server corriendo en ${"Modo Developer".blue} en puerto ${PORT}`.bgMagenta
      .white
  );
});
httpServer.on("error", (error) => console.log(`Error: ${error}`.bgRed.white));
