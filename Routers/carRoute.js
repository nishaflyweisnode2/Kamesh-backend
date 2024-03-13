const express = require("express");
const {
  createCar, getCar, getMostComparedCars, newCheck, emiCalculator, getCarbyId, updateCarbyId, bestSelling, upcoming, justLaunchedCar, getJustLaunched, numofReview, deleteCarbyId, newCar, updateCarById, getbestSelling, search, filter, myExcel, allfilter, singleExcel, compareCars, upcomingCars, allDataExcel, getPopularCar, popularCar, highRatedCar, getHighRatedCar,showMostSearchedCars
} = require("../Controller/carController");
const authJwt = require("../middleware/authJwt");

const router = express.Router();
const upload = require("../middleware/fileUpload");
const multer = require('multer');
const xlsx = require('xlsx');
const _ = require('lodash');
const fileUpload = require('express-fileupload');
router.use(fileUpload());
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './Controller/');
  },
  filename: function (req, file, cb) {
    cb(null, file.kamesh.xlsx);
  },
});

// const upload = multer({ storage: storage });
router.route("/create").post(createCar);
router.route("/get").get(getCar);
router.route("/get/:id").get(getCarbyId);
router.route("/update/:id").put(updateCarbyId);
router.route("/delete/:id").delete(deleteCarbyId);
router.route("/search").get(authJwt.verifyToken, search);
router.route("/filter").get(filter);
router.route("/filter/all").get(allfilter);
router.route("/compare").get(compareCars);
router.route("/compare/most").get(getMostComparedCars);



router.route("/allData").post(allDataExcel);
router.route("/single/excel").post(singleExcel);
router.route("/my/car").post(newCar);
router.put('/cars/:carId/update', updateCarById);




router.route("/best/selling/:carId").put(bestSelling);
router.route("/best/selling/get").get(getbestSelling);
router.route("/popular/:carId").put(popularCar);
router.route("/popular/get").get(getPopularCar);
router.route("/highRatedCar/:carId").put(highRatedCar);
router.route("/highRatedCar/get").get(getHighRatedCar);
router.route("/topRated/get").get(numofReview);
router.route("/upcoming/:carId").put(upcomingCars);
router.route("/upcoming/get").get(upcoming);

router.route("/new/launched/:carId").put(justLaunchedCar);
router.route("/new/launched/get").get(getJustLaunched);
router.get('/emi-Calculator/:loanAmount/:interestRate/:tenure', emiCalculator);
router.get('/most-searched-cars', authJwt.verifyToken, showMostSearchedCars);




module.exports = router;
