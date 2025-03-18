const express = require("express")
const router = express.Router();
const { HeroSection, FemaleSection, MaleSection, BothSection, featuredSection, CorouselSection, AboutSection, ProdSection, ManageProducts, CreateProd, ReadProd} = require("../controller/adminController")

router.route("/manageProducts").get(ManageProducts);
router.route("/manageProducts/createProd").get(CreateProd).post(CreateProd);
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