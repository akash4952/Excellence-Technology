const mongoose=require('mongoose');
const dotenv=require('dotenv');
dotenv.config({path:'.env'});

const DB=process.env.MONGODBURL.replace('PASSWORD',process.env.PASSWORD);
mongoose.connect(DB,
{ useNewUrlParser: true },
{ useUnifiedTopology: true }).then(()=>{
   
    console.log(`DB CONNECTION SUCCESSFUL`);
}).catch((err)=>{console.log(err)});

module.exports=mongoose;
require('./models/candidate');
require('./models/test_score');