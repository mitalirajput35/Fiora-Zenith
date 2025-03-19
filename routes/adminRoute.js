const express = require("express")
const router = express.Router();
const {login, HeroSection, FemaleSection, MaleSection, BothSection, featuredSection, CorouselSection, AboutSection, ProdSection, ManageProducts, getCreateProd,CreateProd, ReadProd} = require("../controller/adminController")
const uploadImg = require("../middleware/multer/multer")

router.route("/login").get(login);
router.route("/manageProducts").get(ManageProducts);
router.route("/manageProducts/getcreateProd").get(getCreateProd);
router.route("/manageProducts/createProd").post(uploadImg.array("images", 5), CreateProd);
router.route("/manageProducts/readProd").get(ReadProd);

router.route("/heroSection").get(HeroSection);

router.route("/categorySection/female").get(FemaleSection);
router.route("/categorySection/male").get(MaleSection);
router.route("/categorySection/both").get(BothSection);


router.route("/featuredSection").get(featuredSection);

router.route("/corouselSection").get(CorouselSection);

router.route("/aboutSection").get(AboutSection);

router.route("/showProdSection").get(ProdSection);


module.exports = router;