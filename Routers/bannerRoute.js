const express = require('express'); 
const bannerControllers = require('../Controller/bannerController');

const router = express();
// const upload = require("../middleware/fileUpload");/
// const { isAuthenticatedUser, authorizeRoles } = require("../middleware/auth");
// const authJwt = require("../middleware/authJwt");

router.post('/',[ bannerControllers.AddBanner]);
router.get('/',[  bannerControllers.getBanner]);
router.route("/get/:id").get(bannerControllers.getbannerbyId);

router.put('/update/:id',[  bannerControllers.updateBanner]);

router.delete('/:id',[ bannerControllers.removeBanner])


module.exports = router;