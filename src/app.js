import dotenv from 'dotenv';
dotenv.config(); // Carga las variables del archivo .env

import express from "express";
import productRoutes from "./routes/products.routes.js";

const app = express();

app.use(express.json());
app.use(productRoutes);

export default app;