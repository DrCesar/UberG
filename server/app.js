const express = require("express")
const app = express()
const bodyParser = require("body-parser")
const mongoose = require("mongoose")
const passport = require("passport")
const LocalStrategy = require("passport-local")
const user = require("./models/user")
const cors = require('cors')
const routes = require('./router')


app.use(bodyParser.json())
app.use(cors())

mongoose.Promise = global.Promise;
mongoose.connect("mongodb://ciborg:uverg@ds127490.mlab.com:27490/uverg").catch(error => {console.log(error)});


//===========
// PASSPORT CONFIG
//===========
// app.use(require("express-session")({
//     secret: "corsair feline",
//     resave: false,
//     saveUninitialized: false
// }));
app.use(passport.initialize());
app.use(passport.session());

passport.use(new LocalStrategy(user.authenticate()));
passport.serializeUser(user.serializeUser());
passport.deserializeUser(user.deserializeUser());

app.use(function(req, res, next){
    res.locals.currentUser = req.user;
    next();
});


app.use('/api', routes);

app.listen(8080, function() {
    console.log("listening on port 8080")
});
