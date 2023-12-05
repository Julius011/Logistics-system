import { connect } from 'mongoose';

async function connectToDB() {
  try {
    await connect('mongodb+srv://rosengrenjulius:qMYhIuLrGPezt1vK@cluster0.l1ccbbo.mongodb.net/?retryWrites=true&w=majority');
    console.log('Connected to MongoDB');
  } catch (error) {
    console.error('Failed to connect to MongoDB', error);
  }
}

export default connectToDB;