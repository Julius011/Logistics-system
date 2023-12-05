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
  storageLocation: {
    shelfNumber: {
      type: String,
      required: true,
    },
    // Other storage location details
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