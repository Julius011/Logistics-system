import { Router } from 'express';
const router = Router();
import { Order } from '../models/order.js';

// POST new orders
// post();
async function post() {
    try {
        Order.collection.drop()
        const namesData = (await (Bun.file("data/nameData.txt").text())).split("\n");

        for (let i = 0; i < 50; i++) { // Change x in i < x to the number of orders you want to create
            const randomNum = Math.floor(Math.random() * 1000);
            const randomNameOne = Math.floor(Math.random() * namesData.length);
            const randomNameTwo = Math.floor(Math.random() * namesData.length);
            const randomExec = Math.random() < 0.5; // true or false
            let boolPacking, boolPicking, boolSending;

            if(randomExec == false) {
              boolPicking = Math.random() < 0.5; // true or false
              if(boolPicking == true) {
                boolPacking = Math.random() < 0.5; // true or false
                if (boolPacking == true) {
                  boolSending = Math.random() < 0.5; // true or false
                }
              }
            } else {
              boolPacking = true;
              boolPicking = true;
              boolSending = true;
            }

            const order = await Order.create({
                id: (i + 0).toString(),
                orderNumber: randomNum,
                products: [{productName: "product" + randomNum, quantity: randomNum}],
                picker: namesData[randomNameOne],
                driver: namesData[randomNameTwo],
                executed: randomExec,
                timestamp: [{picking: boolPicking, packing: boolPacking, sending: boolSending}],
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