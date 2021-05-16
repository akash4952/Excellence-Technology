const mongoose=require('mongoose');

var validateEmail = function(email) {
  var re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  return re.test(email)
};

const schema= mongoose.Schema({

  name:{
    type:String,
    trim:true,
    required:"enter the name to get marks detail"
  },
   
  email:{
    type: String,
        trim: true,
        lowercase: true,
        unique:true,
        required: 'Email address is required',
        validate: [validateEmail, 'Please fill a valid email address'],
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address']
    
    },
  first_round:{
      type:Number,
      required: 'Mark is required',
      min: [0,"minimum is zero"],
      max:[10,"maximum is ten"]
  },

  second_round:{
      type:Number,
      required: 'Mark is required',
      min: [0,"minimum is zero"],
      max:[10,"maximum is ten"]
  },
  third_round:{ 
      type:Number,
      required: 'Mark is required',
      min: [0,"minimum is zero"],
      max:[10,"maximum is ten"]
  },

  totalMarks:{
    type:Number
  }

})

module.exports=mongoose.model("TestScore",schema);
