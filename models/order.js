import { Schema, model } from 'mongoose';

const orderSchema = new Schema({
  id: {
    type: String,
    required: true,
    unique: true,
  },
  orderNumber: {
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
  picker: {
    type: Schema.Types.ObjectId,
    ref: 'Employee',
  },
  driver: {
    type: Schema.Types.ObjectId,
    ref: 'Employee',
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