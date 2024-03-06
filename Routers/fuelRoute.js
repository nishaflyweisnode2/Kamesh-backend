const express = require("express");
const {
    createFuel, getFuel, updateFuelbyId, deleteFuelbyId, getFuelbyId, getFuelData
} = require("../Controller/fuelController");
const router = express.Router();

router.route("/create").post(createFuel);
router.route("/get").get(getFuel);
router.route("/get/:id").get(getFuelbyId);
router.route("/update/:id").put(updateFuelbyId);
router.route("/delete/:id").delete(deleteFuelbyId);
router.route("/getFuelData").get(getFuelData);

module.exports = router;
