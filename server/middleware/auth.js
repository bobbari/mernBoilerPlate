const {User}  = require("../models/User");

let authoring = (req,res,next) =>{
     
     const token = req.cookies.x_auth;

     User.findByToken(token, (err, user)=>{
          if (err){return err}
          if(!user){
               return res.json({
                    isAuth:false,
                    error:true,
               })    
          }
          if (user) {
               req.token = token;
               req.user= user;
               next();
          }
     })
}

module.exports = {authoring}