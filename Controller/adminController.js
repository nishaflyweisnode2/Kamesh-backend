const User = require("../Models/userModel");
const dotenv = require("dotenv");
require('dotenv').config({ path: './config/config.env' });
const jwt = require("jsonwebtoken");
const mongoose = require('mongoose');
const Notification = require('../Models/notificationModel');
const bcrypt = require("bcryptjs");
const Car = require('../Models/carModel');
const ExcelJS = require('exceljs');
const nodemailer = require("nodemailer");
var newOTP = require("otp-generators");
const SearchLog = require('../Models/searchLogModel');
const Review = require('../Models/reviewmodel');
const Image = require('../Models/imageModel');
const usedCar = require("../Models/usedCarModel");






exports.registration = async (req, res) => {
    const { mobileNumber, email } = req.body;
    try {
        req.body.email = email.split(" ").join("").toLowerCase();
        let user = await User.findOne({ $and: [{ $or: [{ email: req.body.email }, { mobileNumber: mobileNumber }] }], role: "admin" });
        if (!user) {
            req.body.password = bcrypt.hashSync(req.body.password, 8);
            req.body.role = "admin";
            req.body.isVerified = true;
            const userCreate = await User.create(req.body);
            return res.status(200).send({ message: "registered successfully ", data: userCreate, });
        } else {
            return res.status(409).send({ message: "Already Exist", data: [] });
        }
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Server error" });
    }
};

exports.signin = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email: email, role: "admin" });
        if (!user) {
            return res
                .status(404)
                .send({ message: "user not found ! not registered" });
        }
        const isValidPassword = bcrypt.compareSync(password, user.password);
        if (!isValidPassword) {
            return res.status(401).send({ message: "Wrong password" });
        }
        const accessToken = jwt.sign({ id: user._id }, "node5flyweis");

        let obj = {
            userId: user._id,
            name: user.name,
            mobileNumber: user.mobileNumber,
            email: user.email,
            role: user.role,
        }
        return res.status(201).send({ data: obj, accessToken: accessToken });
    } catch (error) {
        console.error(error);
        return res.status(500).send({ message: "Server error" + error.message });
    }
};

exports.forgetPassword = async (req, res) => {
    try {
        const data = await User.findOne({ email: req.body.email });
        if (!data) {
            return res.status(400).send({ status: 400, data: {}, msg: "Incorrect email or password" });
        } else {
            let otp = newOTP.generate(4, { alphabets: false, upperCase: false, specialChar: false, });
            // var transporter = nodemailer.createTransport({ timeout: 600000, pool: true, service: 'gmail', auth: { "user": "test@gmail.com", "pass": "gganlypsemwqhwlh" } });
            // let mailOptions;
            // mailOptions = { from: 'Kamesh Car <test@gmail.com>', to: req.body.email, subject: 'Forget password verification', text: `Your Account Verification Code is ${otp}`, };
            // let info = await transporter.sendMail(mailOptions);
            // if (info) {
            let accountVerification = false;
            let otpExpiration = new Date(Date.now() + 5 * 60 * 1000);
            const updated = await User.findOneAndUpdate({ _id: data._id }, { $set: { accountVerification: accountVerification, otp: otp, otpExpiration: otpExpiration } }, { new: true, });
            if (updated) {
                return res.status(200).json({ message: "Otp send to your email.", status: 200, data: updated });
            } else {
                return res.status(200).json({ message: "Otp not send on your mail please check.", status: 200, data: {} });
            }
        }
    } catch (err) {
        console.log(err.message);
        return res.status(500).send({ msg: "internal server error", error: err.message, });
    }
};

exports.forgotVerifyotp = async (req, res) => {
    try {
        const { otp } = req.body;
        const user = await User.findOne({ email: req.body.email });
        if (!user) {
            return res.status(404).send({ message: "user not found" });
        }
        if (user.otp !== otp || user.otpExpiration < Date.now()) {
            return res.status(400).json({ message: "Invalid OTP" });
        }
        const updated = await User.findByIdAndUpdate({ _id: user._id }, { isVerified: true }, { new: true });
        let obj = { userId: updated._id, otp: updated.otp, }
        return res.status(200).send({ status: 200, message: "Verify otp successfully", data: obj });
    } catch (err) {
        console.log(err.message);
        return res.status(500).send({ error: "internal server error" + err.message });
    }
};

exports.changePassword = async (req, res) => {
    try {
        const user = await User.findOne({ _id: req.params.id });
        if (user) {
            if (req.body.newPassword == req.body.confirmPassword) {
                const updated = await User.findOneAndUpdate({ _id: user._id }, { $set: { password: bcrypt.hashSync(req.body.newPassword), accountVerification: true } }, { new: true });
                return res.status(200).send({ message: "Password update successfully.", data: updated, });
            } else {
                return res.status(501).send({ message: "Password Not matched.", data: {}, });
            }
        } else {
            return res.status(404).json({ status: 404, message: "No data found", data: {} });
        }
    } catch (error) {
        console.log(error);
        return res.status(501).send({ status: 501, message: "server error.", data: {}, });
    }
};

exports.resendOTP = async (req, res) => {
    const { id } = req.params;
    try {
        const user = await User.findOne({ _id: id, role: "admin" });
        if (!user) {
            return res.status(404).send({ status: 404, message: "User not found" });
        }
        const otp = newOTP.generate(4, { alphabets: false, upperCase: false, specialChar: false, });
        const otpExpiration = new Date(Date.now() + 5 * 60 * 1000);
        const isVerified = false;
        const updated = await User.findOneAndUpdate({ _id: user._id }, { otp, otpExpiration, isVerified }, { new: true });
        let obj = {
            id: updated._id,
            otp: updated.otp,
            mobileNumber: updated.mobileNumber
        }
        return res.status(200).send({ status: 200, message: "OTP resent", data: obj });
    } catch (error) {
        console.error(error);
        return res.status(500).send({ status: 500, message: "Server error" + error.message });
    }
};

exports.update = async (req, res) => {
    try {
        const { name, email, mobileNumber, password, address, liveIn, dateOfBirth, gender, twiterUrl, facebookurl } = req.body;
        const user = await User.findById(req.user.id);
        if (!user) {
            return res.status(404).send({ message: "not found" });
        }
        user.name = name || user.name;
        user.email = email || user.email;
        user.mobileNumber = mobileNumber || user.mobileNumber;
        user.address = address || user.address;
        user.liveIn = liveIn || user.liveIn;
        user.dateOfBirth = dateOfBirth || user.dateOfBirth;
        user.gender = gender || user.gender;
        user.twiterUrl = twiterUrl || user.twiterUrl;
        user.facebookurl = facebookurl || user.facebookurl;
        if (req.body.password) {
            user.password = bcrypt.hashSync(password, 8) || user.password;
        }
        const updated = await user.save();
        return res.status(200).send({ message: "updated", data: updated });
    } catch (err) {
        console.log(err);
        return res.status(500).send({
            message: "internal server error " + err.message,
        });
    }
};

exports.getAllUser = async (req, res) => {
    try {
        const users = await User.find();
        if (!users || users.length === 0) {
            return res.status(404).json({ status: 404, message: 'Users not found' });
        }

        const formattedUsers = users.map(user => ({
            _id: user._id,
            user: user,
            memberSince: user.createdAt.toLocaleDateString('en-GB', {
                day: 'numeric',
                month: 'numeric',
                year: 'numeric',
            }),
        }));

        return res.status(200).json({
            status: 200,
            data: formattedUsers,
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ status: 500, error: 'Internal Server Error' });
    }
};

exports.getUserById = async (req, res) => {
    try {
        const { userId } = req.params;

        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ status: 404, message: 'User not found' });
        }

        const memberSince = user.createdAt.toLocaleDateString('en-GB', {
            day: 'numeric',
            month: 'numeric',
            year: 'numeric',
        });

        return res.status(200).json({
            status: 200, data: {
                user,
                memberSince,
            },
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ status: 500, error: 'Internal Server Error' });
    }
};

exports.deleteUser = async (req, res) => {
    try {
        const userId = req.params.id;

        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ status: 404, message: 'User not found' });
        }

        await User.findByIdAndDelete(userId);

        return res.status(200).json({ status: 200, message: 'User deleted successfully' });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ status: 500, error: 'Internal Server Error' });
    }
};

exports.createCar = async (req, res) => {
    try {

        const {
            Brand_name,
            Brand_link,
            Car_first_link,
            Car_link,
            State,
            Location,
            cityId,
            Display_name,
            ModelId,
            Make,
            ModelName,
            Launched_date,
            varient_link,
            price_breakup_url,
            Varient_name,
            Varient_id,
            EMI,
            ExShowroomPrice,
            SKU,
            MPN,
            bodyType,
            fuelType,
            fuelConsumption,
            summery_description,
            color_options,
            color_options_with_images,
            vehicleTransmission,
            driveWheelConfiguration,
            rating,
            reviewCount,
            totalRatings,
            Total_image_count,
            review_text,
            brochure_link,
            Upcoming_Cars,
            video_link,
            sponsored_cars,
            nearByCities_price,
            nearByArea_price,
            popularCities_price,
            minPrice,
            maxPrice,
            RTOCorporate,
            RTO,
            AMC,
            Insurance,
            HypothecationCharges,
            FASTag,
            AccessoriesPackage,
            LoyaltyCard,
            TopSpeed,
            Acceleration,
            City,
            Mileage,
            Highway,
            Range,
            Engine,
            EngineType,
            FuelType,
            MaxPower,
            MaxTorque,
            Performance,
            ElectricMotor,
            MaxMotor,
            DrivingRange,
            Drivetrain,
            Transmission,
            EmissionStandard,
            Turbocharger,
            Battery,
            BatteryCharging,
            Others,
            AlternateFuel,
            Length,
            Width,
            Height,
            Wheelbase,
            GroundClearance,
            KerbWeight,
            Doors,
            SeatingCapacity,
            NoofRows,
            Bootspace,
            FuelTankCapacity,
            FourWheelSteering,
            FrontSuspension,
            RearSuspension,
            FrontBrake,
            RearBrakeType,
            MinimumTurningRadius,
            SteeringTypeWheels,
            SpareWheel,
            FrontTyres,
            RearTyres,
            Overspeed,
            PunctureRepairKit,
            NCAPRating,
            Airbags,
            RearMiddleThreePointseatbelt,
            TyrePressureMonitoringSystem,
            Seat,
            AntiLock,
            Electronic,
            BrakeAssist,
            ElectronicStabilityProgram,
            HillHoldControl,
            EngineImmobiliser,
            CentralLocking,
            SpeedSensingDoor,
            Lock,
            SafetyLock,
            AirConditioner,
            FrontAC,
            Heater,
            Vanity,
            Mirrors,
            Cabin,
            AntiglareMirrors,
            ParkingAssist,
            ParkingSensors,
            Headlight,
            Keyless,
            Start,
            SteeringAdjustment,
            PowerOutlets,
            FindMyCar,
            CheckVehicleStatus,
            Geofence,
            RemoteAC,
            CarLock,
            CarLightFlashing,
            Drive,
            FrontPassenger,
            SeatUpholstery,
            LeatherwrappedSteeringWheel,
            RearPassengerSeat,
            Interiors,
            InteriorColours,
            RearArmrestFolding,
            RearSeat,
            SplitRear,
            FrontSeatbackPockets,
            Headrests,
            CupHolders,
            CooledGlovebox,
            ORVMColour,
            ScuffPlates,
            PowerWindows,
            OneTouchDown,
            OneTouchUp,
            AdjustableORVMs,
            TurnIndicators,
            RearDefogger,
            RearWiper,
            ExteriorDoor,
            RainsensingWipers,
            InteriorDoorHandles,
            DoorPockets,
            BootlidOpener,
            RoofmountedAntenna,
            BodycolouredBumpers,
            BodyKitRub,
            Headlights,
            AutomaticHeadlamps,
            FollowMeHomeHeadlamps,
            Taillights,
            DaytimeRunningLights,
            FogLights,
            PuddleLamps,
            CabinLamps,
            HeadlightHeightAdjuster,
            InstantaneousConsumption,
            InstrumentCluster,
            TripMeter,
            AverageFuelConsumption,
            AverageSpeed,
            DistancetoEmptyClock,
            LowFuelLevelWarning,
            DoorAjarWarning,
            AdjustableClusterBrightness,
            GearIndicator,
            ShiftIndicator,
            Tachometer,
            SmartConnectivity,
            Display,
            Touchscreen,
            SizeIntegratedMusicSystem,
            Speakers,
            Steeringmounted,
            controls,
            VoiceCommand,
            GPSNavigationSystem,
            BluetoothCompatibility,
            AUXCompatibility,
            AMRadio,
            USBCompatibility,
            HeadUnitSize,
            iPodCompatibility,
            BatteryWarranty,
            Warranty,
            MCD,
            ExtendedWarranty,
            EmergencyBrake,
            LightFlashing,
            isPopular,
            isHighRatedCar,
            isBestSelling,
            isUpcomingCars,
            isJustLaunchedCar
        } = req.body;

        let images = [];
        if (req.files) {
            for (let j = 0; j < req.files.length; j++) {
                let obj = {
                    url: req.files[j].path,
                };
                images.push(obj);
            }
        }

        const newCar = new Car({
            Brand_name,
            Brand_link,
            Car_first_link,
            Car_link,
            State,
            Location,
            cityId,
            Display_name,
            ModelId,
            Make,
            ModelName,
            Launched_date,
            varient_link,
            price_breakup_url,
            Varient_name,
            Varient_id,
            EMI,
            ExShowroomPrice,
            SKU,
            MPN,
            bodyType,
            fuelType,
            fuelConsumption,
            summery_description,
            color_options,
            color_options_with_images,
            vehicleTransmission,
            driveWheelConfiguration,
            rating,
            reviewCount,
            totalRatings,
            Total_image_count,
            car_images: images,
            review_text,
            brochure_link,
            Upcoming_Cars,
            video_link,
            sponsored_cars,
            nearByCities_price,
            nearByArea_price,
            popularCities_price,
            minPrice,
            maxPrice,
            RTOCorporate,
            RTO,
            AMC,
            Insurance,
            HypothecationCharges,
            FASTag,
            AccessoriesPackage,
            LoyaltyCard,
            TopSpeed,
            Acceleration,
            City,
            Mileage,
            Highway,
            Range,
            Engine,
            EngineType,
            FuelType,
            MaxPower,
            MaxTorque,
            Performance,
            ElectricMotor,
            MaxMotor,
            DrivingRange,
            Drivetrain,
            Transmission,
            EmissionStandard,
            Turbocharger,
            Battery,
            BatteryCharging,
            Others,
            AlternateFuel,
            Length,
            Width,
            Height,
            Wheelbase,
            GroundClearance,
            KerbWeight,
            Doors,
            SeatingCapacity,
            NoofRows,
            Bootspace,
            FuelTankCapacity,
            FourWheelSteering,
            FrontSuspension,
            RearSuspension,
            FrontBrake,
            RearBrakeType,
            MinimumTurningRadius,
            SteeringTypeWheels,
            SpareWheel,
            FrontTyres,
            RearTyres,
            Overspeed,
            PunctureRepairKit,
            NCAPRating,
            Airbags,
            RearMiddleThreePointseatbelt,
            TyrePressureMonitoringSystem,
            Seat,
            AntiLock,
            Electronic,
            BrakeAssist,
            ElectronicStabilityProgram,
            HillHoldControl,
            EngineImmobiliser,
            CentralLocking,
            SpeedSensingDoor,
            Lock,
            SafetyLock,
            AirConditioner,
            FrontAC,
            Heater,
            Vanity,
            Mirrors,
            Cabin,
            AntiglareMirrors,
            ParkingAssist,
            ParkingSensors,
            Headlight,
            Keyless,
            Start,
            SteeringAdjustment,
            PowerOutlets,
            FindMyCar,
            CheckVehicleStatus,
            Geofence,
            RemoteAC,
            CarLock,
            CarLightFlashing,
            Drive,
            FrontPassenger,
            SeatUpholstery,
            LeatherwrappedSteeringWheel,
            RearPassengerSeat,
            Interiors,
            InteriorColours,
            RearArmrestFolding,
            RearSeat,
            SplitRear,
            FrontSeatbackPockets,
            Headrests,
            CupHolders,
            CooledGlovebox,
            ORVMColour,
            ScuffPlates,
            PowerWindows,
            OneTouchDown,
            OneTouchUp,
            AdjustableORVMs,
            TurnIndicators,
            RearDefogger,
            RearWiper,
            ExteriorDoor,
            RainsensingWipers,
            InteriorDoorHandles,
            DoorPockets,
            BootlidOpener,
            RoofmountedAntenna,
            BodycolouredBumpers,
            BodyKitRub,
            Headlights,
            AutomaticHeadlamps,
            FollowMeHomeHeadlamps,
            Taillights,
            DaytimeRunningLights,
            FogLights,
            PuddleLamps,
            CabinLamps,
            HeadlightHeightAdjuster,
            InstantaneousConsumption,
            InstrumentCluster,
            TripMeter,
            AverageFuelConsumption,
            AverageSpeed,
            DistancetoEmptyClock,
            LowFuelLevelWarning,
            DoorAjarWarning,
            AdjustableClusterBrightness,
            GearIndicator,
            ShiftIndicator,
            Tachometer,
            SmartConnectivity,
            Display,
            Touchscreen,
            SizeIntegratedMusicSystem,
            Speakers,
            Steeringmounted,
            controls,
            VoiceCommand,
            GPSNavigationSystem,
            BluetoothCompatibility,
            AUXCompatibility,
            AMRadio,
            USBCompatibility,
            HeadUnitSize,
            iPodCompatibility,
            BatteryWarranty,
            Warranty,
            MCD,
            ExtendedWarranty,
            EmergencyBrake,
            LightFlashing,
            isPopular,
            isHighRatedCar,
            isBestSelling,
            isUpcomingCars,
            isJustLaunchedCar
        });

        await newCar.save();

        return res.status(201).json({ message: "Car created successfully", car: newCar });
    } catch (error) {
        console.error("Error creating car:", error);
        return res.status(500).json({ message: "Internal server error", error: error.message });
    }
};

exports.updateCar = async (req, res) => {
    try {
        const carId = req.params.id;
        const updates = req.body;
        const images = req.files;

        if (!carId) {
            return res.status(400).json({ message: "Car ID is required" });
        }

        let car = await Car.findById(carId);

        if (!car) {
            return res.status(404).json({ message: "Car not found" });
        }

        for (const key in updates) {
            car[key] = updates[key];
        }

        if (images && images.length > 0) {
            const newImages = images.map(image => ({ url: image.path }));
            car.car_images = newImages;
        }

        await car.save();

        return res.status(200).json({ message: "Car updated successfully", car });
    } catch (error) {
        console.error("Error updating car:", error);
        return res.status(500).json({ message: "Internal server error", error: error.message });
    }
};

exports.updateCarImageById = async (req, res) => {
    try {
        const carId = req.params.carId;

        const car = await Car.findById(carId);
        if (!car) {
            return res.status(404).json({ message: "Car not found" });
        }

        let images = [];
        if (req.files) {
            for (let j = 0; j < req.files.length; j++) {
                let obj = {
                    url: req.files[j].path,
                };
                images.push(obj);
            }
        }

        car.car_images = images;
        await car.save();

        return res.status(200).json({ message: "Car images uploaded successfully", car });
    } catch (error) {
        console.error("Error uploading car images:", error);
        return res.status(500).json({ message: "Internal server error", error: error.message });
    }
};

exports.exportCarsToExcel = async (req, res) => {
    try {
        const cars = await Car.find();

        const headers = [
            { header: 'Brand Name', key: 'Brand_name', width: 20 },
            { header: 'Brand Link', key: 'Brand_link', width: 20 },
            { header: 'Car Link', key: 'Car_link', width: 20 },
            { header: 'State', key: 'State', width: 20 },
            { header: 'Location', key: 'Location', width: 20 },
            { header: 'City ID', key: 'cityId', width: 20 },
            { header: 'Is Popular', key: 'isPopular', width: 15 },
            { header: 'Is High Rated Car', key: 'isHighRatedCar', width: 20 },
            { header: 'Is Best Selling', key: 'isBestSelling', width: 15 },
            { header: 'Is Upcoming Cars', key: 'isUpcomingCars', width: 20 },
            { header: 'Is Just Launched Car', key: 'isJustLaunchedCar', width: 20 },
        ];

        const workbook = new ExcelJS.Workbook();
        const worksheet = workbook.addWorksheet('Cars');

        worksheet.getRow(1).font = { bold: true };

        worksheet.columns = headers.map(header => ({
            header: header.header,
            key: header.key,
            width: header.width,
        }));

        cars.forEach((car) => {
            worksheet.addRow({
                Brand_name: car.Brand_name,
                Brand_link: car.Brand_link,
                Car_link: car.Car_link,
                State: car.State,
                Location: car.Location,
                cityId: car.cityId,
                isPopular: car.isPopular,
                isHighRatedCar: car.isHighRatedCar,
                isBestSelling: car.isBestSelling,
                isUpcomingCars: car.isUpcomingCars,
                isJustLaunchedCar: car.isJustLaunchedCar,
            });
        });

        res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
        res.setHeader('Content-Disposition', 'attachment; filename=cars.xlsx');

        await workbook.xlsx.write(res);

        return res.end();
    } catch (error) {
        console.error('Error exporting cars to Excel:', error);
        return res.status(500).json({ message: 'Internal server error', error: error.message });
    }
};

exports.findMostSearchedCarForAllUsers = async (req, res) => {
    try {
        const mostSearchedCars = await SearchLog.aggregate([
            { $group: { _id: "$carId", count: { $sum: 1 } } },
            { $sort: { count: -1 } },
            { $limit: 10 }
        ]);

        if (mostSearchedCars.length === 0) {
            return res.status(404).json({ status: 404, message: "No searched cars found" });
        }

        const carIds = mostSearchedCars.map(item => item._id);

        const carsData = await Car.find({ _id: { $in: carIds } });

        const mostSearchedCarsWithData = mostSearchedCars.map(item => {
            const carData = carsData.find(car => car._id.toString() === item._id.toString());
            return {
                car: carData,
                searchCount: item.count
            };
        });

        return res.status(200).json({ status: 200, message: "Most searched cars found", data: mostSearchedCarsWithData });
    } catch (error) {
        console.error("Error fetching most searched cars:", error);
        return res.status(500).json({ status: 500, message: "Internal server error", error: error.message });
    }
};

exports.getAllReviews = async (req, res) => {
    try {
        const userId = req.user._id;

        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ status: 404, message: 'User not found' });
        }

        const reviews = await Review.find();

        res.status(200).json({
            status: 200,
            message: 'Reviews found for car',
            data: reviews
        });
    } catch (error) {
        console.error('Error fetching reviews for car:', error);
        res.status(500).json({
            status: 500,
            message: 'Internal server error',
            error: error.message
        });
    }
};

exports.getReviewByUserId = async (req, res) => {
    try {
        const { userId } = req.params;

        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ status: 404, message: 'User not found' });
        }

        const reviews = await Review.find({ userId: userId });

        res.status(200).json({
            status: 200,
            message: 'Reviews found for car',
            data: reviews
        });
    } catch (error) {
        console.error('Error fetching reviews for car:', error);
        res.status(500).json({
            status: 500,
            message: 'Internal server error',
            error: error.message
        });
    }
};

exports.getCarReviews = async (req, res) => {
    try {
        const carId = req.params.carId;
        const userId = req.user._id;

        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        const reviews = await Review.find({ carId: carId });

        res.status(200).json({
            status: 200,
            message: 'Reviews found for car',
            data: reviews
        });
    } catch (error) {
        console.error('Error fetching reviews for car:', error);
        res.status(500).json({
            status: 500,
            message: 'Internal server error',
            error: error.message
        });
    }
};

exports.deleteReview = async (req, res) => {
    try {
        const reviewId = req.params.reviewId;

        const review = await Review.findById(reviewId);
        if (!review) {
            return res.status(404).json({ status: 404, message: 'Review not found' });
        }

        await Review.findByIdAndDelete(reviewId);

        res.status(200).json({ status: 200, message: 'Review deleted successfully', data: review });
    } catch (error) {
        console.error('Error deleting review:', error);
        res.status(500).json({ status: 500, message: 'Internal server error', error: error.message });
    }
};

exports.imageUplod = async (req, res) => {
    try {
        console.log(req.file);
        let images = [];
        if (req.files) {
            for (let j = 0; j < req.files.length; j++) {
                let obj = {
                    url: req.files[j].path,
                };
                images.push(obj);
            }
        }
        const data = { images: images };

        const banner = await Image.create(data);
        return res
            .status(200)
            .json({
                message: "Image added successfully.",
                status: 200,
                data: banner,
            });
    } catch (error) {
        res.status(500).json({
            status: 500,
            message: "Internal server error",
            data: error.message,
        });
    }
};

exports.uploadCarImage = async (req, res) => {
    try {
        const { carId } = req.params;

        const car = await Car.findById(carId);
        if (!car) {
            return res.status(404).json({ message: 'Car not found' });
        }

        const newImages = [];

        if (req.files) {
            for (let file of req.files) {
                if (file.path) {
                    const imageUrl = file.path;
                    newImages.push({ url: imageUrl });
                } else {
                    console.error('Failed to upload file:', file.originalname);
                }
            }
        }

        // Append new images to the existing car images array
        car.car_images = car.car_images.concat(newImages);

        const updatedCar = await car.save();

        return res.json({ message: 'Car images added successfully', data: updatedCar });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Failed to add car images', error: error.message });
    }
};

exports.getPendingVerificationCars = async (req, res) => {
    try {
        const pendingVerificationUsers = await usedCar.find({ isAdminApproved: false });

        return res.status(200).json({
            status: 200,
            data: pendingVerificationUsers,
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ status: 500, error: 'Internal Server Error' });
    }
};

exports.updateVerificationStatus = async (req, res) => {
    try {
        const carId = req.params.id;
        const { isAdminApproved, remarks, status } = req.body;

        const car = await usedCar.findById(carId);
        if (!car) {
            return res.status(404).json({ status: 404, message: 'car not found' });
        }

        car.isAdminApproved = isAdminApproved;
        car.remarks = remarks;

        if (status) {
            car.status = status;
        }

        if (isAdminApproved === false) {
            car.isRejectedCar = true;
        } else if (isAdminApproved === true) {
            car.isRejectedCar = false;
        }

        await car.save();

        // const welcomeMessage = `Hi, ${car.name}! Your Car Is Verifed By Admin Now You Can Book Your First Ride.`;
        // const welcomeNotification = new Notification({
        //     recipient: car._id,
        //     content: welcomeMessage,
        // });
        // await welcomeNotification.save();

        return res.status(200).json({
            status: 200,
            message: 'Verification status updated successfully',
            data: car,
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ status: 500, error: 'Internal Server Error' });
    }
};

exports.getVerifiedCars = async (req, res) => {
    try {
        const verifiedUsers = await usedCar.find({ isAdminApproved: true });

        if (!verifiedUsers || verifiedUsers.length === 0) {
            return res.status(404).json({ status: 404, message: 'No verified Car found' });
        }

        return res.status(200).json({ status: 200, data: verifiedUsers });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ status: 500, message: 'Failed to retrieve verified car', error: error.message });
    }
};

exports.getRejectCars = async (req, res) => {
    try {
        const verifiedUsers = await usedCar.find({ isAdminApproved: false, isRejectedCar: true });

        if (!verifiedUsers || verifiedUsers.length === 0) {
            return res.status(404).json({ status: 404, message: 'No rejected car found' });
        }

        return res.status(200).json({ status: 200, data: verifiedUsers });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ status: 500, message: 'Failed to retrieve Rejected cars', error: error.message });
    }
};