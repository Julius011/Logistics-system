import { Schema, model } from 'mongoose';

const orderSchema = new Schema({
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
  // Other order details like timestamps, etc.
});

export const Order = model('Order', orderSchema);