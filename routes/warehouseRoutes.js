import { Router } from 'express';
const router = Router();
import { Warehouse } from '../models/warehouse.js';

// POST new warehouse
router.post('/', async (req, res) => {
  try {
    const newWarehouse = await Warehouse.create(req.body);
    res.status(201).json(newWarehouse);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// GET all warehouses
router.get('/', async (req, res) => {
  try {
    const warehouse = await Warehouse.find();
    res.json(warehouse);
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