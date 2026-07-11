if(process.env.NODE_ENV != "production"){
  require('dotenv').config();
}

const express = require("express");
const app = express();
const  mongoose =require("mongoose");
const path = require("path");
const methodOverride = require("method-override");
const ejsMate =require("ejs-mate");
const ExpressError=require("./utils/ExpressError.js");
const session = require("express-session");
const MongoStore = require("connect-mongo").default;
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
const dns = require("dns");
const { error } = require('console');
dns.setServers(["1.1.1.1", "8.8.8.8"]);

const dbUrl = process.env.ATLAS_DB_URL;
console.log("DB:", dbUrl);

main()
     .then(()=> console.log("Connection created"))
     .catch((err) => console.log(err));

async function main() {
  await mongoose.connect(dbUrl);
}

const store = MongoStore.create({
  mongoUrl: dbUrl,
  crypto: {
    secret: process.env.SECRET,
  },
  touchAfter: 24 * 3600,
});

store.on("error", () =>{
  console.log("Error in Mongo Session Store", err);
})

const sessionOption ={
  store,
  secret : process.env.SECRET, 
  resave : false,
  saveUninitialized : true,
  cookie: {
    expires: Date.now() + 7 * 24 * 60 * 60 * 1000,
    maxAge:7 * 24 * 60 * 60 * 1000,
    httpOnly: true,
  },
};

// app.get("/",(req,res)=>{
//   res.send("Hi, I am Sakshi ");
// });


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