import { Schema, model } from 'mongoose';

const warehouseSchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  }
  // Other warehouse details
});

export const Warehouse = model('Warehouse', warehouseSchema);