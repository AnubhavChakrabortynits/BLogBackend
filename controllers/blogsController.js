const Blogs=require('../models/blogs');
const mongoose=require('mongoose');
var cloudinary = require('cloudinary').v2;

const addBlog=async(req,res)=>{
    await mongoose.connect("mongodb://localhost:27017/Blog",{ useNewUrlParser: true,
        useUnifiedTopology: true})

    const title=req.body.title;
    const description=req.body.description;
    const author=req.body.author; 
    const image=req.files;
    if(image!=undefined){
        image=image.image;
    }
    let imgstring=undefined;
    try{
    if(image){
    cloudinary.v2.uploader.upload(`${image.name}`,
    { public_id: "dmvik1vtf" }, 
    function(error, result) {console.log(result); imgstring=result;});
    }
    
    if(imgstring==undefined){
        imgstring="https://tse2.mm.bing.net/th?id=OIP.a5YOm_1N-oe-O025Jw4PTQHaE8&pid=Api&P=0"
    }
    const blog=new Blogs({title:title,description:description,author:author,imgstring:imgstring});
    await blog.save();

    res.status(200).json({success:"true"});
    }catch(e){
    console.log(e);  
    res.status(200).json({error:"something went wrong"});
}
}

const getAllBlogs=async(req,res)=>{
    await mongoose.connect("mongodb://localhost:27017/Blog",{ useNewUrlParser: true,
        useUnifiedTopology: true})
    const blogs=await Blogs.find();
    res.status(200).json({"succes":"true",blogs:blogs});
}
module.exports={addBlog,getAllBlogs};