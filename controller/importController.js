import csv from 'csvtojson';
import Stock from '../models/Stock.js';

export const importStockCSV = async (req, res) => {
  try {
    const fileBuffer = req.file.buffer;
    const stockArray = await csv().fromString(fileBuffer.toString());

    const inserted = await Stock.insertMany(stockArray);
    res.json({ message: 'Stock imported successfully', insertedCount: inserted.length });
  } catch (err) {
    res.status(500).json({ message: 'Error importing CSV', error: err.message });
  }
};
