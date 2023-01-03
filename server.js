const express=require('express')

const app=express()

app.get('/',(req,res)=>{
    res.send('<h1>Hi</h1>')
})

app.listen(5000,()=>{console.log('up and running')})