import { Router } from 'express';
import { Employee } from '../models/employee.js';
const router = Router();

const rndNum = (min, max) => Math.floor(Math.random() * (max - min)) + min;

// Create new employees
// createEmployee();
async function createEmployee() {
  try {
    Employee.collection.drop()
    const namesData = (await (Bun.file("data/nameData.txt").text())).split("\n");
    const daysData  = (await (Bun.file("data/dateData.txt").text())).split("\n");

    // Utility function to get a random item from an array
    const getRandomItem = (arr) => arr[Math.floor(Math.random() * arr.length)];

    // Utility function to generate random employee schedule
    const generateRandomSchedule = () => ({
      dayOfWeek: getRandomItem(daysData),
      workHours: rndNum(6, 12),
    });

    // Utility function to generate random employee
    const generateRandomEmployee = (id) => {
      const randomName = getRandomItem(namesData);
      const randomRole = Math.random() < 0.5 ? 'driver' : 'picker';

      return {
        id: id.toString(),
        name: randomName,
        role: randomRole,
        schedules: [generateRandomSchedule()],
      };
    };

    // Change x in i < x to the number of employees you want to create
    for (let i = 0; i < 100; i++) {
      const employeeData = generateRandomEmployee(i);
      const employee = await Employee.create(employeeData);
      console.log(`Created employee: ${employee.name}`);
    };
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
    if (wantedDay === "Today") {
      wantedDay = new Date().toLocaleDateString('en-US', { weekday: 'long' });
    }
    
    const driversFriday = await Employee.find({
      'role': employeeType,
      'schedules.dayOfWeek': wantedDay,
    });

    res.json(driversFriday);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

export default router;