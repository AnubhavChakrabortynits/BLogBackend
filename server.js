const express=require('express');
const mongoose=require('mongoose');
const app=express();
const add=require('./controllers/blogsController');
let envfile=require('dotenv').config();

mongoose.connect("mongodb://localhost:27017/Blog",{ useNewUrlParser: true,
        useUnifiedTopology: true})

app.use(express.json());

app.get('/',add.getAllBlogs)

app.post('/add',add.addBlog);

app.post('/like',add.likeBlog); 

app.post('/dislike',add.disLikeBlog);

app.post('/comment',add.commentOnBLog);

app.post('/deletecomment',add.deleteComment);

app.post('/deleteblog',add.deleteBlog);

app.post('/search',add.searchBlog);

app.post('/searchbytag',add.searchByTag);

app.listen(5000,()=>{console.log('up and running')}) 