const express = require("express")
const router = express.Router();
const {createAdmin,getlogin, login, index ,HeroSection, FemaleSection,addTofemale, removeFromFemale, MaleSection,addToMale, removeFromMale,  BothSection, addToBoth, removeFromBoth, featuredSection, addToFeatured, removeFromFeatured, CorouselSection, addToCorousel, removeFromCorousel, AboutSection, ProdSection, getCreateProd,CreateProd, ReadProd, getEdit, updateProd, deleteImage} = require("../controller/adminController")
const uploadImg = require("../middleware/multer/multer")
const adminAuth = require("../middleware/auth/adminAuth")


router.route("/createAdmin").post(adminAuth, createAdmin)
router.route("/getlogin").get(getlogin);
router.route("/login").post(login);

router.route("/login").post(adminAuth);
router.route("/").get(adminAuth, index);

router.route("/manageProducts/getcreateProd").get(adminAuth, getCreateProd);
router.route("/manageProducts/createProd").post(adminAuth, uploadImg.array("images", 4), CreateProd);
router.route("/manageProducts/readProd").get(adminAuth, ReadProd);
router.route("/editProducts/:product_id").get(adminAuth, getEdit)
router.route("/updateProd/:product_id").post(adminAuth, uploadImg.array("images", 4), updateProd);
router.route("/deleteImage/:image").post(adminAuth, deleteImage )




router.route("/heroSection").get(adminAuth, HeroSection);

router.route("/categorySection/female").get(adminAuth, FemaleSection);
router.route("/categorySection/addToFemale").post(adminAuth, addTofemale);
router.route("/categorySection/removeFromFemale").post(adminAuth, removeFromFemale);


router.route("/categorySection/male").get(adminAuth, MaleSection);
router.route("/categorySection/addToMale").post(adminAuth, addToMale);
router.route("/categorySection/removeFromMale").post(adminAuth, removeFromMale);

router.route("/categorySection/both").get(adminAuth, BothSection);
router.route("/categorySection/addToBoth").post(adminAuth, addToBoth);
router.route("/categorySection/removeFromBoth").post(adminAuth, removeFromBoth);


router.route("/featuredSection").get(adminAuth, featuredSection);
router.route("/addToFeatured").post(adminAuth, addToFeatured);
router.route("/removeFromFeatured").post(adminAuth, removeFromFeatured);

router.route("/corouselSection").get(adminAuth, CorouselSection);
router.route("/addToCorousel").post(adminAuth, addToCorousel);
router.route("/removeFromCorousel").post(adminAuth, removeFromCorousel);

router.route("/aboutSection").get(adminAuth, AboutSection);

router.route("/showProdSection").get(adminAuth, ProdSection);


module.exports = router;