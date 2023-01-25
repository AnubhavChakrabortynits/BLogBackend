const express=require('express');
const app=express();
const add=require('./controllers/blogsController');

app.use(express.json());

app.get('/',add.getAllBlogs)

app.post('/add',add.addBlog);

app.listen(5000,()=>{console.log('up and running')})