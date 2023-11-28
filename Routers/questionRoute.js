const express = require('express'); 
const questionControllers = require('../Controller/questionController');

const router = express();
// const upload = require("../middleware/fileUpload");/
// const { isAuthenticatedUser, authorizeRoles } = require("../middleware/auth");
// const authJwt = require("../middleware/authJwt");

router.post('/',[questionControllers.addQuestion]);
router.get('/',[  questionControllers.getQuestion]);


router.delete('/:id',[questionControllers.removeQuestion])


module.exports = router;