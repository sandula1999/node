require("dotenv").config();

const express = require("express");
const expressLayout = require("express-ejs-layouts");
const methodOverride = require('method-override')
const session = require("express-session");
const connectDB = require("./config/db");

const app = express();
const port = 5000;

//connect db
connectDB(); 

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(methodOverride("_method"));

 
//static files
app.use(express.static("/uploads"));

//express session
app.use(
  session({
    secret: "secret",
    resave: false,
    saveUninitialized: true,
    cookie: {
      maxAge: 1000 * 60 * 60 * 24 * 7, //1 week
    },
  })
);
 
//template engine
app.use(expressLayout);
app.set("layout", "./layouts/officeBearers-layout");
app.set("view engine", "ejs");

//routes
app.use("/", require("./routes/routes"));

app.listen(port, () => {
  console.log(`app listning port ${port}`);
});
