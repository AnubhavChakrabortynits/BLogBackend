const mongoose = require("mongoose");

const Schema=mongoose.Schema

const userSchema=new Schema({
    name:{type:String,required:true,unique:true,maxlength:15},
    email:{type:String,unique:true,lowercase:true,required:true},
    password:{type: String,required:true,unique:true},
    following:[{user:{type:String,unique:true}}],
    followers:[{user:{type:String,unique:true}}],
    avatar:{type:String,default:'https://tse3.mm.bing.net/th?id=OIP.lkVN1WDlcV2jQCq-9LT7-wHaIJ&pid=Api&P=0'},
    facebook:{type:String,unique:true},
    instagram:{type:String,unique:true},
    linkedin:{type:String,unique:true},
    github:{type:String,unique:true}
})

const User = mongoose.model("user", userSchema);
module.exports=User