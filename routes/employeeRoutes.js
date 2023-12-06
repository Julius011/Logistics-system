import { Router } from 'express';
const router = Router();
import { Employee } from '../models/employee.js';

// POST new employees
// post();
async function post() {
    const today = new Date().toLocaleDateString('en-US', { weekday: 'long' });
    try {
      let employee1 = await Employee.create
      ({id: "1", name: "Jack", role: 'driver', schedules: [{dayOfWeek: "Friday", workHours: 8}]});
      let employee2 = await Employee.create
      ({id: "2", name: "Rack", role: 'picker', schedules: [{dayOfWeek: "Friday", workHours: 8}]});
      let employee3 = await Employee.create
      ({id: "3", name: "Sack", role: 'driver', schedules: [{dayOfWeek: today, workHours: 8}]});
      let employee4 = await Employee.create
      ({id: "4", name: "Mack", role: 'picker', schedules: [{dayOfWeek: today, workHours: 8}]});
    } catch (error) {
      console.log(error.message);
    }
}

// GET all employess
router.get('/', async (req, res) => {
    try {
      const employee = await Employee.find();
      res.json(employee);
    } catch (error) {
      res.status(500).json({ error: 'Internal Server Error' });
    }
});

// GET drivers working today
router.get('/drivers/Today', async (req, res) => {
    try {
        const today = new Date().toLocaleDateString('en-US', { weekday: 'long' });
        const driversToday = await Employee.find({
            'role': 'driver',
            'schedules.dayOfWeek': today,
        });
        res.json(driversToday);
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// GET drivers working on Friday
router.get('/drivers/Friday', async (req, res) => {
    try {
        const driversFriday = await Employee.find({
            'role': 'driver',
            'schedules.dayOfWeek': 'Friday',
        });
        res.json(driversFriday);
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