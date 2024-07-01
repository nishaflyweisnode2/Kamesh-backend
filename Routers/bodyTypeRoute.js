const express = require("express");
const {
    createbodyType, getbodyType, getbodyTypebyId, updatebodyTypebyId, deletebodyTypebyId, getBodyData, getCityData, getAllCity, getCitybyId, getAllDisplayName, getDisplayNamebyId, getDisplayNameData
} = require("../Controller/bodyTypeController");
const router = express.Router();

router.route("/create").post(createbodyType);
router.route("/get").get(getbodyType);
router.route("/get/:id").get(getbodyTypebyId);
router.route("/update/:id").put(updatebodyTypebyId);
router.route("/delete/:id").delete(deletebodyTypebyId);
router.route("/getBodyData").get(getBodyData);
router.route("/getCityData").get(getCityData);
router.route("/getAllCity").get(getAllCity);
router.route("/getCitybyId/:id").get(getCitybyId);
router.route("/getAllDisplayName").get(getAllDisplayName);
router.route("/getDisplayNamebyId/:id").get(getDisplayNamebyId);
router.route("/getDisplayNameData").get(getDisplayNameData);

module.exports = router;
