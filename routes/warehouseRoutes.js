import { Router } from 'express';
import { Warehouse } from '../models/warehouse.js';
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

// Utility function to generate random employee
const generateRandomWarehouse = (id, placeData) => {
  const randomPlaceName = getRandomItem(placeData);
  
  return {
    id: id.toString(),
    name: randomPlaceName,
    products: [generateRandomProducts],
  };
};

// Create new employees
// createEmployee(100);
async function createEmployee(numWarehouse) {
  try {
    await Warehouse.collection.drop()
  } catch (error) {
    console.log(`Failed dropping Warehouse database: ${error.message}`);
  }

  const placeData = (await (Bun.file("data/placeData.txt").text())).split("\n");

  // Change x in i < x to the number of employees you want to create
  for (let i = 0; i < numWarehouse; i++) {
    const warehouseData = generateRandomWarehouse(i, placeData);

    let warehouse;
    try {
      warehouse = await Warehouse.create(warehouseData);
    } catch (error) {
      console.log(`Could not create warehouse ${i}: ${error.message}`);
    }

    console.log(`Created warehouse: ${warehouse.name}`);
  };
}

// GET all warehouses
router.get('/', async (req, res) => {
  try {
    const warehouse = await Warehouse.find();
    res.json(warehouse);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// GET product availability by name
router.get('/product/:productName', async (req, res) => {
  try {
    const productName = req.params.productName;
    const warehouses = await Warehouse.find({ 'products.productName': productName });

    if (warehouses.length === 0) {
      return res.json({ message: 'Product not found in any warehouse' });
    }

    const productLocations = warehouses.map(warehouse => ({
      warehouseName: warehouse.name,
      quantity: warehouse.products.find(product => product.productName === productName).quantity
    }));

    res.json({ message: 'Product found in warehouses', productLocations });
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

export default router;