import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';

const app=express();
const PORT = 5000;

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cors());

const MONGODB_URI='mongodb+srv://swopnil:Shrestha%4002@cluster0.dfzl3d6.mongodb.net/Crud';
mongoose.connect(MONGODB_URI,{
    useNewUrlParser: true,
  useUnifiedTopology: true,
});

mongoose.connection.on('connected',()=>{
    console.log('Connected To MongoDB');
});

const itemSchema= new mongoose.Schema({
    name: String,
    description: String,
});

const Item=mongoose.model('Item',itemSchema)

app.listen(PORT,()=>{
    console.log('Server is running ')
})