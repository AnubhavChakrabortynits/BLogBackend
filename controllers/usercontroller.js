const User=require('../models/user');
var CryptoJS = require("crypto-js");
const mongoose=require('mongoose');


const signUp = async(req,res) =>{
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



const Login = async(req,res) =>{
    await mongoose.connect("mongodb://localhost:27017/Blog",{ useNewUrlParser: true,
    useUnifiedTopology: true})

    try{
       const username=req.body.username
       const email=req.body.email
       const password=req.body.password

       if(!username && !email){
        res.status(200).json({error:"Please Provide Either Username Or Password!!!"})
       }

       if(username){
        if(!password){
            res.status(200).error({error:"Password is Required!!!"})
        }
        else{
          const user=await User.findOne({name:username})
          if(!user){
            res.status(200).json({error:"No Such User!!!"})
          }
          else{
            if(CryptoJS.AES.decrypt(user?.password,'secret key 123').toString(CryptoJS.enc.Utf8)==password){
                res.status(200).json({success:"true",user:user})
             }
             else{
                res.status(200).json({error:"Invalid Password!!!"})
             }
          }
        }
       }
       else if(email){
        if(!password){
            res.status(200).error({error:"Password is Required!!!"})
        }
        else{
          const user=await User.findOne({email:email})
          if(!user){
            res.status(200).json({error:"No Such User!!!"})
          }
          else{
            if(CryptoJS.AES.decrypt(user?.password,'secret key 123').toString(CryptoJS.enc.Utf8)==password){
                res.status(200).json({success:"true",user:user})
             }
             else{
                res.status(200).json({error:"Invalid Password!!!"})
             }
          }
        }
       }
    }
    catch(e){
        console.log(e)
        res.status({error:"Some error occurred. Please Try Again With The Correct Credentials!!!"})
    }
}


module.exports={signUp,Login}