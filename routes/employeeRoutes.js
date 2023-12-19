import { Router } from 'express';
const router = Router();
import { Employee } from '../models/employee.js';

// Create new employees
// createEmployee();
async function createEmployee() {
    try {
        Employee.collection.drop()
        const namesData = (await (Bun.file("data/nameData.txt").text())).split("\n");
        const daysData  = (await (Bun.file("data/dateData.txt").text())).split("\n");

        for (let i = 0; i < 100; i++) { // Change x in i < x to the number of employees you want to create
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

// GET driver or picker working on a specific day
router.get('/:type/:day', async ({params: {type: employeeType, day: wantedDay}}, res) => {
  try {
    const driversFriday = await Employee.find({
      'role': employeeType,
      'schedules.dayOfWeek': wantedDay,
    });
    res.json(driversFriday);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// GET drivers working today
router.get('/:type/Today', async ({params: {type: employeeType}}, res) => {
    try {
        const today = new Date().toLocaleDateString('en-US', { weekday: 'long' });
        const driversToday = await Employee.find({
            'role': employeeType,
            'schedules.dayOfWeek': today,
        });
        res.json(driversToday);
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

export default router;