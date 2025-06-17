import mongoose from 'mongoose';

const saleSchema = new mongoose.Schema({
  productId: { type: String, required: true },
  sellerId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  quantity: { type: Number, required: true },
  amount: { type: Number, required: true },
  category: { type: String, required: true },
  date: { type: Date, default: Date.now }
});

export default mongoose.model('Sale', saleSchema);
