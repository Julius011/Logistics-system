import { Router } from 'express';
const router = Router();
import { Order } from '../models/order.js';

// POST new orders
// post();
async function post() {
    try {
      let order01 = await Order.create
      ({orderNumber: "01", products: [{product: "product1000", quantity: 5}], picker: "Rack", driver: "Jack"});
      let order02 = await Order.create
      ({orderNumber: "02", products: [{product: "product1002", quantity: 2}], picker: "Mack", driver: "Sack"});
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