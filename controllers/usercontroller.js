const User=require('../models/user');
var CryptoJS = require("crypto-js");
const mongoose=require('mongoose');


const signUp = async() =>{
    await mongoose.connect("mongodb://localhost:27017/Blog",{ useNewUrlParser: true,
    useUnifiedTopology: true})

    try{
        const name=req.body.name
        const password=req.body.password
        const email=req.body.email
        const avatar=req.body.avatar

        const user=new User({name:name,password:CryptoJS.AES.encrypt(password,'secret key 123').toString(),email:email,avatar:avatar?avatar:'https://tse3.mm.bing.net/th?id=OIP.lkVN1WDlcV2jQCq-9LT7-wHaIJ&pid=Api&P=0'})
        await user.save()
        res.status(200).json({success:"true",user:user})
        
    }
    catch(e){
        console.log(e)
         res.status(200).json({error: "UserName Or Password Or Email is Already Taken"})
    }
}
