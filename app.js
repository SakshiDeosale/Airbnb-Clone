const express = require("express");
const app = express();
const  mongoose =require("mongoose");
const path = require("path");
const methodOverride = require("method-override");
const ejsMate =require("ejs-mate");
const ExpressError=require("./utils/ExpressError.js");
const session = require("express-session");
const flash = require("connect-flash");
const passport = require("passport");
const passportLocal = require("passport-local");
const User = require("./models/user.js");

const listingsRouter = require("./route/listing.js");
const reviewsRouter = require("./route/review.js");
const userRouter = require("./route/user.js");

app.set("view engine","ejs");
app.set("views",path.join(__dirname,"views"));
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));
app.engine("ejs",ejsMate);
app.use(express.json());
app.use(express.static(path.join(__dirname,"/public")));

main()
     .then(()=> console.log("Connection created"))
     .catch((err) => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/wanderlust');
}

const sessionOption ={
  secret : "mysupersecretcode",
  resave : false,
  saveUninitialized : true,
  cookie: {
    expires: Date.now() + 7 * 24 * 60 * 60 * 1000,
    maxAge:7 * 24 * 60 * 60 * 1000,
    httpOnly: true,
  },
};

app.get("/",(req,res)=>{
  res.send("Hi, I am Sakshi ");
});

app.use(session(sessionOption));
app.use(flash());   //use before all routes

app.use(passport.initialize());
app.use(passport.session());
passport.use(new passportLocal(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use((req,res,next) => {
  res.locals.success = req.flash("success");
  res.locals.error = req.flash("error");
  res.locals.currUser = req.user;
  next();
});


// app.get("/demouser", async(req,res) => {
//      let fakeUser = new User({
//       email: "sakshi@gmail.com",
//       username: "delta-student",
//      });

//      let registeredUser = await User.register(fakeUser, "hello");
//      res.send(registeredUser);
// });

app.use("/listings",listingsRouter);
app.use("/listings/:id/reviews",reviewsRouter);
app.use("/",userRouter);

app.all("*",(req,res,next) => {
  next(new ExpressError(404,"Page Not Found"));
});

app.use((err,req,res,next)=>{
  let {statusCode=500, message="Somthing went wrong"} = err;
  res.status(statusCode).render("error.ejs",{message});
});

app.listen(8080, ()=>{
    console.log("server listening on port 8080");
});