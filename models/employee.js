import { Schema, model } from 'mongoose';

const employeeSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    enum: ['picker', 'driver'],
    required: true,
  },
  schedules: [{
    dayOfWeek: {
      type: String,
      required: true,
    },
    // Other schedule details like working hours
  }],
  warehouses: [{
    type: Schema.Types.ObjectId,
    ref: 'Warehouse',
  }],
  // Other employee details
});

export const Employee = model('Employee', employeeSchema);