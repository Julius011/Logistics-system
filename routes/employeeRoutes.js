import { Router } from 'express';
const router = Router();
import { Employee } from '../models/employee.js';

// POST new employees
// post();
async function post() {
    try {
        Employee.collection.drop()
        const namesData = (await (Bun.file("data/nameData.txt").text())).split("\n");
        const daysData  = (await (Bun.file("data/dateData.txt").text())).split("\n");

        for (let i = 0; i < 10; i++) { // Change x in i < x to the number of employees you want to create
            const randomName= Math.floor(Math.random() * namesData.length);
            const randomDay= Math.floor(Math.random() * daysData.length);
            const randomRole = Math.random() < 0.333 ? 'driver' : 'picker'; // Randomly assign driver or picker
  
            const employee = await Employee.create({
                id: (i + 0).toString(),
                name: namesData[randomName],
                role: randomRole,
            schedules: [{ dayOfWeek: daysData[randomDay], workHours: 8 }],
            });
            console.log(`Created employee: ${employee.name}`);
        }
    } catch (error) {
      console.log(error);
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
router.get('/drivers/today', async (req, res) => {
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
router.get('/drivers/friday', async (req, res) => {
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