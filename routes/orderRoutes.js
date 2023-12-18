import { Router } from 'express';
const router = Router();
import { Order } from '../models/order.js';

// POST new orders
// post();
async function post() {
    try {
        Order.collection.drop()
        const namesData = (await (Bun.file("data/nameData.txt").text())).split("\n");
        const monthData = (await (Bun.file("data/monthData.txt").text())).split("\n");

        for (let i = 0; i < 50; i++) { // Change x in i < x to the number of orders you want to create
            const randomNum = Math.floor(Math.random() * 1000);
            const randomNameOne = Math.floor(Math.random() * namesData.length);
            const randomNameTwo = Math.floor(Math.random() * namesData.length);
            const randomMonth = Math.floor(Math.random() * monthData.length);
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
                orderMonth: monthData[randomMonth],
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

// GET all false order picking status
router.get('/timestamp/picking', async (req, res) => {
  try {
      const orderPicked = await Order.find({
          'timestamp.picking': 'false',
      });
      res.json(orderPicked);
  } catch (error) {
      res.status(500).json({ error: 'Internal Server Error' });
  }
});

// GET oldest picking status
router.get('/timestamp/picking/oldest', async (req, res) => {
  try {
    const oldestPickedOrder = await Order.findOne({
      'timestamp.picking': true,
      executed: false,
    }).sort({ _id: 1 });
    
    res.json(oldestPickedOrder);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// GET all picker with no order
router.get('/picker/no-orders', async (req, res) => {
  try {
    const pickersWithNoOrders = await Order.distinct('picker', {
      executed: false, 
    });
    res.json(pickersWithNoOrders);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// GET total cost of all completed orders for the month of October
router.get('/executed/cost/october', async (req, res) => {
  try {
    const completedOrdersOctober = await Order.find({
      executed: true,
      orderMonth: 'October',
    });

    let totalCost = 0;
    completedOrdersOctober.forEach(order => {
      order.products.forEach(product => {
        const unitCost = 10;
        const productCost = unitCost * product.quantity;
        totalCost += productCost;
      });
    });

    res.json({ totalCost });
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// GET most expensive order picked in August
router.get('/executed/most-cost/august', async (req, res) => {
  try {
    const augustOrders = await Order.aggregate([
      {
        $match: {
          orderMonth: 'August',
          executed: true,
        },
      },
      {
        $unwind: '$products',
      },
      {
        $group: {
          _id: '$_id',
          totalCost: { $sum: { $multiply: ['$products.quantity', 10] } },
          orderDetails: { $first: '$$ROOT' },
        },
      },
      {
        $sort: { totalCost: -1 }
      },
      {
        $limit: 1
      }
    ]);

    if (augustOrders.length === 0) {
      return res.status(404).json({ error: 'No orders found for August' });
    }

    res.json(augustOrders[0]);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

export default router;