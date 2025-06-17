import Return from '../models/Return.js';
import Stock from '../models/Stock.js';

export const createReturn = async (req, res) => {
  try {
    const { saleId, productId, quantity, reason } = req.body;

    // Save the return
    const ret = new Return({ saleId, productId, quantity, reason });
    await ret.save();

    // Auto-increase stock for returned product
    const updated = await Stock.findOneAndUpdate(
      { productId },
      { $inc: { quantity: quantity } },
      { new: true }
    );

    if (!updated) {
      return res.status(404).json({ message: 'Stock not found for returned product' });
    }

    res.status(201).json({ return: ret, updatedStock: updated });
  } catch (err) {
    console.error("Return Error:", err);
    res.status(500).json({ message: 'Error creating return', error: err.message });
  }
};

export const getReturns = async (req, res) => {
  try {
    const returns = await Return.find().populate('saleId');
    res.json(returns);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching returns', error: err.message });
  }
};
