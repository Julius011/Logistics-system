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

// generate a unique id
const getId = function({ length, existing = [] }) {
    const limit = 100; // max tries to create unique id
    let attempts = 0; // how many attempts
    let id = false;
    while(!id && attempts < limit) {
      id = randomId(length); // create id
      if(!checkId(id, existing)) { // check unique
        id = false; // reset id
        attempts++; // record failed attempt
      }
    }
    return id; // the id or false if did not get unique after max attempts
};

// Other employee-related routes (POST, PUT, DELETE, etc.)

// post
post();
async function post() {
  try {
    let posted = await Employee.create
    ({id: getId(), name: "Jack", role: 'driver'});
  } catch (error) {
    console.log(error.message);
  }
}

// Put
// ..

// Delete
// ..

export default router;