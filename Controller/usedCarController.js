const Brand = require("../Models/brandModel");
const Car = require("../Models/carModel");
const usedCar = require("../Models/usedCarModel");
const Company = require("../Models/companyModel");
const CompareHistory = require("../Models/compareHistory");
const User = require('../Models/userModel');
const SearchLog = require('../Models/searchLogModel');
const Review = require('../Models/reviewmodel');


const excel = require("exceljs");
const bodyType = require("../Models/bodyTypeModel");
const Transmission = require("../Models/transmissionModel");
const fuel = require("../Models/fuelModel");
const fs = require("fs");
// const imagePattern = "[^\\s]+(.*?)\\.(jpg|jpeg|png|gif|JPG|JPEG|PNG|GIF)$";
// const multer = require("multer");
// const { CloudinaryStorage } = require("multer-storage-cloudinary");
// const cloudinary = require("cloudinary").v2;
// const {
//   Company,
//   Model,
//   Variant,
//   Feature,
//   Specification,
// } = require('../Models/excelModel');
// const { Company, Model } = require('../Models/excelModel');
// const Company = require('../Models/excelModel'); // Import your Company model
// const Model = require('../Models/excelModel');
const imagePattern = "[^\\s]+(.*?)\\.(jpg|jpeg|png|gif|JPG|JPEG|PNG|GIF)$";
const multer = require("multer");
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const cloudinary = require("cloudinary").v2;
cloudinary.config({
    cloud_name: 'dvwecihog',
    api_key: '364881266278834',
    api_secret: '5_okbyciVx-7qFz7oP31uOpuv7Q'
  });
const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
        folder: "images/image",
        allowed_formats: ["jpg", "jpeg", "png", "PNG", "xlsx", "xls", "pdf", "PDF", "jiff", "JIFF", "jfif", "JFIF", "mp4", "MP4", "webm", "WEBM"],
    },
});
const upload = multer({ storage: storage });

const xlsx = require("xlsx");
const { log } = require("console");










exports.createUsedCar = async (req, res) => {
    try {

        const userId = req.user._id;
        const userData = await User.findOne({ _id: userId });
        if (!userData) {
            return res.status(404).send({ status: 404, message: "User not found" });
        }
        const {
            owner,
            km,
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

        const newCar = new usedCar({
            userId: userId,
            owner,
            km,
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

        let car = await usedCar.findById(carId);

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

        const car = await usedCar.findById(carId);
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

exports.getCar = async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const pageSize = parseInt(req.query.pageSize) || 10;

        const totalCars = await usedCar.countDocuments();
        const totalPages = Math.ceil(totalCars / pageSize);

        const cars = await usedCar.find()
            .skip((page - 1) * pageSize)
            .limit(pageSize).populate('userId');

        res.status(200).json({
            message: "Cars fetched successfully",
            status: 200,
            data: cars,
            totalPages: totalPages,
            currentPage: page
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};


exports.getCarbyId = async (req, res) => {
    try {
        const carId = req.params.id;

        // Retrieve the car by ID from the database
        const car = await usedCar.findById(carId);

        if (!car) {
            // If the car is not found, return a 404 error
            return res.status(404).json({ error: "Car not found" });
        }

        res.status(200).json(car);
    } catch (error) {
        res.status(500).json({ error: "Internal Server Error" });
    }
};

exports.updateCarbyId = async (req, res) => {
    try {
        const carId = req.params.id;
        const updatedCarData = req.body;

        // Find the car by its ID and update it
        const updatedCar = await usedCar.findByIdAndUpdate(carId, updatedCarData, {
            new: true, // Return the updated car object
        });

        if (!updatedCar) {
            // If the car is not found, return a 404 error
            return res.status(404).json({ error: "Car not found" });
        }

        res.status(200).json(updatedCar);
    } catch (error) {
        res.status(500).json({ error: "Internal Server Error" });
    }
};

exports.deleteCarbyId = async (req, res) => {
    try {
        const carId = req.params.id;

        // Find the car by its ID and delete it
        const deletedCar = await usedCar.findByIdAndRemove(carId);

        if (!deletedCar) {
            // If the car is not found, return a 404 error
            return res.status(404).json({ error: "Car not found" });
        }

        res.status(200).json({ message: "Car deleted successfully" });
    } catch (error) {
        res.status(500).json({ error: "Internal Server Error" });
    }
};

exports.search = async (req, res) => {
    try {
        const userId = req.user._id;

        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        const { search, status, page, limit } = req.query;

        let query = {};

        if (search) {
            query.$or = [
                { "Transmission": { $regex: search, $options: "i" } },
                { "description": { $regex: search, $options: "i" } },
                { "Brand_name": { $regex: search, $options: "i" } },
                { "Varient_name": { $regex: search, $options: "i" } },
                { "bodyType": { $regex: search, $options: "i" } },
                { "fuelType": { $regex: search, $options: "i" } },
                { "ModelName": { $regex: search, $options: "i" } },
                { "Transmission": { $regex: search, $options: "i" } }
            ];
        }

        if (status) {
            query.status = status;
        }

        let options = {
            page: Number(page) || 1,
            limit: Number(limit) || 1005,
            sort: { createdAt: -1 }
        };

        let data = await usedCar.paginate(query, options);

        for (const car of data.docs) {
            const searchLog = new SearchLog({
                userId: userId,
                searchQuery: search,
                carId: car._id,
                timestamp: new Date()
            });
            await searchLog.save();
        }

        return res.status(200).json({ status: 200, message: "Car data found.", data: data });
    } catch (err) {
        console.error("Error in searching cars:", err);
        return res.status(500).json({ status: 500, message: "Internal server error", error: err.message });
    }
};

exports.filter = async (req, res, next) => {
    try {
        const minPrice = req.query.minPrice || 0;
        const maxPrice = req.query.maxPrice || Infinity;
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;

        const skip = (page - 1) * limit;

        const filteredCars = await usedCar.find({
            ExShowroomPrice: { $gte: minPrice, $lte: maxPrice },
        }).skip(skip)
            .limit(limit);

        console.log(filteredCars);
        res
            .status(200)
            .json({ message: "result", status: 200, data: filteredCars });

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

exports.allfilter = async (req, res, next) => {
    try {
        const {
            minPrice,
            maxPrice,
            minMileage,
            maxMileage,
            minYear,
            maxYear,
            seatCapacity,
            color,
            carId,
            Brand_name,
            sort,
            FuelType,
            bodyType,
            page,
            limit,
        } = req.query;

        const filter = {};

        if (minPrice && maxPrice) {
            filter.ExShowroomPrice = { $gte: parseFloat(minPrice), $lte: parseFloat(maxPrice) };
        }

        if (minMileage && maxMileage) {
            filter.Mileage = {
                $gte: parseFloat(minMileage),
                $lte: parseFloat(maxMileage),
            };
        }

        if (minYear && maxYear) {
            filter.year = { $gte: parseInt(minYear), $lte: parseInt(maxYear) };
        }
        if (seatCapacity) {
            filter.SeatingCapacity = parseInt(seatCapacity);
        }
        if (FuelType) {
            filter.FuelType = FuelType;
        }
        if (bodyType) {
            filter.bodyType = bodyType;
        }

        if (nearByCities_price) {
            const cityFilter = [nearByCities_price];
            filter['nearByCities_price.city'] = { $in: cityFilter };
            console.log("cityFilter", cityFilter);
        }

        // if (color) {
        //   filter.color_options = color;
        // }
        // if (color) {
        //   const colors = color.split('|').map(color => color.trim());
        //   filter.color_options = { $in: colors };
        //   console.log("*****",colors);
        // }   

        if (color) {
            filter.color_options = { $exists: true };
        }
        console.log("//*", color);
        if (carId) {
            filter._id = carId;
        }

        if (Brand_name) {
            filter.Brand_name = Brand_name;
        }
        const sortOptions = {};
        if (sort === "lowToHigh") {
            sortOptions.ExShowroomPrice = 1;
        } else if (sort === "highToLow") {
            sortOptions.ExShowroomPrice = -1;
        }

        const pageNumber = parseInt(page) || 1;
        const itemsPerPage = parseInt(limit) || 10;
        const skip = (pageNumber - 1) * itemsPerPage;

        const filteredCars = await usedCar.find(filter)
            .sort(sortOptions)
            .skip(skip)
            .limit(itemsPerPage)
            .exec();

        const carCount = await usedCar.countDocuments(filter);
        res.status(200).json({
            message: "result",
            status: 200,
            data: filteredCars,
            count: carCount,
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, error: "Internal Server Error" });
    }
};

exports.getMostComparedCars = async (req, res, next) => {
    try {
        // Find the most compared pair
        const mostComparedPair = await CompareHistory.find().populate("car1 car2");

        if (!mostComparedPair) {
            return res.status(404).json({ message: "No comparisons found" });
        }

        // Return the most compared pair
        res.status(200).json({
            message: "mostComparedPair",
            status: 200,
            data: mostComparedPair,
        });

        // res.status(200).json({ mostComparedPair });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
};

exports.compareCars = async (req, res, next) => {
    console.log("hi1");
    try {
        const { car1Id, car2Id } = req.query;

        // Retrieve details of the first car
        const car1 = await usedCar.findById(car1Id);
        if (!car1) {
            return res.status(404).json({ message: "First car not found" });
        }

        // Retrieve details of the second car
        const car2 = await usedCar.findById(car2Id);
        if (!car2) {
            return res.status(404).json({ message: "Second car not found" });
        }

        // Log the comparison
        await logComparison(car1._id, car2._id);

        // Return details of both cars
        res.status(200).json({ car1, car2 });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
};

async function logComparison(car1Id, car2Id) {
    console.log("hi");
    try {
        // Find or create a comparison record for the given car pair
        const comparisonRecord = await CompareHistory.findOneAndUpdate(
            {
                car1: car1Id,
                car2: car2Id,
            },
            {
                $inc: { count: 1 },
            },
            { upsert: true, new: true }
        );

        console.log(`Comparison logged: ${car1Id} vs ${car2Id}`);

        return comparisonRecord;
    } catch (error) {
        console.error("Error logging comparison:", error);
    }
}

exports.allDataExcel = async (req, res) => {
    try {
        // Read the uploaded Excel file
        const excelFile = req.files.file; // Assuming you're using a file upload library like `express-fileupload`

        if (!excelFile) {
            return res.status(400).json({ error: "Excel file not provided" });
        }

        const workbook = xlsx.read(excelFile.data); // Read the Excel data from the uploaded file

        // Extract data from the first (and presumably only) sheet in the Excel file
        const sheetName = workbook.SheetNames[0];
        const sheetData = xlsx.utils.sheet_to_json(workbook.Sheets[sheetName]);

        // Iterate through the rows and save them to the Car collection
        for (const row of sheetData) {
            const car = new usedCar(row);
            await car.save();
        }

        res.json({ message: "Data created from Excel file" });
    } catch (error) {
        console.error("Error creating data from Excel file:", error);
        res
            .status(500)
            .json({ error: "An error occurred while processing the Excel file" });
    }
};

exports.singleExcel = async (req, res) => {
    try {
        // Assuming you have a middleware or library for handling file uploads
        const excelFile = req.files.file;

        if (!excelFile) {
            return res.status(400).json({ error: "Excel file not provided" });
        }

        const workbook = xlsx.read(excelFile.data);

        const sheetName = workbook.SheetNames[0];
        const sheetData = xlsx.utils.sheet_to_json(workbook.Sheets[sheetName]);

        for (const row of sheetData) {
            // Create a new Car document and save it to the database
            const car = new usedCar({
                ID: row.ID,
                modelName: row["Model name"],
                allVersions: row["All Versions"],
                carColors: row["Car colors"],
                Company: row["Company"],
            });
            await car.save();
        }

        res.json({ message: "Data created from Excel file" });
    } catch (error) {
        console.error("Error creating data from Excel file:", error);
        res
            .status(500)
            .json({ error: "An error occurred while processing the Excel file" });
    }
};

exports.bestSelling = async (req, res) => {
    try {
        const carId = req.params.carId;
        const { isBestSelling } = req.body;
        const car = await usedCar.findById(carId);

        if (!car) {
            return res.status(404).json({ error: "Car not found" });
        }

        car.isBestSelling = isBestSelling;

        await car.save();

        return res.status(200).json({ status: 200, message: "Car marked as the best-selling car", data: car });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal server error" });
    }
};

exports.getbestSelling = async (req, res) => {
    try {
        const bestSellingCar = await usedCar.find({ isBestSelling: true });

        if (!bestSellingCar) {
            return res.status(404).json({ error: "Best-selling car not found" });
        }

        return res.status(200).json({ status: 200, message: 'data get sucessfully', data: bestSellingCar });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal server error" });
    }
};

exports.popularCar = async (req, res) => {
    try {
        const carId = req.params.carId;
        const { isPopular } = req.body;

        const car = await usedCar.findById(carId);

        if (!car) {
            return res.status(404).json({ error: "Car not found" });
        }

        car.isPopular = isPopular;

        await car.save();

        return res.status(200).json({ status: 200, message: "Car marked as the Popular car", data: car });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal server error" });
    }
};

exports.getPopularCar = async (req, res) => {
    try {
        const bestSellingCar = await usedCar.find({ isPopular: true });

        if (!bestSellingCar) {
            return res.status(404).json({ error: "Best-selling car not found" });
        }

        return res.status(200).json({ status: 200, message: 'data get sucessfully', data: bestSellingCar });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal server error" });
    }
};

exports.highRatedCar = async (req, res) => {
    try {
        const carId = req.params.carId;
        const { isHighRatedCar } = req.body;

        const car = await usedCar.findById(carId);

        if (!car) {
            return res.status(404).json({ error: "Car not found" });
        }

        car.isHighRatedCar = isHighRatedCar;

        await car.save();

        return res.status(200).json({ status: 200, message: "Car marked as the High-rated car", data: car });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal server error" });
    }
};

exports.getHighRatedCar = async (req, res) => {
    try {
        const bestSellingCar = await usedCar.find({ isHighRatedCar: true });

        if (!bestSellingCar) {
            return res.status(404).json({ error: "Best-selling car not found" });
        }

        return res.status(200).json({ status: 200, message: 'data get sucessfully', data: bestSellingCar });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal server error" });
    }
};

exports.numofReview = async (req, res) => {
    try {
        // Find the car with the highest numOfReviews
        const mostReviewedCar = await usedCar.find().sort("-numOfReviews");

        if (!mostReviewedCar) {
            return res.status(404).json({ error: "No cars found" });
        }
        res
            .status(200)
            .json({ message: "top rated", status: 200, data: mostReviewedCar });

        // res.json({ mostReviewedCar });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal server error" });
    }
};

exports.upcomingCars = async (req, res) => {
    try {
        const carId = req.params.carId;
        const { isUpcomingCars } = req.body;

        const car = await usedCar.findById(carId);

        if (!car) {
            return res.status(404).json({ error: "Car not found" });
        }

        car.isUpcomingCars = isUpcomingCars;

        await car.save();

        return res.status(200).json({ status: 200, message: "Car marked as the Upcoming Cars car", data: car });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal server error" });
    }
};

exports.upcoming = async (req, res) => {
    try {
        const upcomingCars = await usedCar.find({ isUpcomingCars: true });

        if (upcomingCars.length === 0) {
            return res.status(404).json({ message: "No upcoming cars found" });
        }
        return res.status(200).json({ status: 200, message: 'data get sucessfully', data: upcomingCars });

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal server error" });
    }
};

exports.justLaunchedCar = async (req, res) => {
    try {
        const carId = req.params.carId;
        const { isJustLaunchedCar } = req.body;

        const car = await usedCar.findById(carId);

        if (!car) {
            return res.status(404).json({ error: "Car not found" });
        }

        car.isJustLaunchedCar = isJustLaunchedCar;

        await car.save();

        return res.status(200).json({ status: 200, message: "Car marked as the High-rated car", data: car });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal server error" });
    }
};

exports.getJustLaunched = async (req, res) => {
    try {
        const newestCar = await usedCar.find({ isJustLaunchedCar: true });

        if (!newestCar) {
            return res.status(404).json({ message: "No cars found" });
        }

        return res.status(200).json({ message: "just launched", status: 200, data: newestCar });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal server error" });
    }
};

exports.newCar1 = async (req, res) => {
    try {
        const excelFile = req.files.excelFile;

        if (!excelFile) {
            return res.status(400).json({ error: "Excel file not provided" });
        }

        const fileBuffer = excelFile.data;
        const workbook = xlsx.read(fileBuffer, { type: "buffer" });
        const sheetName = workbook.SheetNames[0];
        const sheetData = xlsx.utils.sheet_to_json(workbook.Sheets[sheetName]);

        const data = [];

        for (const row of sheetData) {
            let carImageURLs;
            if (row.car_images != (null || undefined)) {
                carImageURLs = row.car_images.split("|");
            } else {
                carImageURLs = null;
            }
            const carImages = [];
            if (carImageURLs != (null || undefined)) {
                if (carImageURLs.length > 0) {
                    for (const url of carImageURLs) {
                        carImages.push({ url });
                    }
                }
            }
            let colorOptionsArray;
            if (row.color_options != (null || undefined)) {
                colorOptionsArray = row.color_options.split("|").map(option => option.trim());
            } else {
                colorOptionsArray = null;
            }
            console.log("colorOptionsArray", colorOptionsArray);
            let colorOptionsWithImagesArray;
            if (row.color_options_with_images) {
                colorOptionsWithImagesArray = row.color_options_with_images.split("|").map(option => {
                    const parts = option.split(":");
                    const name = parts[0].trim();
                    const url = parts.slice(1).join(":").trim();
                    return { name, url };
                });
            }

            let cityPricesArray;
            if (row.nearByCities_price) {
                cityPricesArray = row.nearByCities_price.split("|").map(cityPrice => {
                    const [city, price] = cityPrice.split(":").map(item => item.trim());
                    return { city, price };
                });
            }

            let popularCityPricesArray;
            if (row.popularCities_price) {
                popularCityPricesArray = row.popularCities_price.split("|").map(cityPrice => {
                    const [city, price] = cityPrice.split(":").map(item => item.trim());
                    return { city, price };
                });
            }

            console.log("popularCityPricesArray", popularCityPricesArray);
            console.log("row.popularCities_price", row.popularCities_price);

            const carData = {
                Brand_name: row.Brand_name,
                Brand_link: row.Brand_link,
                Car_first_link: row.Car_first_link,
                Car_link: row.Car_link,
                State: row.State,
                Location: row.Location,
                cityId: row.cityId,
                Display_name: row.Display_name,
                ModelId: row.ModelId,
                Make: row.Make,
                ModelName: row.ModelName,
                Launched_date: row.Launched_date,
                varient_link: row.varient_link,
                price_breakup_url: row.price_breakup_url,
                Varient_name: row.Varient_name,
                Varient_id: row.Varient_id,
                EMI: row.EMI,
                ExShowroomPrice: row.ExShowroomPrice,
                SKU: row.SKU,
                MPN: row.MPN,
                bodyType: row.bodyType,
                fuelType: row.fuelType,
                fuelConsumption: row.fuelConsumption,
                summery_description: row.summery_description,
                color_options: colorOptionsArray,
                color_options_with_images: colorOptionsWithImagesArray,
                vehicleTransmission: row.vehicleTransmission,
                driveWheelConfiguration: row.driveWheelConfiguration,
                rating: row.rating,
                reviewCount: row.reviewCount,
                totalRatings: row.totalRatings,
                Total_image_count: row.Total_image_count,
                // car_images: [{
                //   url: carImages,
                // }],
                car_images: carImages,
                review_text: [{
                    username: row.username,
                    review: row.review_text,
                }],
                brochure_link: row.brochure_link,
                Upcoming_Cars: row.Upcoming_Cars,
                video_link: row.video_link,
                sponsored_cars: row.sponsored_cars,
                nearByCities_price: cityPricesArray,
                nearByArea_price: row.nearByArea_price,
                popularCities_price: popularCityPricesArray,
                minPrice: row.minPrice,
                maxPrice: row.maxPrice,
                RTOCorporate: row.RTOCorporate,
                RTO: row.RTO,
                AMC: row.AMC,
                Insurance: row.Insurance,
                HypothecationCharges: row.HypothecationCharges,
                FASTag: row.FASTag,
                ExtendedWarranty: row.ExtendedWarranty,
                AccessoriesPackage: row.AccessoriesPackage,
                LoyaltyCard: row.LoyaltyCard,
                TopSpeed: row.TopSpeed,
                Acceleration: row.Acceleration,
                City: row.City,
                Mileage: row.Mileage,
                Highway: row.Highway,
                Range: row.Range,
                Engine: row.Engine,
                EngineType: row.EngineType,
                FuelType: row.FuelType,
                MaxPower: row.MaxPower,
                MaxTorque: row.MaxTorque,
                Performance: row.Performance,
                ElectricMotor: row.ElectricMotor,
                MaxMotor: row.MaxMotor,
                DrivingRange: row.DrivingRange,
                Drivetrain: row.Drivetrain,
                Transmission: row.Transmission,
                EmissionStandard: row.EmissionStandard,
                Turbocharger: row.Turbocharger,
                Battery: row.Battery,
                BatteryCharging: row.BatteryCharging,
                ElectricMotor: row.ElectricMotor,
                Others: row.Others,
                AlternateFuel: row.AlternateFuel,
                Length: row.Length,
                Width: row.Width,
                Height: row.Height,
                Wheelbase: row.Wheelbase,
                GroundClearance: row.GroundClearance,
                KerbWeight: row.KerbWeight,
                Doors: row.Doors,
                SeatingCapacity: row.SeatingCapacity,
                NoofRows: row.NoofRows,
                Bootspace: row.Bootspace,
                FuelTankCapacity: row.FuelTankCapacity,
                FourWheelSteering: row.FourWheelSteering,
                FrontSuspension: row.FrontSuspension,
                RearSuspension: row.RearSuspension,
                FrontBrake: row.FrontBrake,
                RearBrakeType: row.RearBrakeType,
                MinimumTurningRadius: row.MinimumTurningRadius,
                SteeringTypeWheels: row.SteeringTypeWheels,
                SpareWheel: row.SpareWheel,
                FrontTyres: row.FrontTyres,
                RearTyres: row.RearTyres,
                Overspeed: row.Overspeed,
                PunctureRepairKit: row.PunctureRepairKit,
                NCAPRating: row.NCAPRating,
                Airbags: row.Airbags,
                RearMiddleThreePointseatbelt: row.RearMiddleThreePointseatbelt,
                TyrePressureMonitoringSystem: row.TyrePressureMonitoringSystem,
                Seat: row.Seat,
                AntiLock: row.AntiLock,
                Electronic: row.Electronic,
                BrakeAssist: row.BrakeAssist,
                ElectronicStabilityProgram: row.ElectronicStabilityProgram,
                HillHoldControl: row.HillHoldControl,
                EngineImmobiliser: row.EngineImmobiliser,
                CentralLocking: row.CentralLocking,
                SpeedSensingDoor: row.SpeedSensingDoor,
                Lock: row.Lock,
                SafetyLock: row.SafetyLock,
                AirConditioner: row.AirConditioner,
                FrontAC: row.FrontAC,
                Heater: row.Heater,
                Vanity: row.Vanity,
                Mirrors: row.Mirrors,
                Cabin: row.Cabin,
                AntiglareMirrors: row.AntiglareMirrors,
                ParkingAssist: row.ParkingAssist,
                ParkingSensors: row.ParkingSensors,
                Headlight: row.Headlight,
                Keyless: row.Keyless,
                Start: row.Start,
                SteeringAdjustment: row.SteeringAdjustment,
                PowerOutlets: row.PowerOutlets,
                FindMyCar: row.FindMyCar,
                CheckVehicleStatus: row.CheckVehicleStatus,
                Geofence: row.Geofence,
                RemoteAC: row.RemoteAC,
                CarLock: row.CarLock,
                CarLightFlashing: row.CarLightFlashing,
                Drive: row.Drive,
                FrontPassenger: row.FrontPassenger,
                SeatUpholstery: row.SeatUpholstery,
                LeatherwrappedSteeringWheel: row.LeatherwrappedSteeringWheel,
                RearPassengerSeat: row.RearPassengerSeat,
                Interiors: row.Interiors,
                InteriorColours: row.InteriorColours,
                RearArmrestFolding: row.RearArmrestFolding,
                RearSeat: row.RearSeat,
                SplitRear: row.SplitRear,
                FrontSeatbackPockets: row.FrontSeatbackPockets,
                Headrests: row.Headrests,
                CupHolders: row.CupHolders,
                CooledGlovebox: row.CooledGlovebox,
                ORVMColour: row.ORVMColour,
                ScuffPlates: row.ScuffPlates,
                PowerWindows: row.PowerWindows,
                OneTouchDown: row.OneTouchDown,
                OneTouchUp: row.OneTouchUp,
                AdjustableORVMs: row.AdjustableORVMs,
                TurnIndicators: row.TurnIndicators,
                RearDefogger: row.RearDefogger,
                RearWiper: row.RearWiper,
                ExteriorDoor: row.ExteriorDoor,
                RainsensingWipers: row.RainsensingWipers,
                InteriorDoorHandles: row.InteriorDoorHandles,
                DoorPockets: row.DoorPockets,
                BootlidOpener: row.BootlidOpener,
                RoofmountedAntenna: row.RoofmountedAntenna,
                BodycolouredBumpers: row.BodycolouredBumpers,
                BodyKitRub: row.BodyKitRub,
                Headlights: row.Headlights,
                AutomaticHeadlamps: row.AutomaticHeadlamps,
                FollowMeHomeHeadlamps: row.FollowMeHomeHeadlamps,
                Taillights: row.Taillights,
                DaytimeRunningLights: row.DaytimeRunningLights,
                FogLights: row.FogLights,
                PuddleLamps: row.PuddleLamps,
                CabinLamps: row.CabinLamps,
                HeadlightHeightAdjuster: row.HeadlightHeightAdjuster,
                InstantaneousConsumption: row.InstantaneousConsumption,
                InstrumentCluster: row.InstrumentCluster,
                TripMeter: row.TripMeter,
                AverageFuelConsumption: row.AverageFuelConsumption,
                AverageSpeed: row.AverageSpeed,
                DistancetoEmptyClock: row.DistancetoEmptyClock,
                LowFuelLevelWarning: row.LowFuelLevelWarning,
                DoorAjarWarning: row.DoorAjarWarning,
                AdjustableClusterBrightness: row.AdjustableClusterBrightness,
                GearIndicator: row.GearIndicator,
                ShiftIndicator: row.ShiftIndicator,
                Tachometer: row.Tachometer,
                SmartConnectivity: row.SmartConnectivity,
                Display: row.Display,
                Touchscreen: row.Touchscreen,
                SizeIntegratedMusicSystem: row.SizeIntegratedMusicSystem,
                Speakers: row.Speakers,
                Steeringmounted: row.Steeringmounted,
                controls: row.controls,
                VoiceCommand: row.VoiceCommand,
                GPSNavigationSystem: row.GPSNavigationSystem,
                BluetoothCompatibility: row.BluetoothCompatibility,
                AUXCompatibility: row.AUXCompatibility,
                AMRadio: row.AMRadio,
                USBCompatibility: row.USBCompatibility,
                HeadUnitSize: row.HeadUnitSize,
                iPodCompatibility: row.iPodCompatibility,
                BatteryWarranty: row.BatteryWarranty,
                Warranty: row.Warranty,
                MCD: row.MCD,
                ExtendedWarranty: row.ExtendedWarranty,
                EmergencyBrake: row.EmergencyBrake,
                LightFlashing: row.LightFlashing
            };
            let findDataCar = await usedCar.findOne(carData);
            if (!findDataCar) {
                data.push(carData);
            }

        }

        await usedCar.insertMany(data);

        res.json({ message: "Data inserted successfully", data });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal server error" });
    }
};

exports.newCar = async (req, res) => {
    try {
        const excelFile = req.files.excelFile;

        if (!excelFile) {
            return res.status(400).json({ error: "Excel file not provided" });
        }

        const fileBuffer = excelFile.data;
        const workbook = xlsx.read(fileBuffer, { type: "buffer" });
        const sheetName = workbook.SheetNames[0];
        const sheetData = xlsx.utils.sheet_to_json(workbook.Sheets[sheetName]);

        const batchSize = 100; // Number of documents to insert per batch
        const totalCars = sheetData.length;
        let insertedCount = 0;

        for (let i = 0; i < totalCars; i += batchSize) {
            const batchData = sheetData.slice(i, i + batchSize);
            const data = [];

            for (const row of batchData) {
                let carImageURLs;
                if (row.car_images != (null || undefined)) {
                    carImageURLs = row.car_images.split("|");
                } else {
                    carImageURLs = null;
                }
                const carImages = [];
                if (carImageURLs != (null || undefined)) {
                    if (carImageURLs.length > 0) {
                        for (const url of carImageURLs) {
                            carImages.push({ url });
                        }
                    }
                }
                let colorOptionsArray;
                if (row.color_options != (null || undefined)) {
                    colorOptionsArray = row.color_options.split("|").map(option => option.trim());
                } else {
                    colorOptionsArray = null;
                }
                let colorOptionsWithImagesArray;
                if (row.color_options_with_images) {
                    colorOptionsWithImagesArray = row.color_options_with_images.split("|").map(option => {
                        const parts = option.split(":");
                        const name = parts[0].trim();
                        const url = parts.slice(1).join(":").trim();
                        return { name, url };
                    });
                }
                let cityPricesArray;
                if (row.nearByCities_price) {
                    cityPricesArray = row.nearByCities_price.split("|").map(cityPrice => {
                        const [city, price] = cityPrice.split(":").map(item => item.trim());
                        return { city, price };
                    });
                }
                let popularCityPricesArray;
                if (row.popularCities_price) {
                    popularCityPricesArray = row.popularCities_price.split("|").map(cityPrice => {
                        const [city, price] = cityPrice.split(":").map(item => item.trim());
                        return { city, price };
                    });
                }
                const carData = {
                    Brand_name: row.Brand_name,
                    Brand_link: row.Brand_link,
                    Car_first_link: row.Car_first_link,
                    Car_link: row.Car_link,
                    State: row.State,
                    Location: row.Location,
                    cityId: row.cityId,
                    Display_name: row.Display_name,
                    ModelId: row.ModelId,
                    Make: row.Make,
                    ModelName: row.ModelName,
                    Launched_date: row.Launched_date,
                    varient_link: row.varient_link,
                    price_breakup_url: row.price_breakup_url,
                    Varient_name: row.Varient_name,
                    Varient_id: row.Varient_id,
                    EMI: row.EMI,
                    ExShowroomPrice: row.ExShowroomPrice,
                    SKU: row.SKU,
                    MPN: row.MPN,
                    bodyType: row.bodyType,
                    fuelType: row.fuelType,
                    fuelConsumption: row.fuelConsumption,
                    summery_description: row.summery_description,
                    color_options: colorOptionsArray,
                    color_options_with_images: colorOptionsWithImagesArray,
                    vehicleTransmission: row.vehicleTransmission,
                    driveWheelConfiguration: row.driveWheelConfiguration,
                    rating: row.rating,
                    reviewCount: row.reviewCount,
                    totalRatings: row.totalRatings,
                    Total_image_count: row.Total_image_count,
                    car_images: carImages,
                    review_text: [{
                        username: row.username,
                        review: row.review_text,
                    }],
                    brochure_link: row.brochure_link,
                    Upcoming_Cars: row.Upcoming_Cars,
                    video_link: row.video_link,
                    sponsored_cars: row.sponsored_cars,
                    nearByCities_price: cityPricesArray,
                    nearByArea_price: row.nearByArea_price,
                    popularCities_price: popularCityPricesArray,
                    minPrice: row.minPrice,
                    maxPrice: row.maxPrice,
                    RTOCorporate: row.RTOCorporate,
                    RTO: row.RTO,
                    AMC: row.AMC,
                    Insurance: row.Insurance,
                    HypothecationCharges: row.HypothecationCharges,
                    FASTag: row.FASTag,
                    ExtendedWarranty: row.ExtendedWarranty,
                    AccessoriesPackage: row.AccessoriesPackage,
                    LoyaltyCard: row.LoyaltyCard,
                    TopSpeed: row.TopSpeed,
                    Acceleration: row.Acceleration,
                    City: row.City,
                    Mileage: row.Mileage,
                    Highway: row.Highway,
                    Range: row.Range,
                    Engine: row.Engine,
                    EngineType: row.EngineType,
                    FuelType: row.FuelType,
                    MaxPower: row.MaxPower,
                    MaxTorque: row.MaxTorque,
                    Performance: row.Performance,
                    ElectricMotor: row.ElectricMotor,
                    MaxMotor: row.MaxMotor,
                    DrivingRange: row.DrivingRange,
                    Drivetrain: row.Drivetrain,
                    Transmission: row.Transmission,
                    EmissionStandard: row.EmissionStandard,
                    Turbocharger: row.Turbocharger,
                    Battery: row.Battery,
                    BatteryCharging: row.BatteryCharging,
                    ElectricMotor: row.ElectricMotor,
                    Others: row.Others,
                    AlternateFuel: row.AlternateFuel,
                    Length: row.Length,
                    Width: row.Width,
                    Height: row.Height,
                    Wheelbase: row.Wheelbase,
                    GroundClearance: row.GroundClearance,
                    KerbWeight: row.KerbWeight,
                    Doors: row.Doors,
                    SeatingCapacity: row.SeatingCapacity,
                    NoofRows: row.NoofRows,
                    Bootspace: row.Bootspace,
                    FuelTankCapacity: row.FuelTankCapacity,
                    FourWheelSteering: row.FourWheelSteering,
                    FrontSuspension: row.FrontSuspension,
                    RearSuspension: row.RearSuspension,
                    FrontBrake: row.FrontBrake,
                    RearBrakeType: row.RearBrakeType,
                    MinimumTurningRadius: row.MinimumTurningRadius,
                    SteeringTypeWheels: row.SteeringTypeWheels,
                    SpareWheel: row.SpareWheel,
                    FrontTyres: row.FrontTyres,
                    RearTyres: row.RearTyres,
                    Overspeed: row.Overspeed,
                    PunctureRepairKit: row.PunctureRepairKit,
                    NCAPRating: row.NCAPRating,
                    Airbags: row.Airbags,
                    RearMiddleThreePointseatbelt: row.RearMiddleThreePointseatbelt,
                    TyrePressureMonitoringSystem: row.TyrePressureMonitoringSystem,
                    Seat: row.Seat,
                    AntiLock: row.AntiLock,
                    Electronic: row.Electronic,
                    BrakeAssist: row.BrakeAssist,
                    ElectronicStabilityProgram: row.ElectronicStabilityProgram,
                    HillHoldControl: row.HillHoldControl,
                    EngineImmobiliser: row.EngineImmobiliser,
                    CentralLocking: row.CentralLocking,
                    SpeedSensingDoor: row.SpeedSensingDoor,
                    Lock: row.Lock,
                    SafetyLock: row.SafetyLock,
                    AirConditioner: row.AirConditioner,
                    FrontAC: row.FrontAC,
                    Heater: row.Heater,
                    Vanity: row.Vanity,
                    Mirrors: row.Mirrors,
                    Cabin: row.Cabin,
                    AntiglareMirrors: row.AntiglareMirrors,
                    ParkingAssist: row.ParkingAssist,
                    ParkingSensors: row.ParkingSensors,
                    Headlight: row.Headlight,
                    Keyless: row.Keyless,
                    Start: row.Start,
                    SteeringAdjustment: row.SteeringAdjustment,
                    PowerOutlets: row.PowerOutlets,
                    FindMyCar: row.FindMyCar,
                    CheckVehicleStatus: row.CheckVehicleStatus,
                    Geofence: row.Geofence,
                    RemoteAC: row.RemoteAC,
                    CarLock: row.CarLock,
                    CarLightFlashing: row.CarLightFlashing,
                    Drive: row.Drive,
                    FrontPassenger: row.FrontPassenger,
                    SeatUpholstery: row.SeatUpholstery,
                    LeatherwrappedSteeringWheel: row.LeatherwrappedSteeringWheel,
                    RearPassengerSeat: row.RearPassengerSeat,
                    Interiors: row.Interiors,
                    InteriorColours: row.InteriorColours,
                    RearArmrestFolding: row.RearArmrestFolding,
                    RearSeat: row.RearSeat,
                    SplitRear: row.SplitRear,
                    FrontSeatbackPockets: row.FrontSeatbackPockets,
                    Headrests: row.Headrests,
                    CupHolders: row.CupHolders,
                    CooledGlovebox: row.CooledGlovebox,
                    ORVMColour: row.ORVMColour,
                    ScuffPlates: row.ScuffPlates,
                    PowerWindows: row.PowerWindows,
                    OneTouchDown: row.OneTouchDown,
                    OneTouchUp: row.OneTouchUp,
                    AdjustableORVMs: row.AdjustableORVMs,
                    TurnIndicators: row.TurnIndicators,
                    RearDefogger: row.RearDefogger,
                    RearWiper: row.RearWiper,
                    ExteriorDoor: row.ExteriorDoor,
                    RainsensingWipers: row.RainsensingWipers,
                    InteriorDoorHandles: row.InteriorDoorHandles,
                    DoorPockets: row.DoorPockets,
                    BootlidOpener: row.BootlidOpener,
                    RoofmountedAntenna: row.RoofmountedAntenna,
                    BodycolouredBumpers: row.BodycolouredBumpers,
                    BodyKitRub: row.BodyKitRub,
                    Headlights: row.Headlights,
                    AutomaticHeadlamps: row.AutomaticHeadlamps,
                    FollowMeHomeHeadlamps: row.FollowMeHomeHeadlamps,
                    Taillights: row.Taillights,
                    DaytimeRunningLights: row.DaytimeRunningLights,
                    FogLights: row.FogLights,
                    PuddleLamps: row.PuddleLamps,
                    CabinLamps: row.CabinLamps,
                    HeadlightHeightAdjuster: row.HeadlightHeightAdjuster,
                    InstantaneousConsumption: row.InstantaneousConsumption,
                    InstrumentCluster: row.InstrumentCluster,
                    TripMeter: row.TripMeter,
                    AverageFuelConsumption: row.AverageFuelConsumption,
                    AverageSpeed: row.AverageSpeed,
                    DistancetoEmptyClock: row.DistancetoEmptyClock,
                    LowFuelLevelWarning: row.LowFuelLevelWarning,
                    DoorAjarWarning: row.DoorAjarWarning,
                    AdjustableClusterBrightness: row.AdjustableClusterBrightness,
                    GearIndicator: row.GearIndicator,
                    ShiftIndicator: row.ShiftIndicator,
                    Tachometer: row.Tachometer,
                    SmartConnectivity: row.SmartConnectivity,
                    Display: row.Display,
                    Touchscreen: row.Touchscreen,
                    SizeIntegratedMusicSystem: row.SizeIntegratedMusicSystem,
                    Speakers: row.Speakers,
                    Steeringmounted: row.Steeringmounted,
                    controls: row.controls,
                    VoiceCommand: row.VoiceCommand,
                    GPSNavigationSystem: row.GPSNavigationSystem,
                    BluetoothCompatibility: row.BluetoothCompatibility,
                    AUXCompatibility: row.AUXCompatibility,
                    AMRadio: row.AMRadio,
                    USBCompatibility: row.USBCompatibility,
                    HeadUnitSize: row.HeadUnitSize,
                    iPodCompatibility: row.iPodCompatibility,
                    BatteryWarranty: row.BatteryWarranty,
                    Warranty: row.Warranty,
                    MCD: row.MCD,
                    ExtendedWarranty: row.ExtendedWarranty,
                    EmergencyBrake: row.EmergencyBrake,
                    LightFlashing: row.LightFlashing
                };
                let findDataCar = await usedCar.findOne(carData);
                if (!findDataCar) {
                    data.push(carData);
                }
            }

            await usedCar.insertMany(data);
            insertedCount += data.length;

            console.log(`Batch ${Math.ceil(i / batchSize) + 1} inserted. Total inserted: ${insertedCount}/${totalCars}`);
        }

        return res.json({ message: "Data inserted successfully", data: usedCar });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal server error" });
    }
};


exports.updateCarById = async (req, res) => {
    try {
        const { carId } = req.params;
        const excelFile = req.files.excelFile;

        if (!excelFile) {
            return res.status(400).json({ error: "Excel file not provided" });
        }

        const fileBuffer = excelFile.data;
        const workbook = xlsx.read(fileBuffer, { type: "buffer" });
        const sheetName = workbook.SheetNames[0];
        const sheetData = xlsx.utils.sheet_to_json(workbook.Sheets[sheetName]);

        const carToUpdate = await usedCar.findById(carId);

        if (!carToUpdate) {
            return res.status(404).json({ error: "Car not found" });
        }

        let carData;
        for (const row of sheetData) {
            carData = {
                Brand_name: row.Brand_name,
                Car_link: row.Car_link,
                State: row.State,
                Location: row.Location,
                cityId: row.cityId,
                Display_name: row.Display_name,
                ModelId: row.ModelId,
                Make: row.Make,
                ModelName: row.ModelName,
                Launched_date: row.Launched_date,
                varient_link: row.varient_link,
                price_breakup_url: row.price_breakup_url,
                Varient_name: row.Varient_name,
                Varient_id: row.Varient_id,
                EMI: row.EMI,
                ExShowroomPrice: row.ExShowroomPrice,
                SKU: row.SKU,
                MPN: row.MPN,
                bodyType: row.bodyType,
                fuelType: row.fuelType,
                fuelConsumption: row.fuelConsumption,
                summery_description: row.summery_description,
                color_options: row.color_options,
                color_options_with_images: row.color_options_with_images,
                vehicleTransmission: row.vehicleTransmission,
                driveWheelConfiguration: row.driveWheelConfiguration,
                rating: row.rating,
                reviewCount: row.reviewCount,
                totalRatings: row.totalRatings,
                Total_image_count: row.Total_image_count,
                car_images: [{
                    url: row.car_images,
                }],
                review_text: [{
                    username: row.username,
                    review: row.review_text,
                }],
                brochure_link: row.brochure_link,
                Upcoming_Cars: row.Upcoming_Cars,
                video_link: row.video_link,
                sponsored_cars: row.sponsored_cars,
                nearByCities_price: row.nearByCities_price,
                nearByArea_price: row.nearByArea_price,
                popularCities_price: row.popularCities_price,
                minPrice: row.minPrice,
                maxPrice: row.maxPrice,
                RTOCorporate: row.RTOCorporate,
                RTO: row.RTO,
                AMC: row.AMC,
                Insurance: row.Insurance,
                HypothecationCharges: row.HypothecationCharges,
                FASTag: row.FASTag,
                ExtendedWarranty: row.ExtendedWarranty,
                AccessoriesPackage: row.AccessoriesPackage,
                LoyaltyCard: row.LoyaltyCard,
                TopSpeed: row.TopSpeed,
                Acceleration: row.Acceleration,
                City: row.City,
                Mileage: row.Mileage,
                Highway: row.Highway,
                Range: row.Range,
                Engine: row.Engine,
                EngineType: row.EngineType,
                FuelType: row.FuelType,
                MaxPower: row.MaxPower,
                MaxTorque: row.MaxTorque,
                Performance: row.Performance,
                ElectricMotor: row.ElectricMotor,
                MaxMotor: row.MaxMotor,
                DrivingRange: row.DrivingRange,
                Drivetrain: row.Drivetrain,
                Transmission: row.Transmission,
                EmissionStandard: row.EmissionStandard,
                Turbocharger: row.Turbocharger,
                Battery: row.Battery,
                BatteryCharging: row.BatteryCharging,
                ElectricMotor: row.ElectricMotor,
                Others: row.Others,
                AlternateFuel: row.AlternateFuel,
                Length: row.Length,
                Width: row.Width,
                Height: row.Height,
                Wheelbase: row.Wheelbase,
                GroundClearance: row.GroundClearance,
                KerbWeight: row.KerbWeight,
                Doors: row.Doors,
                SeatingCapacity: row.SeatingCapacity,
                NoofRows: row.NoofRows,
                Bootspace: row.Bootspace,
                FuelTankCapacity: row.FuelTankCapacity,
                FourWheelSteering: row.FourWheelSteering,
                FrontSuspension: row.FrontSuspension,
                RearSuspension: row.RearSuspension,
                FrontBrake: row.FrontBrake,
                RearBrakeType: row.RearBrakeType,
                MinimumTurningRadius: row.MinimumTurningRadius,
                SteeringTypeWheels: row.SteeringTypeWheels,
                SpareWheel: row.SpareWheel,
                FrontTyres: row.FrontTyres,
                RearTyres: row.RearTyres,
                Overspeed: row.Overspeed,
                PunctureRepairKit: row.PunctureRepairKit,
                NCAPRating: row.NCAPRating,
                Airbags: row.Airbags,
                RearMiddleThreePointseatbelt: row.RearMiddleThreePointseatbelt,
                TyrePressureMonitoringSystem: row.TyrePressureMonitoringSystem,
                Seat: row.Seat,
                AntiLock: row.AntiLock,
                Electronic: row.Electronic,
                BrakeAssist: row.BrakeAssist,
                ElectronicStabilityProgram: row.ElectronicStabilityProgram,
                HillHoldControl: row.HillHoldControl,
                EngineImmobiliser: row.EngineImmobiliser,
                CentralLocking: row.CentralLocking,
                SpeedSensingDoor: row.SpeedSensingDoor,
                Lock: row.Lock,
                SafetyLock: row.SafetyLock,
                AirConditioner: row.AirConditioner,
                FrontAC: row.FrontAC,
                Heater: row.Heater,
                Vanity: row.Vanity,
                Mirrors: row.Mirrors,
                Cabin: row.Cabin,
                AntiglareMirrors: row.AntiglareMirrors,
                ParkingAssist: row.ParkingAssist,
                ParkingSensors: row.ParkingSensors,
                Headlight: row.Headlight,
                Keyless: row.Keyless,
                Start: row.Start,
                SteeringAdjustment: row.SteeringAdjustment,
                PowerOutlets: row.PowerOutlets,
                FindMyCar: row.FindMyCar,
                CheckVehicleStatus: row.CheckVehicleStatus,
                Geofence: row.Geofence,
                RemoteAC: row.RemoteAC,
                CarLock: row.CarLock,
                CarLightFlashing: row.CarLightFlashing,
                Drive: row.Drive,
                FrontPassenger: row.FrontPassenger,
                SeatUpholstery: row.SeatUpholstery,
                LeatherwrappedSteeringWheel: row.LeatherwrappedSteeringWheel,
                RearPassengerSeat: row.RearPassengerSeat,
                Interiors: row.Interiors,
                InteriorColours: row.InteriorColours,
                RearArmrestFolding: row.RearArmrestFolding,
                RearSeat: row.RearSeat,
                SplitRear: row.SplitRear,
                FrontSeatbackPockets: row.FrontSeatbackPockets,
                Headrests: row.Headrests,
                CupHolders: row.CupHolders,
                CooledGlovebox: row.CooledGlovebox,
                ORVMColour: row.ORVMColour,
                ScuffPlates: row.ScuffPlates,
                PowerWindows: row.PowerWindows,
                OneTouchDown: row.OneTouchDown,
                OneTouchUp: row.OneTouchUp,
                AdjustableORVMs: row.AdjustableORVMs,
                TurnIndicators: row.TurnIndicators,
                RearDefogger: row.RearDefogger,
                RearWiper: row.RearWiper,
                ExteriorDoor: row.ExteriorDoor,
                RainsensingWipers: row.RainsensingWipers,
                InteriorDoorHandles: row.InteriorDoorHandles,
                DoorPockets: row.DoorPockets,
                BootlidOpener: row.BootlidOpener,
                RoofmountedAntenna: row.RoofmountedAntenna,
                BodycolouredBumpers: row.BodycolouredBumpers,
                BodyKitRub: row.BodyKitRub,
                Headlights: row.Headlights,
                AutomaticHeadlamps: row.AutomaticHeadlamps,
                FollowMeHomeHeadlamps: row.FollowMeHomeHeadlamps,
                Taillights: row.Taillights,
                DaytimeRunningLights: row.DaytimeRunningLights,
                FogLights: row.FogLights,
                PuddleLamps: row.PuddleLamps,
                CabinLamps: row.CabinLamps,
                HeadlightHeightAdjuster: row.HeadlightHeightAdjuster,
                InstantaneousConsumption: row.InstantaneousConsumption,
                InstrumentCluster: row.InstrumentCluster,
                TripMeter: row.TripMeter,
                AverageFuelConsumption: row.AverageFuelConsumption,
                AverageSpeed: row.AverageSpeed,
                DistancetoEmptyClock: row.DistancetoEmptyClock,
                LowFuelLevelWarning: row.LowFuelLevelWarning,
                DoorAjarWarning: row.DoorAjarWarning,
                AdjustableClusterBrightness: row.AdjustableClusterBrightness,
                GearIndicator: row.GearIndicator,
                ShiftIndicator: row.ShiftIndicator,
                Tachometer: row.Tachometer,
                SmartConnectivity: row.SmartConnectivity,
                Display: row.Display,
                Touchscreen: row.Touchscreen,
                SizeIntegratedMusicSystem: row.SizeIntegratedMusicSystem,
                Speakers: row.Speakers,
                Steeringmounted: row.Steeringmounted,
                controls: row.controls,
                VoiceCommand: row.VoiceCommand,
                GPSNavigationSystem: row.GPSNavigationSystem,
                BluetoothCompatibility: row.BluetoothCompatibility,
                AUXCompatibility: row.AUXCompatibility,
                AMRadio: row.AMRadio,
                USBCompatibility: row.USBCompatibility,
                HeadUnitSize: row.HeadUnitSize,
                iPodCompatibility: row.iPodCompatibility,
                BatteryWarranty: row.BatteryWarranty,
                Warranty: row.Warranty,
                MCD: row.MCD,
                ExtendedWarranty: row.ExtendedWarranty,
                EmergencyBrake: row.EmergencyBrake,
                LightFlashing: row.LightFlashing
            };
        }
        console.log("carData", carData);
        const data = await usedCar.findByIdAndUpdate({ _id: carToUpdate._id }, { $set: carData }, { new: true });
        console.log("carToUpdate", data);

        res.json({ message: "Car updated successfully", updatedCar: data });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal server error" });
    }
};

exports.emiCalculator = async (req, res) => {
    try {
        const { loanAmount, interestRate, tenure } = req.params;

        if (!loanAmount || !interestRate || !tenure) {
            return res.status(400).json({
                error: "Please provide loanAmount, interestRate, and tenure.",
            });
        }

        const loanAmountNum = parseFloat(loanAmount);
        const interestRateNum = parseFloat(interestRate);
        const tenureNum = parseInt(tenure);

        if (isNaN(loanAmountNum) || isNaN(interestRateNum) || isNaN(tenureNum)) {
            return res.status(400).json({ status: 400, message: "Invalid input. Please provide valid numeric values." });
        }

        const monthlyInterestRate = interestRateNum / (12 * 100);

        const emi =
            (loanAmountNum *
                monthlyInterestRate *
                Math.pow(1 + monthlyInterestRate, tenureNum)) /
            (Math.pow(1 + monthlyInterestRate, tenureNum) - 1);

        const totalAmount = emi * tenureNum;
        const principalAmount = loanAmountNum;
        const interestAmount = totalAmount - principalAmount;

        return res.status(200).json({
            status: 200,
            emi,
            totalAmount,
            principalAmount,
            interestAmount,
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ status: 500, error: "Internal Server Error" });
    }
};

exports.showMostSearchedCars = async (req, res) => {
    try {
        const userId = req.user._id;

        const mostSearchedCars = await SearchLog.aggregate([
            { $match: { userId: userId } },
            { $group: { _id: "$carId", count: { $sum: 1 } } },
            { $sort: { count: -1 } },
            { $limit: 10 }
        ]);

        if (mostSearchedCars.length === 0) {
            return res.status(404).json({ status: 404, message: "No searched cars found for the user" });
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


exports.createReview = async (req, res) => {
    try {
        const userId = req.user._id;

        const { carId, rating, comment } = req.body;

        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        if (rating < 1 || rating > 5) {
            return res.status(400).json({ status: 400, message: 'Rating must be between 1 and 5' });
        }

        const review = new Review({
            userId: userId,
            usedCarId: carId,
            rating: rating,
            comment: comment
        });

        const newReview = await review.save();

        res.status(201).json({
            status: 201,
            message: 'Review created successfully',
            data: newReview
        });
    } catch (error) {
        console.error('Error creating review:', error);
        res.status(500).json({
            status: 500,
            message: 'Internal server error',
            error: error.message
        });
    }
};

exports.getUserReviews = async (req, res) => {
    try {
        const userId = req.user._id;

        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
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

        const reviews = await Review.find({ usedCarId: carId, userId: userId });

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

exports.uploadCarImage = async (req, res) => {
    try {
        const { carId } = req.params;

        const car = await usedCar.findById(carId);
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

        car.car_images = car.car_images.concat(newImages);

        const updatedCar = await car.save();

        return res.json({ message: 'Car images added successfully', data: updatedCar });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Failed to add car images', error: error.message });
    }
};