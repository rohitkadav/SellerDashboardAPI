import express from 'express';
import cors from  'cors';
import connectDB from './config/mongodb.js';
import 'dotenv/config';
import router from './routes/authRoute.js';
import saleRouter from './routes/saleRoute.js';
import stockRouter from './routes/stockRoute.js';
import returnRouter from './routes/returnRoute.js';
import reportRouter from './routes/reportRoute.js';
import warehouseRouter from './routes/warehouseRoute.js';
import importRouter from './routes/importRoute.js';
import auditRouter from './routes/auditRoute.js';



const app= express();
const PORT =3000
app.use(express.json());
app.use(cors());

await connectDB();

// Routes
app.use('/api/auth',router);
app.use('/api/sales' , saleRouter);
app.use('/api/stock', stockRouter);
app.use('/api/returns', returnRouter);
app.use('/api/reports', reportRouter);
app.use('/api/warehouse', warehouseRouter);
app.use('/api/import', importRouter);
app.use('/api/audit', auditRouter);

app.get('/' , (req , res) => {
    res.send("APP is Working")
})











app.listen(PORT , ()=>{
    console.log(`Server is Listening on ${PORT}`)
});