const express = require("express");
const {
    createBrand, getBrand, getBrandbyId, updateBrandbyId, deleteBrandbyId, getBrandName, getBrandData
} = require("../Controller/brandController");
const router = express.Router();

router.route("/create/:name").post(createBrand);
router.route("/get").get(getBrand);
router.route("/get1").get(getBrandName);
router.route("/getBrandData").get(getBrandData);
router.route("/get/:id").get(getBrandbyId);
router.route("/update/:id").put(updateBrandbyId);
router.route("/delete/:id").delete(deleteBrandbyId);

module.exports = router;
