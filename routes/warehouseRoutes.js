import { Router } from 'express';
const router = Router();
import { Warehouse } from '../models/warehouse.js';

// POST new warehouses
// post();
async function post() {
  try {
      Warehouse.collection.drop()
      const placeData = (await (Bun.file("data/placeData.txt").text())).split("\n");

      for (let i = 0; i < 5; i++) { // Change x in i < x to the number of orders you want to create
        const randomPlaceName= Math.floor(Math.random() * placeData.length);
        const randomNumProduct = Math.floor(Math.random() * 1000);
        const randomNumStock = Math.floor(Math.random() * 100);

        const warehouse = await Warehouse.create({
          id: (i + 0).toString(),
          name: placeData[randomPlaceName],
          products: [{productName: "product" + randomNumProduct, quantity: randomNumStock}],
        });
        console.log(`Created order: ${warehouse.name}`);
      }
  } catch (error) {
    console.log(error.message);
  }
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

// GET warehouse by ID
router.get('/:id', async (req, res) => {
  try {
    const warehouse = await Warehouse.findById(req.params.id);
    if (!warehouse) {
      return res.status(404).json({ error: 'Warehouse not found' });
    }
    res.json(warehouse);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Update an warehouse by ID
router.put('/:id', async (req, res) => {
  try {
    const warehouse = await Warehouse.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!warehouse) {
      return res.status(404).json({ error: 'Product not found' });
    }
    res.json(warehouse);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Delete an warehouse by ID
router.delete('/:id', async (req, res) => {
  try {
    const warehouse = await Warehouse.findByIdAndDelete(req.params.id);
    if (!warehouse) {
      return res.status(404).json({ error: 'Warehouse not found' });
    }
    res.json({ message: 'Warehouse deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

export default router;