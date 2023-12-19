import { Router } from 'express';
const router = Router();
import { Product } from '../models/product.js';

// Utility function to get a random number in interval
const rndNum = (min, max) => Math.floor(Math.random() * (max - min)) + min;

// Utility function to generate random order with timestamp based on conditions
const generateRandomProduct = (id) => {
  return {
    id: id.toString(),
    name: "product" + rndNum(0, 1000000),
    stockBalance: rndNum(0, 40),
    shelfNumber: rndNum(0, 5),
    price: rndNum(10, 40),
    weight: rndNum(1, 50) + "kg"
  };
};

// Create new product
// createProduct(100);
async function createProduct(numProduct) {
  try {
    await Product.collection.drop()
  } catch (error) {
    console.log(`Failed dropping Product database: ${error.message}`);
  }

  // Create new product loop
  for (let i = 0; i < numProduct; i++) {
    const productData = generateRandomProduct(i);

    let product;
    try {
      product = await Product.create(productData);
    } catch (error) {
      console.log(`Could not create product ${i}: ${error.message}`);
    }

    console.log(`Created product: ${product.name}`);
  };
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

export default router;