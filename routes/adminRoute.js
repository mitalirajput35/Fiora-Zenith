const express = require("express")
const router = express.Router();
const {createAdmin,getlogin, login, index ,HeroSection, FemaleSection, MaleSection, BothSection, featuredSection, CorouselSection, AboutSection, ProdSection, ManageProducts, getCreateProd,CreateProd, ReadProd} = require("../controller/adminController")
const uploadImg = require("../middleware/multer/multer")
const adminAuth = require("../middleware/auth/adminAuth")


router.route("/createAdmin").post(adminAuth, createAdmin)
router.route("/getlogin").get(getlogin);
router.route("/login").post(login);

router.route("/login").post(adminAuth);
router.route("/").get(adminAuth, index);
router.route("/manageProducts/getcreateProd").get(adminAuth, getCreateProd);
router.route("/manageProducts/createProd").post(adminAuth, uploadImg.array("images", 5), CreateProd);
router.route("/manageProducts/readProd").get(ReadProd);

router.route("/heroSection").get(adminAuth, HeroSection);

router.route("/categorySection/female").get(adminAuth, FemaleSection);
router.route("/categorySection/male").get(adminAuth, MaleSection);
router.route("/categorySection/both").get(adminAuth, BothSection);


router.route("/featuredSection").get(adminAuth, featuredSection);

router.route("/corouselSection").get(adminAuth, CorouselSection);

router.route("/aboutSection").get(adminAuth, AboutSection);

router.route("/showProdSection").get(adminAuth, ProdSection);


module.exports = router;