import userModel from "../models/userschema.js"
import validator from 'validator'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'


const createtoken=(id)=>{
    return jwt.sign({id},process.env.JWT_SECRET)
}


const login=async(req,res)=>{
    try {
      const {email,password}=req.body
      const user=await userModel.findOne({email})

      if(!user){
          return res.json({ success: false, mssg: "User not found" });
      }
      const isMatch=await bcrypt.compare(password,user.password)
       if (isMatch) {
        const token=createtoken(user._id)
            return res.json({ success: true, mssg: token });
        }else{
             return res.json({ success: false, mssg: "Invalid credentials" });
        }

    } catch (error) {
        console.log(error);
        res.json({
            success: false,
            mssg: error.message
        });
    }
}


const registerUser=async(req,res)=>{
   try {
      const {name,email,password}=req.body

    const exist=await userModel.findOne({email})

    if(exist){
        return res.json({success:false,mssg:"User already exist"})
    }

    if(!validator.isEmail(email)){
        return res.json({success:false,mssg:"Please enter a valid email"})
    }

    if(password.length<8){
        return res.json({success:false,mssg:"Please enter strong password"})
    }
    //hashing passwrod
    const saltrounds=await bcrypt.genSalt(10)
    const hashedpass=await bcrypt.hash(password,saltrounds)

    const newuser=new userModel({
        name,
        email,
        password:hashedpass
    })
    const user=await newuser.save()
    const token=createtoken(user._id)
res.json({
    success:true,token
})


   } catch (error) {
     console.log(error)
     res.json({
        success:false,mssg:error.message
     })
   }
}
const adminLogin=async(req,res)=>{
try {
  const{email,password}=req.body
  if(email===process.env.ADMIN_EMAIL && password===process.env.ADMIN_PASSWORD){
    const token=jwt.sign(email+password,process.env.JWT_SECRET)
    res.json({success:true,token})
  }else {
      return res.json({ success: false, mssg: "Invalid admin credentials" });
    }
} catch (error) {
    console.log(error);
    res.json({ success: false, mssg: error.message });
  }
};
export {login,registerUser,adminLogin}