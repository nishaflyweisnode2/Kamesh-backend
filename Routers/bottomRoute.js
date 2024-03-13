const express = require('express');
const bannerControllers = require('../Controller/bottomController');

const router = express();
const upload = require("../middleware/fileUpload");
// const { isAuthenticatedUser, authorizeRoles } = require("../middleware/auth");
const authJwt = require("../middleware/authJwt");

router.post('/:name', [bannerControllers.AddBanner]);
router.route("/get").get(bannerControllers.getbottom);
router.route("/get/:id").get(bannerControllers.getBottombyId);

router.put("/update/:id", [bannerControllers.updateBottom]);

router.delete("/:id", [bannerControllers.removeBottom]);



module.exports = router;