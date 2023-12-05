import { Router } from 'express';
const router = Router();
import { Employee } from '../models/employee.js'; // Assuming Product model file path

// GET all employess
router.get('/', async (req, res) => {
    try {
      const employee = await Employee.find();
      res.json(employee);
    } catch (error) {
      res.status(500).json({ error: 'Internal Server Error' });
    }
});

// GET product by ID
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

// Other employee-related routes (POST, PUT, DELETE, etc.)

employeePost();
async function employeePost() {
  try {
    let postEmployee = await Employee.create
    ({name: "Jack", role: 'driver', schedules: [{dayOfWeek: "Mon - Fri", hoursADay: 8}]});
  } catch (error) {
    console.log(error.message);
  }
}

export default router;