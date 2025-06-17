import Sale from '../models/sales.js';
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
      if (!sales.length) {
      return res.status(404).json({ message: 'No sales data to export' });
    }
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

export const getSellerMetrics = async (req, res) => {
  try {
    const { sellerId } = req.query;

    if (!sellerId) {
      return res.status(400).json({ message: 'Missing sellerId' });
    }

    const totalSales = await Sale.find({ sellerId });
    const totalReturns = await Return.find({}).populate('saleId');

    const totalAmount = totalSales.reduce((sum, sale) => sum + sale.amount, 0);
    const totalOrders = totalSales.length;
    const avgOrderValue = totalOrders > 0 ? (totalAmount / totalOrders).toFixed(2) : 0;

    const sellerReturns = totalReturns.filter(r => r.saleId?.sellerId == sellerId);
    const returnRate = totalOrders > 0 ? (sellerReturns.length / totalOrders * 100).toFixed(2) : 0;

    // Optional: Add growth % comparing current vs past month

    res.json({
      totalSales: totalOrders,
      totalSalesAmount: totalAmount,
      averageOrderValue: avgOrderValue,
      returnRate: `${returnRate}%`
    });
  } catch (err) {
    res.status(500).json({ message: 'Error generating metrics', error: err.message });
  }
};

export const exportStockCSV = async (req, res) => {
  try {
    const stocks = await Stock.find().lean();
    if (!stocks.length) return res.status(404).json({ message: 'No stock to export' });

    const parser = new Parser();
    const csv = parser.parse(stocks);

    res.header('Content-Type', 'text/csv');
    res.attachment('stock-report.csv');
    return res.send(csv);
  } catch (err) {
    res.status(500).json({ message: 'CSV stock export failed', error: err.message });
  }
};

export const exportSalesCSV2 = async (req, res) => {
  try {
    const sales = await Sale.find().lean();
    if (!sales.length) return res.status(404).json({ message: 'No sales to export' });

    const parser = new Parser();
    const csv = parser.parse(sales);

    res.header('Content-Type', 'text/csv');
    res.attachment('sales-report.csv');
    return res.send(csv);
  } catch (err) {
    res.status(500).json({ message: 'CSV sales export failed', error: err.message });
  }
};