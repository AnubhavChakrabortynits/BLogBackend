const mongoose = require("mongoose");

const Schema=mongoose.Schema

const blogSchema=new Schema({
    title:{type:String,required:true},
    description:{type:String,required:true},
    image:{type:String,default:"https://tse2.mm.bing.net/th?id=OIP.a5YOm_1N-oe-O025Jw4PTQHaE8&pid=Api&P=0"},
    author:{type:String,required:true,unique:true},
    likes:[{user:{type:String,unique:true}}],
    dislikes:[{user:{type:String,unique:true}}],
    comments:[{user:{type:String,unique:true},value:{type:String}}]
})

const Blog=mongoose.model('Blog',blogSchema)