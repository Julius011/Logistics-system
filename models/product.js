import { Schema, model } from 'mongoose';

const productSchema = new Schema({
  id: {
    type: String,
    required: true,
    unique: true,
  },
  name: {
    type: String,
    required: true,
    unique: true,
  },
  stockBalance: {
    type: Number,
    default: 0,
  },
  shelfNumber: {
    type: Number,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  weight: {
    type: String,
    required: true,
  },
});

export const Product = model('Product', productSchema);