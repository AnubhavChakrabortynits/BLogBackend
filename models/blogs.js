const mongoose = require("mongoose");

const Schema=mongoose.Schema

const blogSchema=new Schema({
    title:{type:String,required:true},
    description:{type:String,required:true},
    image:{type:String,default:"https://tse2.mm.bing.net/th?id=OIP.a5YOm_1N-oe-O025Jw4PTQHaE8&pid=Api&P=0"},
    author:{type:String,required:true},
    likes:[{user:{type:String}}],
    dislikes:[{user:{type:String}}],
    comments:[{user:{type:String},value:{type:String}}],
    createdAt: {
        type: Date, 
        default: new Date() 
    }
})

const Blog=mongoose.model('Blog',blogSchema);
module.exports=Blog;