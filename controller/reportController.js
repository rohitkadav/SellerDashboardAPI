import Sale from '../models/Sale.js';
import Return from '../models/Return.js';
import { Parser } from 'json2csv';

export const getSummary = async (req, res) => {
  try {
    const totalSales = await Sale.countDocuments();
    const totalReturns = await Return.countDocuments();
    const salesAmount = await Sale.aggregate([
      { $group: { _id: null, total: { $sum: '$amount' } } }
    ]);

    res.json({
      totalSales,
      totalReturns,
      totalSalesAmount: salesAmount[0]?.total || 0
    });
  } catch (err) {
    res.status(500).json({ message: 'Error generating summary', error: err.message });
  }
};

export const exportSalesCSV = async (req, res) => {
  try {
    const sales = await Sale.find().lean();
    const parser = new Parser();
    const csv = parser.parse(sales);

    res.header('Content-Type', 'text/csv');
    res.attachment('sales-report.csv');
    return res.send(csv);
  } catch (err) {
    res.status(500).json({ message: 'CSV export failed', error: err.message });
  }
};

export const exportCombinedJSON = async (req, res) => {
  try {
    const sales = await Sale.find().lean();
    const returns = await Return.find().lean();

    res.json({
      sales,
      returns
    });
  } catch (err) {
    res.status(500).json({ message: 'Export JSON failed', error: err.message });
  }
};
