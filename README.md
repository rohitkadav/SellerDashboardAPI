# Seller Dashboard API

A complete Node.js + Express REST API backend to manage product sales, inventory, returns, and analytics across multiple warehouses, including bonus features like audit logging and predictive restocking.

---

## 🚀 Features

### Core Features ✅

* **Authentication & Authorization** (JWT-based, role-based: admin, seller, viewer)
* **Sales Management** (CRUD, sales summary)
* **Stock Management** (SKU-based, low stock alerts, bulk updates)
* **Returns API** (linked to sales, auto-inventory update)
* **Reporting** (CSV/JSON export, sales/return summaries)
* **Multi-Warehouse Support** (warehouseId tracking + transfers)
* **Seller Metrics** (AOV, return rate, sales growth)

### Bonus Features 🎁

* **Audit Logging** for sales, stock, returns
* **Bulk Data Import/Export (CSV)**
* **Predictive Restocking Engine**

---

## 🧰 Tech Stack

* Node.js + Express
* MongoDB + Mongoose
* JSON Web Tokens (JWT)
* Postman (for testing)
* Multer, csvtojson, json2csv (CSV support)

---

## ⚙️ Setup Instructions

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/seller-dashboard-api.git
cd seller-dashboard-api
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Setup Environment

Create a `.env` file based on `.env.example`

```env
PORT=3000
MONGODB_URI=your_mongo_connection_string
JWT_SECRET=your_secret
```

### 4. Start Server

```bash
npx nodemon server.js
```

---

## 🔐 Authentication

* `POST /api/auth/register`
* `POST /api/auth/login`

Roles: `admin`, `seller`, `viewer`

---

## 📦 Stock Endpoints

* `POST /api/stock` – Add stock
* `PUT /api/stock/:id` – Update stock
* `GET /api/stock` – Get all stock
* `GET /api/stock/low-stock` – Low stock alerts
* `POST /api/stock/bulk-update` – Bulk update
* `GET /api/stock/product?productId=P1001` – Track stock across warehouses

---

## 💰 Sales Endpoints

* `POST /api/sales` – Create sale
* `GET /api/sales` – List all
* `GET /api/sales/summary?type=month` – Monthly/weekly summary
* `PUT /api/sales/:id`, `DELETE /api/sales/:id`

---

## ↩️ Return Endpoints

* `POST /api/returns` – Record return
* `GET /api/returns` – View returns

---

## 📊 Reporting Endpoints

* `GET /api/reports/summary` – Sales & return count + total
* `GET /api/reports/export/sales` – CSV
* `GET /api/reports/export/stock` – CSV
* `GET /api/reports/export-json` – JSON export

---

## 📈 Seller Performance Metrics

* `GET /api/reports/metrics?sellerId=...`
  Returns: sales total, AOV, return rate

---

## 🏢 Multi-Warehouse Transfers

* `POST /api/warehouse/transfer` – Transfer stock between warehouses

---

## 🧠 Bonus Features

### 🔍 Audit Logs

* `GET /api/audit` – Admin-only view
* Automatically tracks CREATE/UPDATE events

### 📁 Bulk Import (CSV)

* `POST /api/import/stock` – Upload `.csv` with headers:

```csv
productId,sku,quantity,warehouseId,lowStockThreshold
```

### 🔮 Predictive Restocking

* `GET /api/predict/restock?leadTimeDays=7`
  Returns product-wise restock quantity based on avg daily sales

---

## 📁 Sample Data

Check `/sample-data/` folder for:

* `sample-stock.csv`
* `sample-sales.csv`
* `sample-returns.csv`

---

## 📬 Postman Collection

Available in `/docs/SellerDashboardAPI.postman_collection.json`
🔗 [Click here to view & import the collection](https://.postman.co/workspace/My-Workspace~88c3e84c-2374-48d3-8138-e872091cf444/collection/40726856-e84565ef-9296-427f-bf08-efa974a9f259?action=share&creator=40726856)


* Import in Postman
* Use ENV variable `{{base_url}} = http://localhost:3000`
* All routes are grouped by feature

---


## 👤 Author

**Rohit Kadav**
B.E. Computer Engineering – Terna Engineering College
Email: [rohitkadav01@gmail.com](mailto:rohitkadav01@gmail.com)

---

## 📄 License

MIT
