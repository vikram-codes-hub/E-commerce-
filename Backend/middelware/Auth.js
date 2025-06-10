import jwt from 'jsonwebtoken'

const authuser=async(req,res,next)=>{
    const {token}=req.headers
    if(!token){
        return   res.json({ success: false, mssg: "Not authorized login again" });
    }
    try {
      const token_decoded=jwt.verify(token,process.env.JWT_SECRET)
      req.body.userId=token_decoded.id
      next()
    } catch (error) {
  return res.json({ success: false, mssg: error.message });
}

}
export default authuser