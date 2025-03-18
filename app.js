require("dotenv").config();
const db = require("./config/connection")
const express= require("express");
const app = express();
const port = process.env.PORT;
const path = require("path")
const expressLayout = require("express-ejs-layouts")
const adminRoute = require("./routes/adminRoute")
const router = express.Router();
 

app.use(expressLayout)
app.set("view engine", "ejs")
app.use(express.static(path.join(__dirname, "public")));
app.use(express.json());
app.use(express.urlencoded({ extended: true}))

app.use("/admin", adminRoute)

app.get("/", (req, res) =>{
    res.render("index");
})

app.listen(3000,()=>{
    console.log(process.env.PORT, process.env.DB, process.env.MONGODB_URI)
})