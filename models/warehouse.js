import { Schema, model } from 'mongoose';

const warehouseSchema = new Schema({
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
  products: [{
    productName: {
      type: String,
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
    },
  }],
});

export const Warehouse = model('Warehouse', warehouseSchema);