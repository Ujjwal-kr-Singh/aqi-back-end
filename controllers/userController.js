const userdb= require('../models/usermodel');
const bcrypt= require('bcrypt');
const jwt= require('jsonwebtoken');
const saltRounds=10;


const createUser = async (req,res)=>{
    try{
        let data = userdb(req.body);
        console.log(data);
        data.password= bcrypt.hashSync(req.body.password, saltRounds)

        await data.save();
        console.log('User created')
        res.status(200).send({success: true, message: 'user data received...',data: data})
    }
    catch(err){
        console.log(err,': error');
        res.status(200).send({success: false, message: 'user data null...',data: ''})
    }
}
const getUser= async (req,res)=>{
    try{
        let data = await userdb.find();
        console.log(data);
        res.status(200).send({success: true, message: 'user data received...',data: data})
    }
    catch(err){
        console.log(err,': error');
        res.status(500).send({success: false, message: 'user data null...',data: ''})
    }
}

const login = async (req, res) => {
    try{
        console.log("db reached...",req.params.username);
        // let user= new userdb(req.params);
        // console.log('query>>>',user);
        let user= req.params;
        console.log('username',user);
        let userCheck= await userdb.findOne({firstName: user.username});
        console.log("user from db", userCheck);
        if(!userCheck ){
            console.log ("........WRONG USER ...........");
            res.status(209).send({success:false,message:"Wrong username",data:null});
        }

        let flag = bcrypt.compareSync(user.password, userCheck.password);
        if(flag){
            let token=jwt.sign({id:user._id},'secret',{expiresIn:60*60})
            console.log('token....  ', token)
            res.cookie('jwt',token, {
                httpOnly: true,        // Accessible only by web server
                secure: true,          // Use HTTPS
                sameSite: 'None',    // CSRF protection
                maxAge: 3600000*5        // 1 hour in milliseconds
            });
            console.log("LOGIN SUCCESSFULL....",userCheck );
            res.status(200).send({success:true,message:"Login successful",data:userCheck});
        }
        else{
            console.log ("WRONG  PASS....");
            res.end("WRONG  PASS....");
            res.status(500).send({success:false,message:"Wrong username",data:null});

        }
        // console.log("user from db", userCheck); 
    }
    catch(err){
        console.log("error", err)
    }
}


module.exports ={
    createUser,
    getUser,
    login,
}