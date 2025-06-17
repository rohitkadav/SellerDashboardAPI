import Stock from '../models/Stock.js';

export const transferStock = async (req, res) => {
  try {
    const { productId, sku, fromWarehouse, toWarehouse, quantity } = req.body;

    const from = await Stock.findOne({ productId, sku, warehouseId: fromWarehouse });
    const to = await Stock.findOne({ productId, sku, warehouseId: toWarehouse });

    if (!from || from.quantity < quantity) {
      return res.status(400).json({ message: 'Not enough stock in source warehouse' });
    }

    // Deduct from source
    from.quantity -= quantity;
    await from.save();

    // Add to target (create if doesn't exist)
    if (to) {
      to.quantity += quantity;
      await to.save();
    } else {
      await Stock.create({
        productId,
        sku,
        quantity,
        warehouseId: toWarehouse,
        lowStockThreshold: 5
      });
    }

    res.json({ message: 'Transfer complete' });
  } catch (err) {
    res.status(500).json({ message: 'Transfer failed', error: err.message });
  }
};
