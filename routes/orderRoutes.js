import { Router } from 'express';
const router = Router();
import { Order } from '../models/order.js';
import fs from 'fs';
import path from 'path';

// POST new orders
//post();
async function post() {
    try {
        const numFilePath = path.join(__dirname, '../data/numData.txt');
        const numData = fs.readFileSync(numFilePath, 'utf-8').split('\n').filter(Boolean);

        const productNameFilePath = path.join(__dirname, '../data/productNameData.txt');
        const productNameData = fs.readFileSync(productNameFilePath, 'utf-8').split('\n').filter(Boolean);

        const namesFilePath = path.join(__dirname, '../data/nameData.txt');
        const namesData = fs.readFileSync(namesFilePath, 'utf-8').split('\n').filter(Boolean);
        
        for (let i = 0; i < 5; i++) { // Change x in i < x to the number of orders you want to create
            const randomNumIndex = Math.floor(Math.random() * numData.length);
            const randomProductNameIndex = Math.floor(Math.random() * productNameData.length);
            const randomNameIndex = Math.floor(Math.random() * namesData.length);
            const randomRole = Math.random() < 0.5 ? true : false; // Randomly true or false
  
            const order = await Order.create({
                id: (i + 0).toString(),
                orderNumber: numData[randomNumIndex],
                products: [{productName: productNameData[randomProductNameIndex], quantity: randomNumIndex}],
                picker: namesData[randomNameIndex],
                driver: namesData[randomNameIndex],
                executed: randomRole,
            });
            console.log(`Created order: ${order.orderNumber}`);
        }
    } catch (error) {
      console.log(error.message);
    }
}

// GET all orders
router.get('/', async (req, res) => {
    try {
      const order = await Order.find();
      res.json(order);
    } catch (error) {
      res.status(500).json({ error: 'Internal Server Error' });
    }
});

// new router.get .... v

// GET order by ID
router.get('/:id', async (req, res) => {
    try {
      const order = await Order.findById(req.params.id);
      if (!order) {
        return res.status(404).json({ error: 'Order not found' });
      }
      res.json(order);
    } catch (error) {
      res.status(500).json({ error: 'Internal Server Error' });
    }
});

// Update an order by ID
router.put('/:id', async (req, res) => {
    try {
      const order = await Order.findByIdAndUpdate(req.params.id, req.body, { new: true });
      if (!order) {
        return res.status(404).json({ error: 'Order not found' });
      }
      res.json(order);
    } catch (error) {
      res.status(500).json({ error: 'Internal Server Error' });
    }
});

// Delete an order by ID
router.delete('/:id', async (req, res) => {
    try {
      const order = await Order.findByIdAndDelete(req.params.id);
      if (!order) {
        return res.status(404).json({ error: 'Order not found' });
      }
      res.json({ message: 'Order deleted successfully' });
    } catch (error) {
      res.status(500).json({ error: 'Internal Server Error' });
    }
});

export default router;