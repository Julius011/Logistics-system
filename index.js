import express from 'express';
import connectToDB from './db';
import warehouseRoutes from './routes/warehouseRoutes';
import productRoutes from './routes/productRoutes';
import employeeRoutes from './routes/employeeRoutes';
import orderRoutes from './routes/orderRoutes';

const app = express();
const PORT = process.env.PORT || 3000;

connectToDB(); // Connect to the database

app.use('/warehouses', warehouseRoutes);
app.use('/products', productRoutes);
app.use('/employees', employeeRoutes);
app.use('/orders', orderRoutes);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});