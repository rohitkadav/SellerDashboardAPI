import Stock from '../models/Stock.js';

export const addStock = async (req, res) => {
  try {
    const { productId, sku, quantity, warehouseId, lowStockThreshold } = req.body;
    const stock = new Stock({ productId, sku, quantity,warehouseId, lowStockThreshold });
    await stock.save();
    res.status(201).json(stock);
  } catch (err) {
    res.status(500).json({ message: 'Error adding stock', error: err.message });
  }
};

export const getStock = async (req, res) => {
  try {
    const stocks = await Stock.find();
    res.json(stocks);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching stock', error: err.message });
  }
};

export const getLowStock = async (req, res) => {
  try {
    const lowStockItems = await Stock.find({ $expr: { $lte: ['$quantity', '$lowStockThreshold'] } });
    res.json(lowStockItems);
  } catch (err) {
    res.status(500).json({ message: 'Error getting low stock items', error: err.message });
  }
};

export const updateStock = async (req, res) => {
  try {
    const updated = await Stock.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updated);
  } catch (err) {
    res.status(500).json({ message: 'Error updating stock', error: err.message });
  }
};

export const bulkUpdateStock = async (req, res) => {
  try {
    const updates = req.body; // [{ sku: "SKU1", quantity: 10 }, ...]
    const result = [];

    for (const update of updates) {
      const stockItem = await Stock.findOneAndUpdate(
        { sku: update.sku },
        { $set: { quantity: update.quantity, lastUpdated: new Date() } },
        { new: true }
      );
      result.push(stockItem);
    }

    res.json(result);
  } catch (err) {
    res.status(500).json({ message: 'Error during bulk update', error: err.message });
  }
};
