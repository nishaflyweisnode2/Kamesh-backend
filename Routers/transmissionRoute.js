const express = require("express");
const {
 createTransmission, getTransmission,updateTransmissionbyId,deleteTransmissionbyId,getTransmissionbyId
} = require("../Controller/transmissionController");
const router = express.Router();

router.route("/create").post(createTransmission);
router.route("/get").get(getTransmission);
router.route("/get/:id").get(getTransmissionbyId);
router.route("/update/:id").put(updateTransmissionbyId);
router.route("/delete/:id").delete(deleteTransmissionbyId);

module.exports = router;
