import express from 'express';
import cors from  'cors';
import connectDB from './config/mongodb';


const app= express();
const PORT =3000
app.use(express.json());
app.use(cors());

await connectDB();

app.get('/' , (req , res) => {
    res.send("APP is Working")
})











app.listen(PORT , ()=>{
    console.log(`Server is Listening on ${PORT}`)
});