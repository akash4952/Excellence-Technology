require('./db')
const mongoose=require('mongoose');
const express=require('express');
var routes=require('./routes/routes');

const app=express();
app.use(express.json());

app.use('/api',routes);

app.listen(3000,()=>{
    console.log('listening to port');
});

