const productModel = require("../models/productModel");
const adminModel = require("../models/adminModel")
const uploadImg = require("../middleware/multer/multer")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")

const createAdmin = async (req,res) =>{
  try {
    let{ email, password } = req.body
    const isAdmin = await adminModel.findOne({adminEmail : email})

    if(isAdmin){
    return res.status(400).json({message : "Admin already exists" })
    }

    await bcrypt.hash(password, 10, async(err, hash)=>{
      const admin = await adminModel.create({
         adminEmail: email,
         adminPassword: hash
        })
        res.status(200).json({message: "admin succesfully created"})
    } )
  
  } catch (error) {
    res.status(500).json({message: error.message})
  }
}

// GET LOGIN PAGE
const getlogin = async(req, res)=>{
    res.render("login",{ layout: false })
}

const login = async (req, res)=>{
  let{ email, password} = req.body
  const admin = await adminModel.findOne({ adminEmail: email})
  if(!admin){
    res.status(404).json({message: "Something went wrong(admin not found)"})
  }
  const isMatch = await bcrypt.compare(password, admin.adminPassword)
  if(!isMatch){
    res.status(400).json({message: "Something went Wrong ,Invalid password" })
  }
  let token = jwt.sign({email: email}, process.env.TOKEN_SECRETKEY)
  res.cookie("token", token) 
  return res.status(200).redirect("/")
}

const ManageProducts = async (req, res) => {
  res.render("./partials/manageProducts");
};

const index = async(req, res)=>{
  res.render("index")
}

const HeroSection = async (req, res) => {
  res.render("./partials/heroSection");
};

const FemaleSection = async (req, res) => {
  res.render("./partials/femaleSection");
};
const MaleSection = async (req, res) => {
  res.render("./partials/maleSection");
};
const BothSection = async (req, res) => {
  res.render("./partials/bothSection");
};

const featuredSection = async (req, res) => {
  res.render("./partials/featuredSection");
};
const CorouselSection = async (req, res) => {
  res.render("./partials/corouselSection");
};
const AboutSection = async (req, res) => {
  res.render("./partials/aboutSection");
};
const ProdSection = async (req, res) => {
  res.render("./partials/showProdSection");
};
const getCreateProd = async(req, res) =>{
    res.render("./partials/createProd");
}
const CreateProd = async (req, res) => {
    console.log("body:::", req.body)
    console.log("file:::", req.files)
  try {
    const { name, description, topNote, heartNote, baseNote, price} = req.body;
        if(!req.files || req.files.length === 0){
            return res.status(400).json({message:"NO FILE UPLOADED"})
        }
    
        const filePaths = req.files.map(file => `/public/product-images/${file.filename}`);
        console.log("paths:::", filePaths)
    const newProduct = await productModel.create({
      name: name,
      description: {
        overall: description,
        note: {
          topNote: topNote, // Array of strings
          heartNote: heartNote,
          baseNote: baseNote,
        },
      },
      price,
      imageURL: filePaths,
    });;
    await newProduct.save()
    res.status(200).json({ success: true, data: newProduct });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
}

const ReadProd = async (req, res) => {
  res.render("./partials/readProd");
};

module.exports = {
  createAdmin,
  getlogin,
  login,
  index,
  HeroSection,
  FemaleSection,
  MaleSection,
  BothSection,
  featuredSection,
  CorouselSection,
  AboutSection,
  ProdSection,
  ManageProducts,
  getCreateProd,
  CreateProd,
  ReadProd,
};
