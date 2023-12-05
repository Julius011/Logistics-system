import { Router } from 'express';
const router = Router();
import { Warehouse } from '../models/warehouse.js'; // Assuming Warehouse model file path

// GET all warehouses
router.get('/', async (req, res) => {
  try {
    const warehouses = await Warehouse.find();
    res.json(warehouses);
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

// Other warehouse-related routes (POST, PUT, DELETE, etc.)

warehousePost();
async function warehousePost() {
  try {
    let postWarehouse = await Warehouse.create
    ({name: "Warehouse001", address: "Warehouse Street 001", products: [{quantity: 30}]});
  } catch (error) {
    console.log(error.message);
  }
}

export default router;