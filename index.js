import express from 'express';
import connectToDB from './db';
import warehouseRoutes from './routes/warehouseRoutes';
import productRoutes from './routes/productRoutes';
// ... other route imports

const app = express();
const PORT = process.env.PORT || 3000;

connectToDB(); // Connect to the database

app.use('/warehouses', warehouseRoutes);
app.use('/products', productRoutes);
// ... other route usage

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});