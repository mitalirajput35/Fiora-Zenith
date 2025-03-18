const productModel = require("../models/productModel");

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

const CreateProd = async (req, res) => {
  try {
    const { name, description, topNote, heartNote, baseNote, price, image } = req.body;
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
      image,
    });
    res.status(200).json({ success: true, data: newProduct });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
const ReadProd = async (req, res) => {
  res.render("./partials/readProd");
};

module.exports = {
  HeroSection,
  FemaleSection,
  MaleSection,
  BothSection,
  featuredSection,
  CorouselSection,
  AboutSection,
  ProdSection,
  ManageProducts,
  CreateProd,
  ReadProd,
};
