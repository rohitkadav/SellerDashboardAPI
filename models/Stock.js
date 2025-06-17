import mongoose from 'mongoose';

const stockSchema = new mongoose.Schema({
  productId: { type: String, required: true },
  sku: { type: String, required: true },
  quantity: { type: Number, required: true },
  lowStockThreshold: { type: Number, default: 5 },
  lastUpdated: { type: Date, default: Date.now }
});

export default mongoose.model('Stock', stockSchema);
