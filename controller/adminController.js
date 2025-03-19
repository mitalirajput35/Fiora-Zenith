const productModel = require("../models/productModel");
const uploadImg = require("../middleware/multer/multer")

const login = async(req, res)=>{
    res.render("login")
}
const ManageProducts = async (req, res) => {
  res.render("./partials/manageProducts");
};

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
  login,
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
