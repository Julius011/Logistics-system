import { Schema, model } from 'mongoose';

const orderSchema = new Schema({
  id: {
    type: String,
    required: true,
    unique: true,
  },
  orderNumber: {
    type: Number,
    required: true,
    unique: true,
  },
  orderMonth: {
    type: String,
    required: true,
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
  picker: {
    type: String,
    required: true,
  },
  driver: {
    type: String,
    required: true,
  },
  executed: {
    type: Boolean,
    default: false,
  },
  timestamp: [{
    picking: {
      type: Boolean,
      default: false,
    },
    packing: {
      type: Boolean,
      default: false,
    },
    sending: {
      type: Boolean,
      default: false,
    },
  }],
});

export const Order = model('Order', orderSchema);