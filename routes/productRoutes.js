import { Router } from 'express';
const router = Router();
import { Product } from '../models/product.js';

// POST new product
// post();
async function post() {
  try {
      Product.collection.drop()
      
      for (let i = 0; i < 50; i++) { // Change x in i < x to the number of orders you want to create
        const randomNumProduct = Math.floor(Math.random() * 1000);
        const randomNumStock = Math.floor(Math.random() * 100);
        const randomNumShelf = Math.floor(Math.random() * 10);
        const randomNumWeight = Math.floor(Math.random() * 50);

        const product = await Product.create({
          id: (i + 0).toString(),
          name: "product" + randomNumProduct,
          stockBalance: randomNumStock,
          shelfNumber: randomNumShelf,
          price: 10,
          weight: randomNumWeight + "kg"
        });
        console.log(`Created order: ${product.name}`);
      }
  } catch (error) {
    console.log(error.message);
  }
}

// GET all products
router.get('/', async (req, res) => {
  try {
    const product = await Product.find();
    res.json(product);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

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