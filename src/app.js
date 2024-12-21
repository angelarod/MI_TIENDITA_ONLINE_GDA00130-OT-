import express from 'express'
import productRoutes from './routes/products.routes.js'

const app = express()

app.use(productRoutes)

export default app