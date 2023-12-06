import { Router } from 'express';
const router = Router();
import { Product } from '../models/product.js';

// POST new products
// post();


// async function post() {
//   try {
//     let product1000 = await Product.create
//     ({id: "1", name: "product1", stockBalance: "30", shelfNumber: "1", price: "50kr/kg", weight: "10kg"});
//     let product1001 = await Product.create
//     ({id: "2", name: "product2", stockBalance: "10", shelfNumber: "2", price: "70kr/kg", weight: "30kg"});
//     let product1002 = await Product.create
//     ({id: "3", name: "product3", stockBalance: "80", shelfNumber: "4", price: "30kr/kg", weight: "18kg"});
//     let product1003 = await Product.create
//     ({id: "4", name: "product4", stockBalance: "17", shelfNumber: "4", price: "20kr/kg", weight: "14kg"});
//   } catch (error) {
//     console.log(error.message);
//   }
// }

// GET all products
router.get('/', async (req, res) => {
  try {
    const product = await Product.find();
    res.json(product);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// new router.get .... v

// GET product by ID
router.get('/:id', async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }
    res.json(product);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Update an product by ID
router.put('/:id', async (req, res) => {
  try {
    const product = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }
    res.json(product);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Delete an product by ID
router.delete('/:id', async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);
    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }
    res.json({ message: 'Product deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

export default router;