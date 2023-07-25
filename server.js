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

app.get('/api/items',async(req,res)=>{
    try{
        const items=await Item.find();
        res.json(items);
    }catch(error){
        console.error(error)
        res.status(500).json({message: 'Server Error'})
    }
})

app.get('/api/items/:id',async(req,res)=>{
    try{
        const itemId=req.params.id;
        const item=await Item.findById(itemId);
        if (!item) {
            return res.status(404).json({ message: 'Item not found' });
          }
        res.json(item);
    }catch(error){
        console.error(error)
        res.status(500).json({message: 'Server Error'})
    }
})

app.post('/api/items',async(req,res)=>{
    try{
        const newItem= new Item(req.body);
        await newItem.save();
        res.json(newItem);
    }catch(error){
        console.error(error);
        res.status(500).json({message: 'Server Error'});
    }
})

app.put('/api/items/:id',async(req,res)=>{
    try{
        const updatedItem = await Item.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        });
        res.json(updatedItem);
    }catch(error){
        console.error(error);
        res.status(500).json({message: 'Server Error'});
    }
})

app.delete('/api/items/:id', async (req, res) => {
    try {
      const deletedItem = await Item.findByIdAndDelete(req.params.id);
      res.json(deletedItem);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server Error' });
    }
  });

app.listen(PORT,()=>{
    console.log('Server is running ')
})