const express = require("express");
const {
 createbodyType, getbodyType,getbodyTypebyId,updatebodyTypebyId,deletebodyTypebyId
} = require("../Controller/bodyTypeController");
const router = express.Router();

router.route("/create").post(createbodyType);
router.route("/get").get(getbodyType);
router.route("/get/:id").get(getbodyTypebyId);
router.route("/update/:id").put(updatebodyTypebyId);
router.route("/delete/:id").delete(deletebodyTypebyId);

module.exports = router;
