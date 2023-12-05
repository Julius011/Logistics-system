import { Schema, model } from 'mongoose';

const productSchema = new Schema({
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
    type: Number,
    required: true,
  },
});

export const Product = model('Product', productSchema);