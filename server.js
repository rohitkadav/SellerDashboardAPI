import express from 'express';
import cors from  'cors';
import connectDB from './config/mongodb.js';
import 'dotenv/config';
import router from './routes/authRoute.js';


const app= express();
const PORT =3000
app.use(express.json());
app.use(cors());

await connectDB();

// Routes
app.use('/api/auth',router);

app.get('/' , (req , res) => {
    res.send("APP is Working")
})











app.listen(PORT , ()=>{
    console.log(`Server is Listening on ${PORT}`)
});