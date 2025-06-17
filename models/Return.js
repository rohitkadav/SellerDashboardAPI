import mongoose from 'mongoose';

const returnSchema = new mongoose.Schema({
  saleId: { type: mongoose.Schema.Types.ObjectId, ref: 'Sale', required: true },
  productId: { type: String, required: true },
  quantity: { type: Number, required: true },
  reason: { type: String },
  date: { type: Date, default: Date.now }
});

export default mongoose.model('Return', returnSchema);
