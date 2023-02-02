const Blogs=require('../models/blogs');
var cloudinary = require('cloudinary').v2;


cloudinary.config(
    {
        cloud_name: process.env.API_NAME,
        api_key: process.env.API_KEY,
        api_secret: process.env.API_SECRET
    }
)

const addBlog=async(req,res)=>{

    const title=req.body.title;
    const description=req.body.description;
    const author=req.user.name; 
    const image=req.body.image;

    if(image!=undefined){
        image=image.image;
    }

    let imgstring=undefined;
    try{

    if(image){
        const result=await cloudinary.uploader.upload(`https://tse2.mm.bing.net/th?id=OIP.a5YOm_1N-oe-O025Jw4PTQHaE8&pid=Api&P=0`,
        {folder: 'blogs',api_key:process.env.API_KEY,api_secret:process.env.API_SECRET,cloud_name: process.env.API_NAME},
        )   
        imgstring=result.secure_url; 
    }
    
    if(imgstring==undefined){
        imgstring="https://tse2.mm.bing.net/th?id=OIP.a5YOm_1N-oe-O025Jw4PTQHaE8&pid=Api&P=0"
    }

    const blog=new Blogs({title:title,description:description,author:author,imgstring:imgstring});
    await blog.save();
    res.status(200).json({success:"true",blog:blog});

    }
    catch(e){

    console.log(e);  
    res.status(200).json({error:"something went wrong"});

}
}

const getAllBlogs=async(req,res)=>{
   
    try{

    const blogs=await Blogs.find();
    console.log(process.env.API_NAME)
    res.status(200).json({"succes":"true",blogs:blogs});

    }
    catch(e){

        res.status(400).json({error:"Something Went Wrong..."})

    }
   
}

const likeBlog= async(req,res) => {
    
    try{

        let author=req.body.author;
        let title=req.body.title;
        let user=req.user.name;

        let blog=await Blogs.findOne({title:title,author:author});
        let newDislikes;

        if(!blog){
            res.status(400).json({error:"No Such Blog..."})
            return;
        }

        const isLiked=blog.likes.filter((item)=>item.user==user);
        const isDisLiked=blog.dislikes.filter((item)=>item.user==user);

        if(isLiked.length!=0){
            res.status(400).json({error:"Already Liked"});
            return;
        }
        
        if(isDisLiked.length!=0){
             newDislikes=blog.dislikes.filter((item)=>item.user!==user);
        }

        blog.likes.push({user: user});
        if(newDislikes!=undefined){
            blog.dislikes=newDislikes;
        }
        else{
            blog.dislikes=[];
        }
        blog.likes.push({user: user});
        blog=await blog.save();

        res.status(200).json({success: "true"});

    }
    catch(e){

        res.status(400).json({error:"Something Went Wrong"});

    }
}

const disLikeBlog = async(req,res) => {

    try{

        let author=req.body.author;
        let title=req.body.title;
        let user=req.user.name;

        let blog=await Blogs.findOne({title:title,author:author});
        let newLikes;

        if(!blog){
            res.status(400).json({error:"No Such Blog..."})
            return;
        }

        const isLiked=blog.likes.filter((item)=>item.user==user);
        const isDisLiked=blog.dislikes.filter((item)=>item.user==user);

        if(isDisLiked.length!=0){
            res.status(400).json({error:"Already DisLiked"});
            return;
        }
        
        if(isLiked.length!=0){
            newLikes=blog.likes.filter((item)=>item.user!==user);
        }

        if(newLikes!=undefined){
            blog.likes=newLikes;
        }
        else{
            blog.likes=[];
        }
       
        blog.dislikes.push({user: user});
        blog=await blog.save();

        res.status(200).json({success: "true"});

    }
    catch(e){
        console.log(e)
        res.status(400).json({error: "Something Went Wrong..."});

    }
}

module.exports={addBlog,getAllBlogs,likeBlog,disLikeBlog};