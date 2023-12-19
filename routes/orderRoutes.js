import { Router } from 'express';
import { Order } from '../models/order.js';
const router = Router();

// Utility function to get a random number in interval
const rndNum = (min, max) => Math.floor(Math.random() * (max - min)) + min;

// Utility function to get a random item from an array
const getRandomItem = (arr) => arr[Math.floor(Math.random() * arr.length)];

// Utility function to generate random products
const generateRandomProducts = () => ({
  productName: "product" + rndNum(0, 1000000),
  quantity: rndNum(0, 30),
});

// Utility function to generate random order with timestamp based on conditions
const generateRandomOrder = (id, namesData, monthData) => {
  const randomNameOne = getRandomItem(namesData);
  const randomNameTwo = getRandomItem(namesData);
  const randomMonth = getRandomItem(monthData);

  let boolPicking, boolPacking, boolSending;

  const executed = Math.random() < 0.5;

  if (!executed) {
    boolPicking = Math.random() < 0.5;
    if (boolPicking) {
      boolPacking = Math.random() < 0.5;
      if (boolPacking) {
        boolSending = Math.random() < 0.5;
      }
    }
  } else {
    boolPicking = true;
    boolPacking = true;
    boolSending = true;
  }

  return {
    id: id.toString(),
    orderNumber: rndNum(0, 10000000),
    orderMonth: randomMonth,
    products: [generateRandomProducts],
    picker: randomNameOne,
    driver: randomNameTwo,
    executed: executed,
    timestamp: {
      picking: boolPicking,
      packing: boolPacking,
      sending: boolSending,
    },
  };
};

// Create new order
// createOrder(50);
async function createOrder(numOrder) {
  try {
    await Order.collection.drop()
  } catch (error) {
    console.log(`Failed dropping Order database: ${error.message}`);
  }

  const namesData = (await (Bun.file("data/nameData.txt").text())).split("\n");
  const monthData = (await (Bun.file("data/monthData.txt").text())).split("\n");

  // Create new employe loop
  for (let i = 0; i < numOrder; i++) {
    const orderData = generateRandomOrder(i, namesData, monthData);

    let order;
    try {
      order = await Order.create(orderData);
    } catch (error) {
      console.log(`Could not create order ${i}: ${error.message}`);
    }

    console.log(`Created order: ${order.orderNumber}`);
  };
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

    const totalCost = completedOrdersOctober.reduce((acc, order) => {
      order.products.forEach(product => {
        const unitCost = 10;
        const productCost = unitCost * product.quantity;
        acc += productCost;
      });
      return acc;
    }, 0);

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
          totalCost: { $sum: { $multiply: ['$products.quantity', rndNum(10, 40)] } },
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