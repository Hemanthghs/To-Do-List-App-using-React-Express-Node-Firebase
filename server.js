const express = require('express');
const mongoose = require('mongoose');
const TaskSchema = require('./model');
const cors = require('cors');

const app = express();
app.use(express.json())
app.use(cors({
    origin:"*"
}))

mongoose.connect('mongodb+srv://hemanth:hemanth@cluster0.pf1ux.mongodb.net/myFirstDatabase?retryWrites=true&w=majority').then(
    ()=>console.log("DB Connected")
)

app.post('/addtask',async(req,res)=>{
    const {todo} = req.body;
    try{
        const newData = new TaskSchema({
            todo:todo
        })
        await newData.save();
        return res.json(await TaskSchema.find());
        // res.send("Done...");
    }
    catch(err){
        console.log(err)
    }
})

app.get('/gettask',async(req,res) => {
    try{
        return res.json(await TaskSchema.find());
        
    }
    catch(err){
        console.log(err)
    }
}) 

app.delete('/delete/:id',async(req,res) => {
    try{
        await TaskSchema.findByIdAndDelete(req.params.id)
        return res.json(await TaskSchema.find());
        
    }
    catch(err){
        console.log(err)
    }
})

if ( process.env.NODE_ENV == "production"){

app.use(express.static("client/build"));


}

app.listen(process.env.PORT || 5000, ()=> console.log("Server running..."));