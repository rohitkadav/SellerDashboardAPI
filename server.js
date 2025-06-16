import express from 'express';
import cors from  'cors';


const app= express();
const PORT =3000
app.use(express.json());
app.use(cors());

app.get('/' , (req , res) => {
    res.send("APP is Working")
})









app.listen(PORT , ()=>{
    console.log(`Server is Listening on ${PORT}`)
});