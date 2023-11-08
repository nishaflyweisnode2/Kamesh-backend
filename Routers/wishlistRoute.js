const express = require("express");
const {
 addWishlist,removeWishlist,myWishlist
} = require("../Controller/wishlistController");
const authJwt = require("../middleware/authJwt");

const router = express.Router();

router.route("/add/:productId").post(authJwt.verifyToken,addWishlist);
router.route("/remove/:productId").delete(authJwt.verifyToken,removeWishlist);
router.route("/me").get(authJwt.verifyToken,myWishlist);

module.exports = router;
