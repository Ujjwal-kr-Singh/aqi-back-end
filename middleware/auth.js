const jwt=require('jsonwebtoken');
const cookieParser = require('cookie-parser');

const requireAuth = (req,res,next)=>{
    // console.log('req', req.cookies);    
    const token = req.cookies.jwt ;
    console.log('inside auth..',token);
    if(token){
        jwt.verify(token,'secret',(error, result)=>{
            if(error){
                console.error('Token verification error:', error);
                res.status(209).send({success:false, message:"log in & search history", data:token});
                return;
            }
            else{
                console.log('Token verified successfully:', token);
                req.user=result;
                next();
            }
        });
    }
    else{
        res.status(209).send({success:false ,message:"no session", data:null});
    }
}
module.exports= requireAuth;