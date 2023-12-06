import { Router } from 'express';
const router = Router();
import { Warehouse } from '../models/warehouse.js';

// POST new warehouses
//post();
async function post() {
  try {
    let warehouse1 = await Warehouse.create ({id: "1", name: "warehouse1", products: [{productName: "Product1", quantity: 30}]});
    let warehouse2 = await Warehouse.create ({id: "2", name: "warehouse2", products: [{productName: "Product3", quantity: 80}]});
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

// new router.get .... v

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