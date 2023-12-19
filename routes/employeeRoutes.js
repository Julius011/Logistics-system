import { Router } from 'express';
import { Employee } from '../models/employee.js';
const router = Router();

// Utility function to get a random number in interval
const rndNum = (min, max) => Math.floor(Math.random() * (max - min)) + min;

// Utility function to get a random item from an array
const getRandomItem = (arr) => arr[Math.floor(Math.random() * arr.length)];

// Utility function to generate random employee schedule
const generateRandomSchedule = (daysData) => ({
  dayOfWeek: getRandomItem(daysData),
  workHours: rndNum(6, 12),
});

// Utility function to generate random employee
const generateRandomEmployee = (id, namesData, daysData) => {
  const randomName = getRandomItem(namesData);
  const randomRole = Math.random() < 0.5 ? 'driver' : 'picker';

  return {
    id: id.toString(),
    name: randomName,
    role: randomRole,
    schedules: [generateRandomSchedule(daysData)],
  };
};

// Create new employees
// createEmployee(100);
async function createEmployee(numEmployees) {
  try {
    await Employee.collection.drop()
  } catch (error) {
    console.log(`Failed dropping Employee database: ${error.message}`);
  }

  const namesData = (await (Bun.file("data/nameData.txt").text())).split("\n");
  const daysData = (await (Bun.file("data/dateData.txt").text())).split("\n");

  // Change x in i < x to the number of employees you want to create
  for (let i = 0; i < numEmployees; i++) {
    const employeeData = generateRandomEmployee(i, namesData, daysData);

    let employee;
    try {
      employee = await Employee.create(employeeData);
    } catch (error) {
      console.log(`Could not create employee ${i}: ${error.message}`);
    }

    console.log(`Created employee: ${employee.name}`);
  };
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
router.get('/:type/:day', async ({ params: { type: employeeType, day: wantedDay } }, res) => {
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