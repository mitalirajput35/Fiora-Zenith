// const config = require("config");
require("dotenv").config();
const mongoose = require("mongoose");
const mongo = `${process.env.MONGODB_URI}/${process.env.DB}`
console.log("fromo connecion file",mongo)

mongoose.connect(`${process.env.MONGODB_URI}/${process.env.DB}`)
.then(()=> console.log("connected to MongoDB"))
.catch((err)=> console.log("err.message"))


module.exports = mongoose.connection;

