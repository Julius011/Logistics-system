import { Schema, model } from 'mongoose';

const employeeSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    enum: ['picker', 'driver'],
    required: true,
  },
  schedules: [{
    dayOfWeek: {
      type: String,
      required: true,
    },
    hoursADay: {
      type: Number,
      required: true,
    },
  }],
  warehouses: [{
    type: Schema.Types.ObjectId,
    ref: 'Warehouse',
  }],
});

export const Employee = model('Employee', employeeSchema);