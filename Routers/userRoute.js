const express = require("express");
const {
  registerUser, loginUser, registerAdmin, resendOtp, verifyAdmin, loginAdmin, logout, verifyadminlogin, getUserDetails, verifyOtp, verifyOtplogin, updateProfile, createReview, getUserReviews, getCarReviews, uploadIdPicture, addIntrestedCar, getAllIntrestedInCar, getIntrestedInCar, getIntrestedInCarById, updateIntrestedInCar, deleteIntrestedInCar
} = require("../Controller/userController");

const authJwt = require("../middleware/authJwt");
const { profileImage } = require("../middleware/iamgeUpload");

const router = express.Router();
router.route("/register").post(registerUser);
router.route("/login").post(loginUser);

router.route("/verify/otp").post(verifyOtp);
router.route("/resend/otp").post(resendOtp);

router.post('/reviews', [authJwt.verifyToken], createReview);
router.get('/reviews/cars', [authJwt.verifyToken], getUserReviews);
router.get('/cars/:carId/reviews', [authJwt.verifyToken], getCarReviews);
router.put('/user/upload-id-picture', [authJwt.verifyToken], profileImage.single('image'), uploadIdPicture);

router.post('/user/interested', [authJwt.verifyToken], addIntrestedCar)
router.get('/user/all/interested', [authJwt.verifyToken], getAllIntrestedInCar)
router.get('/user/interested', [authJwt.verifyToken], getIntrestedInCar)
router.get('/user/interested/:id', [authJwt.verifyToken], getIntrestedInCarById)
router.put('/user/interested/:id', [authJwt.verifyToken], updateIntrestedInCar)
router.delete('/user/interested/:id', [authJwt.verifyToken], deleteIntrestedInCar)



module.exports = router;