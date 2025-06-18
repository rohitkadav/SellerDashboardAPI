import Sale from '../models/sales.js';

export const getRestockRecommendations = async (req, res) => {
  try {
    const { leadTimeDays = 7 } = req.query; // default 7-day delivery lead time

    // Group by productId
    const sales = await Sale.aggregate([
      {
        $group: {
          _id: "$productId",
          totalSold: { $sum: "$quantity" },
          firstSaleDate: { $min: "$date" },
          lastSaleDate: { $max: "$date" },
          orders: { $sum: 1 }
        }
      }
    ]);

    const recommendations = sales.map(sale => {
      const days = Math.max(1, (new Date(sale.lastSaleDate) - new Date(sale.firstSaleDate)) / (1000 * 60 * 60 * 24));
      const avgPerDay = sale.totalSold / days;

      return {
        productId: sale._id,
        avgDailySales: avgPerDay.toFixed(2),
        recommendedRestock: Math.ceil(avgPerDay * leadTimeDays)
      };
    });

    res.json(recommendations);
  } catch (err) {
    console.error("Predictive restocking error:", err.message);
    res.status(500).json({ message: 'Prediction failed', error: err.message });
  }
};
