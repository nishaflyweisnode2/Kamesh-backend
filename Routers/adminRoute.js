const express = require('express');
const auth = require('../Controller/adminController');

const authJwt = require("../middleware/authJwt");

const { carImage } = require('../middleware/iamgeUpload');

const router = express();


router.post("/api/v1/admin/registration", auth.registration);
router.post("/api/v1/admin/login", auth.signin);
router.post("/api/v1/admin/forgetPassword", auth.forgetPassword);
router.post("/api/v1/admin/forgotVerifyotp", auth.forgotVerifyotp);
router.post("/api/v1/admin/changePassword/:id", auth.changePassword);
router.post("/api/v1/admin/resendOtp/:id", auth.resendOTP);
router.put("/api/v1/admin/update", [authJwt.isAdmin], auth.update);
router.get("/api/v1/admin/profile", [authJwt.isAdmin], auth.getAllUser);
router.get("/api/v1/admin/profile/:userId", [authJwt.isAdmin], auth.getUserById);
router.delete('/api/v1/admin/users/profile/delete/:id', [authJwt.isAdmin], auth.deleteUser);
router.post("/api/v1/admin/car/create", [authJwt.isAdmin], carImage.array('image'), auth.createCar);
router.put("/api/v1/admin/car/:id/update", [authJwt.isAdmin], carImage.array('image'), auth.updateCar);
router.post("/api/v1/admin/car/:carId/upload-images", carImage.array('image', 250), auth.updateCarImageById)
router.get('/api/v1/admin/car/export/excel', auth.exportCarsToExcel);
router.get('/api/v1/admin/car/most-searched-cars', authJwt.isAdmin, auth.findMostSearchedCarForAllUsers);
router.get('/api/v1/admin/reviews/cars', [authJwt.isAdmin], auth.getAllReviews);
router.get('/api/v1/admin/reviews/user/:userId', [authJwt.isAdmin], auth.getReviewByUserId);
router.get('/api/v1/admin/cars/:carId/reviews', [authJwt.isAdmin], auth.getCarReviews);
router.delete('/api/v1/admin/reviews/:reviewId', [authJwt.isAdmin], auth.deleteReview);





module.exports = router;