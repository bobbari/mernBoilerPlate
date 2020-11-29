const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const saltRounds = 10;
const jwt = require('jsonwebtoken');
const moment = require('moment');
const secretWord = 'secret'
const userSchema = mongoose.Schema({
     name:{
          type: String,
          maxLength:50,
     },
     email:{
          type: String,
          trim:true,
          unique:1,
     },
     password:{
          type: String,
          minLength:5
     },
     lastname:{
          type: String,
          maxLength:50,
     },
     role:{
          type:Number,
          default:0
     },
     token:{
          type:String,
     },
     tokenExpires:{
          type:String,
     }

})
userSchema.pre("save", function (next){
     var user = this; 
     if (user.isModified("password")) {
          bcrypt.genSalt(saltRounds, function(err, salt) {
               const myPlaintextPassword = user.password
               if (err) {return next(err);}
               bcrypt.hash(myPlaintextPassword, salt, function(err, hash) {
                    if (err) {return next(err);} 
                   // Store hash in your password DB.
                    user.password = hash;
                    next();
               });
          });
     }else{
          next();
     }
})

userSchema.methods.comparePassword = function(planPassword,cb){
     // console.log("planPassword", planPassword,this.password)
     bcrypt.compare(planPassword,this.password,function(err,isMatch){
          // console.log("err ", err,isMatch);
          if(err){
               return cb(err);}
          cb(null, isMatch)
     })
}
userSchema.methods.generateToken = function(cd){
     var user = this;
     var token = jwt.sign(user._id.toHexString(),secretWord);
     var oneHour = moment().add(1, 'hour').valueOf();
     // console.log("token", oneHour)
     user.tokenExp = oneHour;
     user.token = token;
     
     // user.tokenExpires =  "";
     user.save(function(err,user) {
          if (err) {return cd(err);}
          cd(null, user);
     })

}

userSchema.statics.findByToken = function(token,cb){
     const user= this;
     // verfy the jwt token
     jwt.verify(token,secretWord,function(err, decoded){
          user.findOne({"_id":decoded, "token":token},function(err,user){
               if (err) { return cb(err); }
               cb(null, user); 
          })
     })
}

const User =  mongoose.model("user", userSchema);

module.exports = {User};