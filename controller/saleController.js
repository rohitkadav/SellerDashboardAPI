import Sale from '../models/sales.js';
import mongoose from 'mongoose';

export const createSale = async (req, res) => {
  try {
    const sale = new Sale({
      ...req.body,
      sellerId: req.user.id // from JWT
    });
    await sale.save();
    res.status(201).json(sale);
  } catch (err) {
    res.status(500).json({ message: 'Error creating sale', error: err.message });
  }
};

export const getSales = async (req, res) => {
  try {
    const { productId, category, startDate, endDate } = req.query;
    const filter = {};

    if (productId) filter.productId = productId;
    if (category) filter.category = category;
    if (startDate || endDate) {
      filter.date = {};
      if (startDate) filter.date.$gte = new Date(startDate);
      if (endDate) filter.date.$lte = new Date(endDate);
    }

    const sales = await Sale.find(filter);
    res.json(sales);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching sales', error: err.message });
  }
};

export const updateSale = async (req, res) => {
 const id = req.params.id.trim();
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ message: 'Invalid sale ID format' });
  }

  try {
    const updated = await Sale.findByIdAndUpdate(id, updates, { new: true });

    if (!updated) {
      return res.status(404).json({ message: 'Sale not found' });
    }

    res.json(updated);
  } catch (err) {
   
    res.status(500).json({ message: 'Error updating sale', error: err.message });
  }
};

export const deleteSale = async (req, res) => {
  try {
    await Sale.findByIdAndDelete(req.params.id.trim());
    res.json({ message: 'Sale deleted' });
  } catch (err) {
    res.status(500).json({ message: 'Error deleting sale', error: err.message });
  }
};

export const getSalesSummary = async (req, res) => {
  try {
    const { type = 'day' } = req.query;

    let groupBy;
    if (type === 'day') groupBy = { $dateToString: { format: "%Y-%m-%d", date: "$date" } };
    if (type === 'week') groupBy = { $isoWeek: "$date" };
    if (type === 'month') groupBy = { $month: "$date" };

    const summary = await Sale.aggregate([
      {
        $group: {
          _id: groupBy,
          totalSales: { $sum: "$amount" },
          totalOrders: { $sum: 1 }
        }
      },
      { $sort: { _id: 1 } }
    ]);

    res.json(summary);
  } catch (err) {
    res.status(500).json({ message: 'Error summarizing sales', error: err.message });
  }
};
