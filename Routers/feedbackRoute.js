const express = require('express'); 
const feedbackControllers = require('../Controller/feedbackController');
const authJwt = require("../middleware/authJwt");


const router = express();
// const upload = require("../middleware/fileUpload");/
// const { isAuthenticatedUser, authorizeRoles } = require("../middleware/auth");
// const authJwt = require("../middleware/authJwt");

router.post('/',[authJwt.verifyToken],feedbackControllers.addFeedback);
router.get('/',[  feedbackControllers.getFeedback]);
router.route("/get/:id").get(feedbackControllers.getfeedbackbyId);

router.put('/update/:id',[  feedbackControllers.updatefeedback]);

router.delete('/:id',[feedbackControllers.removefeedback])


module.exports = router;