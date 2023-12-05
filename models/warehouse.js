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
  addres: {
    type: String,
    required: true,
    unique: true,
  },
  products: [{
    product: {
      type: Schema.Types.ObjectId,
      ref: 'Product',
    },
    quantity: {
      type: Number,
      required: true,
    },
  }],
});

export const Warehouse = model('Warehouse', warehouseSchema);