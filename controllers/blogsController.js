const Blogs=require('../models/blogs');
const changeImageLink=require('./helperfunctions');
var cloudinary = require('cloudinary').v2;


cloudinary.config(
    {
        cloud_name: process.env.API_NAME,
        api_key: process.env.API_KEY,
        api_secret: process.env.API_SECRET
    }
)

const addBlog=async(req,res)=>{

    try{
        const title=req.body.title;
        const description=req.body.description;
        const author=req.user.name;
        const tags=req.body.tags; 
        const image=req.body.image==undefined?"https://tse2.mm.bing.net/th?id=OIP.a5YOm_1N-oe-O025Jw4PTQHaE8&pid=Api&P=0": changeImageLink(req.body.image);    

        const blog=new Blogs({title:title,description:description,author:author,image:image,tags:tags});
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

        let user=req.user.name;
        let blogID=req.body.blogID;

        let blog=await Blogs.findById(blogID);
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

        res.status(200).json({success: "true",likes:blog.likes,dislikes:blog.dislikes});

    }
    catch(e){

        res.status(400).json({error:"Something Went Wrong"});

    }
}

const disLikeBlog = async(req,res) => {

    try{

        let user=req.user.name;
        let blogID=req.body.blogID;

        let blog=await Blogs.findById(blogID);
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

        res.status(200).json({success: "true",likes: blog.likes,dislikes:blog.dislikes});

    }
    catch(e){
        console.log(e)
        res.status(400).json({error: "Something Went Wrong..."});

    }
}

const commentOnBLog =async(req,res) => {

    try{

        let blogID=req.body.blogID;
        let comment=req.body.comment;
        let user="Lizzie";

        let blog=await Blogs.findById(blogID);

        if(!blog){
            res.status(400).json({error: "No Such Blog"});
            return;
        }

        blog.comments.push({user: user,value: comment});
        await blog.save();

        res.status(200).json({success:"true",comments: blog.comments});
    }
    catch(e){

        res.status(400).json({error:"Something went Wrong..."});

    }
}

const deleteComment = async(req,res) => {

    try{

        let commentID=req.body.commentID;
        let blogID=req.body.blogID;
        let blog=await Blogs.findById(blogID);
        
        if(!blog){
            res.status(400).json({error: "No Such Blog..."});
            return;
        }

        let comments=blog.comments.filter((item)=> item._id!=commentID);
        blog.comments=comments;
        await blog.save();

        res.status(200).json({comments: comments,success:"true"});
       
    }
    catch(e){
        
        res.status(400).json({error: "Something Went Wrong..."});

    }
}

const editComment =async(req,res) => {
    
    try{
       
        let commentID=req.body.commentID;
        let newComment=req.body.comment;
        let blogID=req.body.blogID;
        let blog=await Blogs.findById(blogID);

        if(!blog){
            res.status(400).json({error: "No Such Blog..."});
            return;
        }

        for(let i=0;i<blog.comments.length;i++){
            if(blog.comments[i]._id==commentID){
                blog.comments[i].value=newComment;
                break;
            }
        }

        await blog.save();

        res.status(200).json({success:"true",comments: blog.comments});

    }
    catch(e){

    }
}

const updateBlog =async(req,res) => {

    try{

        let blogID=req.body.blogID;
        let blog=await Blogs.findById(blogID);

        if(!blog){
            res.status(400).json({error: "No Such Blog..."});
            return;
        }
        
        const title= req.body.title==undefined?blog.title:req.body.title;
        const description=req.body.description==undefined?blog.description:req.body.description;
        const tags=req.body.tags==undefined? blog.tags: req.body.tags;
        const image=req.body.image==undefined?blog.image: changeImageLink(req.body.image);

        blog.title=title;
        blog.description=description;
        blog.tags=tags;
        blog.image=image;

        await blog.save();
  
        res.status(200).json({success:"true",blog:blog});


    }
    catch(e){
        
        res.status(400).json({error:"Something Went Wrong..."});

    }
}

const deleteBlog =async(req,res) => {

    try{
        
        const blogID=req.body.blogID;

        const blog=await Blogs.findById(blogID);

        if(!blog){
            res.status(400).json({error:"No Such Blog..."});
            return;
        }

        await blog.delete();

        const blogs=await Blogs.find();

        res.status(200).json({success:"true",blogs: blogs});


    }
    catch(e){
        
        res.status(400).json({error: "Something Went Wrong..."});

    }
}

const searchBlog =async(req,res) => {

    try{

        const blogName=req.body.title;

        const blogs=await Blogs.find({title: {$regex:`${blogName}`}});

        res.status(200).json({blogs:blogs,succes:"true"});

    }
    catch(e){

        res.status(400).json({error:"Something Went Wrong..."});

    }
}

const searchByTag =async(req,res) => {

    try{
        
        const tagsList=req.body.tags;
        let blogs=[];

        for(let i=0;i<tagsList.length;i++){
            let blog=await Blogs.find({tags: {$regex: `^${tagsList[i]}$`}});
            blogs=[...blog];
        }

        res.status(200).json({success:"true", blogs: blogs});

    }
    catch(e){ 
    
        res.status(400).json({error: "Something Went Wrong..."});

    }
}

const searchByAuthor =async(req,res) => {

    try{

        const author=req.body.author;

        const blogs=await Blogs.find({author: author});

        res.status(200).json({success:"true",blogs: blogs});

    }
    catch(e){

        res.status(400).json({error: "Something Went Wrong..."});

    }
}


module.exports={addBlog,getAllBlogs,likeBlog,disLikeBlog,commentOnBLog,deleteComment,updateBlog,editComment,deleteBlog,searchBlog,searchByTag,searchByAuthor};