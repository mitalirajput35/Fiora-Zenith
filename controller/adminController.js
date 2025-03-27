const productModel = require("../models/productModel");
const adminModel = require("../models/adminModel");
const uploadImg = require("../middleware/multer/multer");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const fs = require("fs")
const path = require("path")
const createAdmin = async (req, res) => {
  try {
    let { email, password } = req.body;
    const isAdmin = await adminModel.findOne({ adminEmail: email });

    if (isAdmin) {
      return res.status(400).json({ message: "Admin already exists" });
    }

    await bcrypt.hash(password, 10, async (err, hash) => {
      const admin = await adminModel.create({
        adminEmail: email,
        adminPassword: hash,
      });
      res.status(200).json({ message: "admin succesfully created" });
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// GET LOGIN PAGE
const getlogin = async (req, res) => {
  res.render("login", { layout: false });
};

const login = async (req, res) => {
  let { email, password } = req.body;
  const admin = await adminModel.findOne({ adminEmail: email });
  if (!admin) {
    res.status(404).json({ message: "Something went wrong(admin not found)" });
  }
  const isMatch = await bcrypt.compare(password, admin.adminPassword);
  if (!isMatch) {
    res.status(400).json({ message: "Something went Wrong ,Invalid password" });
  }
  let token = jwt.sign({ email: email }, process.env.TOKEN_SECRETKEY);
  res.cookie("token", token);
  return res.status(200).redirect("/");
};

const ManageProducts = async (req, res) => {
  res.render("./partials/manageProducts");
};

const index = async (req, res) => {
  res.render("index");
};

const HeroSection = async (req, res) => {
  res.render("./partials/heroSection");
};

const FemaleSection = async (req, res) => {
  try {
    const femaleProducts = await productModel.find({ isAddedToFemale: true});
    const allProducts = await productModel.find({ category: "female", isAddedToFemale: false});
    res.render("./partials/femaleSection", { femaleProducts, allProducts });
  } catch (error) {
    console.log(error);
    res.status(500).send(error.message);
  }
  
};

const addTofemale = async(req,res)=>{
  try {
    const product_id = req.body.product_id;
    console.log(req.body.product_id);
    
    await productModel.findOneAndUpdate({product_id: product_id },{isAddedToFemale: true});
    res.redirect("/admin/categorySection/female")   
  } catch (error) {
    res.status(500).send(error.message);
  }
}
const removeFromFemale = async(req,res)=>{
  try {
    const product_id = req.body.product_id;
    console.log(req.body.product_id);
    
    await productModel.findOneAndUpdate({product_id: product_id },{isAddedToFemale: false});
    res.redirect("/admin/categorySection/female")   
  } catch (error) {
    res.status(500).send(error.message);
  }
}
const MaleSection = async (req, res) => {
  try {
    const maleProducts = await productModel.find({ isAddedToFemale: true});
    const allProducts = await productModel.find({ category: "male", isAddedToMale: false});
    res.render("./partials/maleSection", { maleProducts, allProducts });
  } catch (error) {
    console.log(error);
    res.status(500).send(error.message);
  }
};
const addToMale = async(req,res)=>{
  try {
    const product_id = req.body.product_id;
    console.log(req.body.product_id);
    
    await productModel.findOneAndUpdate({product_id: product_id },{isAddedToMale: true});
    res.redirect("/admin/categorySection/male")   
  } catch (error) {
    res.status(500).send(error.message);
  }
}
const removeFromMale = async(req,res)=>{
  try {
    const product_id = req.body.product_id;
    console.log(req.body.product_id);
    
    await productModel.findOneAndUpdate({product_id: product_id },{isAddedToMale: false});
    res.redirect("/admin/categorySection/male")   
  } catch (error) {
    res.status(500).send(error.message);
  }
}
const BothSection = async (req, res) => {
  try {
    const bothProducts = await productModel.find({ isAddedToBoth: true});
    const allProducts = await productModel.find({ category: "both", isAddedToBoth: false});
    res.render("./partials/bothSection", { bothProducts, allProducts });
  } catch (error) {
    console.log(error);
    res.status(500).send(error.message);
  }
};
const addToBoth = async(req,res)=>{
  try {
    const product_id = req.body.product_id;
    console.log(req.body.product_id);
    
    await productModel.findOneAndUpdate({product_id: product_id },{isAddedToBoth: true});
    res.redirect("/admin/categorySection/both")   
  } catch (error) {
    res.status(500).send(error.message);
  }
}
const removeFromBoth = async(req,res)=>{
  try {
    const product_id = req.body.product_id;
    console.log(req.body.product_id);
    
    await productModel.findOneAndUpdate({product_id: product_id },{isAddedToBoth: false});
    res.redirect("/admin/categorySection/both")   
  } catch (error) {
    res.status(500).send(error.message);
  }
}

const featuredSection = async (req, res) => {
  try {
    const featuredProducts = await productModel.find({ isFeatured: true});
    const allProducts = await productModel.find({ isFeatured: false});
    res.render("./partials/featuredSection", { featuredProducts, allProducts });
  } catch (error) {
    console.log(error);
    res.status(500).send(error.message);
  }
};
const addToFeatured = async(req,res)=>{
  try {
    const product_id = req.body.product_id;
    console.log(req.body.product_id);
    
    await productModel.findOneAndUpdate({product_id: product_id },{isFeatured: true});
    res.redirect("/admin/featuredSection")   
  } catch (error) {
    res.status(500).send(error.message);
  }
}
const removeFromFeatured = async(req,res)=>{
  try {
    const product_id = req.body.product_id;
    
    await productModel.findOneAndUpdate({product_id: product_id },{isFeatured: false});
    res.redirect("/admin/featuredSection")   
  } catch (error) {
    res.status(500).send(error.message);
  }
}
const CorouselSection = async (req, res) => {
  try {
    const corouseledProducts = await productModel.find({ isCorouseled: true});
    const allProducts = await productModel.find({ isCorouseled: false});
    res.render("./partials/corouselSection", { corouseledProducts, allProducts });
  } catch (error) {
    console.log(error);
    res.status(500).send(error.message);
  }
};

const addToCorousel = async(req,res)=>{
  try {
    const product_id = req.body.product_id;
    console.log(req.body.product_id);
    
    await productModel.findOneAndUpdate({product_id: product_id },{isCorouseled: true});
    res.redirect("/admin/corouselSection")   
  } catch (error) {
    res.status(500).send(error.message);
  }
}
const removeFromCorousel = async(req,res)=>{
  try {
    const product_id = req.body.product_id;
    console.log(req.body.product_id);
    
    await productModel.findOneAndUpdate({product_id: product_id },{isCorouseled: false});
    res.redirect("/admin/corouselSection")   
  } catch (error) {
    res.status(500).send(error.message);
  }
}

const AboutSection = async (req, res) => {
  res.render("./partials/aboutSection");
};
const ProdSection = async (req, res) => {
  res.render("./partials/showProdSection");
};
const getCreateProd = async (req, res) => {
  res.render("./partials/createProd");
};
const CreateProd = async (req, res) => {
  try {
    const generateUniqueId = async () => {
      let uniqueId;
      let exists = true;

      while (exists) {
        uniqueId = Math.floor(Math.random() * (5999 - 5000 + 1) + 5000);
        const existingProduct = await productModel.findOne({
          product_id: uniqueId,
        });
        if (!existingProduct) {
          exists = false;
        }
      }

      return uniqueId;
    };

    const { name, category, description, topNote, heartNote, baseNote, price } = req.body;
    if (!req.files || req.files.length === 0) {
      return res.status(400).json({ message: "NO FILE UPLOADED" });
    }
    const filePaths = req.files.map((file) => `${file.filename}`);

    const newProduct = await productModel.create({
      name: name,
      product_id: await generateUniqueId(),
      category: category,
      description: {
        overall: description,
        note: {
          topNote: topNote, // Array of strings
          heartNote: heartNote,
          baseNote: baseNote,
        },
      },
      price,
      image: filePaths,
    });
    await newProduct.save();
    res.status(200).json({ success: true, data: newProduct });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const ReadProd = async (req, res) => {
  try {
    const products = await productModel.find({});
    res.render("./partials/readProd", { products });
  } catch (error) {
    console.log(error);
    res.status(500).send(error.message);
  }
};

const getEdit = async (req, res) => {
try{
  product_id = req.params.product_id

  const product = await productModel.findOne({ product_id }).populate()
  res.render("./partials/editProd", {product});
}catch(error){
  res.status(500).send("Something went wrong")
}
};

const updateProd = async(req, res) =>{
  try {
    let product_id = req.params.product_id;
    let product = await productModel.findOne({ product_id });
    if(!product){
      return res.status(404).json({ success: false, message: "Product not found"})
    }
    let updatedFields = product
   
    // checking each field of req.body and according to that updating the fields
    if(req.body.name) updatedFields.name= req.body.name
    if(req.body.category) updatedFields.category= req.body.category
    if(req.body.price) updatedFields.price= req.body.price
    if(req.body.description) updatedFields.description.overall= req.body.description
    
    // converting strings to array
    if (req.body.topNote) updatedFields.description.note.topNote = req.body.topNote.split(",");
    if (req.body.heartNote) updatedFields.description.note.heartNote = req.body.heartNote.split(",");
    if (req.body.baseNote) updatedFields.description.note.baseNote = req.body.baseNote.split(",");

    if(req.files){
      updatedFields.image = [...(product.image || [] ), ...req.files.map((file) => file.filename)]
    }

    const updatedProduct = await productModel.findOneAndUpdate(
      {product_id: product_id},
      { $set: updatedFields },
      { new: true },
    )

    req.files =[];
    product = updatedProduct

    return res.status(200).render("./partials/editProd", {product})
  } catch (error) {
    res.status(500).send("error.message")
  }
}

const deleteImage = async(req, res)=>{
  try {
    image = req.params.image;
    const product = await productModel.findOne({image: image})
    
    product.image = product.image.filter((img) => img !== image);
    console.log(product.image)
    await product.save()

    const imagePath = path.join(__dirname, "../public/product-images", image);

    // Delete the file from the folder
    fs.unlink(imagePath, (err) => {
      if (err) {
        console.error("Error deleting file:", err);
  }
    return res.status(200).redirect(`/admin/editProducts/${product.product_id}`)
})
  } catch (error) {
    res.status(500).send(error.message)
  }
}


module.exports = {
  createAdmin,
  getlogin,
  login,
  index,
  HeroSection,
  FemaleSection,
  addTofemale,
  removeFromFemale,
  MaleSection,
  addToMale,
  removeFromMale,
  BothSection,
  addToBoth,
  removeFromBoth,
  featuredSection,
  addToFeatured,
  removeFromFeatured,
  CorouselSection,
  addToCorousel,
  removeFromCorousel,
  AboutSection,
  ProdSection,
  ManageProducts,
  getCreateProd,
  CreateProd,
  ReadProd,
  getEdit,
  updateProd,
  deleteImage
};
