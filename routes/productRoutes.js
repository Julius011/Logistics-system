import { Router } from 'express';
const router = Router();
import { Product } from '../models/product.js'; // Assuming Product model file path

// GET all products
router.get('/', async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
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

// Other product-related routes (POST, PUT, DELETE, etc.)

productPost();
async function productPost() {
  try {
    let postProduct = await Product.create
    ({name: "Product001", stockBalance: 30, shelfNumber: 1, price: 10, weight: 5});
  } catch (error) {
    console.log(error.message);
  }
}

export default router;