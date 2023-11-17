const express = require('express'); 
const bannerControllers = require('../Controller/bottomController');

const router = express();
const upload = require("../middleware/fileUpload");
// const { isAuthenticatedUser, authorizeRoles } = require("../middleware/auth");
const authJwt = require("../middleware/authJwt");

router.post('/:name',[ bannerControllers.AddBanner]);
router.route("/get").get(bannerControllers.getbottom);



module.exports = router;