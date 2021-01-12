const express = require("express");
const app = express();
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
// const CookieParser = require("cookie-parser");
const cookieParser = require("cookie-parser");

const { User } = require("./models/User");
const config = require("./config/key");
const { auth } = require("./middleware/auth")
const cors = require('cors');

mongoose
  .connect(`${config.mongodbURL}`, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  })
  .then(() => { console.log("mongodb connected"); })
  .catch((err) => { console.log("db err ", err); });
mongoose.set('useNewUrlParser', true);

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());
const corsOpts = {
  origin: '*',

  methods: [
    'GET',
    'POST',
  ],

  allowedHeaders: [
    'Content-Type',
  ],
};
app.use(cors({
  "origin": "*",
  "methods": "GET,HEAD,PUT,PATCH,POST,DELETE",
  "preflightContinue": false,
  "optionsSuccessStatus": 204
}));



app.use("/api/user/auth", auth, (req, resp) => {
  resp.status(200).json({
    id: req._id,
    isAuth: true,
    email: req.user.email,
    name: req.user.name,
    lastname: req.user.lastname,
    role: req.user.role
  })
})

app.post("/api/user/register", (req, res) => {
  const userData = new User(req.body);
  userData.save((err, respData) => {
    if (err) {
      console.log("err", err);
      return res
        .json({ message: err, status: 500, success: false })
        .status(500);
    }
    if (respData) {
      res.status(200).json({ data: userData, success: true, state: 200 });
    }
  });
});

app.post("/api/user/login", (req, resp) => {
  // find the email
  User.findOne({ email: req.body.email }, (err, userData) => {
    //     console.log("err ", err, userData, User,req.body);
    if (!userData) {
      return resp.json({
        status: 200,
        message: "email not found",
        loginSuccess: false,
      });
    }
    if (userData) {
      // compare password
      userData.comparePassword(req.body.password, (err, isMatch) => {
        if (!isMatch) {
          return resp.json({
            status: 200,
            message: "wrong password",
            loginSuccess: false,
          });
        }
        if (isMatch) {
          // jwt token generation
          userData.generateToken((err, user) => {
            if (err) {
              return resp.json({ status: 500, message: err });
            }
            if (user) {
              resp.cookie("x_authExp", user.tokenExpires)
              return resp.cookie("x_auth", user.token).json({
                message: "login successfully",
                token: user.token,
                userid: user.id,
                loginSuccess: true
              }).status(200);
            }
          });
        }
      });
    }
  });

});

app.post("/api/user/logout", auth, (req, resp) => {

  User.findOneAndUpdate({ _id: req.user._id }, {
    token: ""
  }, (err, doc) => {
    if (err) {
      return resp.status(500).json({ message: err })
    }
    return resp.json({ message: "user logout successfully" })
  })
})

app.listen("5000");
