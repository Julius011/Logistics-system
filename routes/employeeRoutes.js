import { Router } from 'express';
const router = Router();
import { Employee } from '../models/employee.js';

// POST new employee
router.post('/', async (req, res) => {
    try {
      const newEmployee = await Employee.create(req.body);
      res.status(201).json(newEmployee);
    } catch (error) {
      res.status(500).json({ error: 'Internal Server Error' });
    }
});

// GET all employess
router.get('/', async (req, res) => {
    try {
      const employee = await Employee.find();
      res.json(employee);
    } catch (error) {
      res.status(500).json({ error: 'Internal Server Error' });
    }
});

// GET employee by ID
router.get('/:id', async (req, res) => {
    try {
      const employee = await Employee.findById(req.params.id);
      if (!employee) {
        return res.status(404).json({ error: 'Employee not found' });
      }
      res.json(employee);
    } catch (error) {
      res.status(500).json({ error: 'Internal Server Error' });
    }
});

// Update an employee by ID
router.put('/:id', async (req, res) => {
    try {
      const employee = await Employee.findByIdAndUpdate(req.params.id, req.body, { new: true });
      if (!employee) {
        return res.status(404).json({ error: 'Employee not found' });
      }
      res.json(employee);
    } catch (error) {
      res.status(500).json({ error: 'Internal Server Error' });
    }
});

// Delete an employee by ID
router.delete('/:id', async (req, res) => {
    try {
      const employee = await Employee.findByIdAndDelete(req.params.id);
      if (!employee) {
        return res.status(404).json({ error: 'Employee not found' });
      }
      res.json({ message: 'Employee deleted successfully' });
    } catch (error) {
      res.status(500).json({ error: 'Internal Server Error' });
    }
});

export default router;