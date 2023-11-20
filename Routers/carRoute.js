const express = require("express");
const {
 createCar, getCar,getMostComparedCars,getCarbyId,updateCarbyId,bestSelling,upcoming,popular,justLaunched,addImages,numofReview,deleteCarbyId,newCar,getbestSelling,search,categorywiseInsert,categoryInsert,filter,myExcel,allfilter,singleExcel,compareCars,updateStatus,upcomingCars,allDataExcel,createCarbyExcel,uploadthroughExcel
} = require("../Controller/carController");
const router = express.Router();
const upload = require("../middleware/fileUpload");
const multer = require('multer');
const xlsx = require('xlsx');
const _ = require('lodash');
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './Controller/'); // Define your file upload destination
    },
    filename: function (req, file, cb) {
      cb(null, file.kamesh.xlsx); // Keep the original file name
    },
  });
  
  // const upload = multer({ storage: storage });
router.route("/create").post(createCar);
router.route("/get").get(getCar);
router.route("/get/:id").get(getCarbyId);
router.route("/update/:id").put(updateCarbyId);
router.route("/delete/:id").delete(deleteCarbyId);
router.route("/search").get(search);
router.route("/filter").get(filter);
router.route("/filter/all").get(allfilter);
router.route("/compare").get(compareCars);
router.route("/compare/most").get(getMostComparedCars);


router.route("/status/:id").put(updateStatus);
router.route("/upcoming").get(upcomingCars);

// router.route("/excel/upload").post(upload.single('file'),createCarbyExcel);
router.route("/uploadExcel").post(upload.single("uploadfiles"), uploadthroughExcel);


router.route("/allData").post( allDataExcel);
router.route("/single/excel").post( singleExcel);
router.route("/my/excel").post( myExcel);
router.route("/my/category").post( categoryInsert);
// router.route("/my/category/wise").post( categorywiseInsert);
router.route("/my/car").post( newCar);


router.route("/best/selling/:carId").put(bestSelling);
router.route("/best/selling/get").get(getbestSelling);
router.route("/topRated/get").get(numofReview);
router.route("/upcoming/get").get(upcoming);
router.route("/popular/get").get(popular);

router.route("/new/launched/get").get(justLaunched);


module.exports = router;
