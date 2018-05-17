var mongoose = require("mongoose");
var passportlocalmongoose = require("passport-local-mongoose");
var userSchema = new mongoose.Schema({
    email: String,
    password: String,
    name: String,
    verification: Boolean,
    isDriver: Boolean
});

userSchema.plugin(passportlocalmongoose);
module.exports = mongoose.model("User", userSchema);
