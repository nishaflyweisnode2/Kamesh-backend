const express = require("express");
const {
 createBrand, getBrand,getBrandbyId,updateBrandbyId,deleteBrandbyId
} = require("../Controller/brandController");
const router = express.Router();

router.route("/create").post(createBrand);
router.route("/get").get(getBrand);
router.route("/get/:id").get(getBrandbyId);
router.route("/update/:id").put(updateBrandbyId);
router.route("/delete/:id").delete(deleteBrandbyId);

module.exports = router;
