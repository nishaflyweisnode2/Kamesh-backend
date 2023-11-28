const Brand = require("../Models/brandModel");
const Car = require("../Models/carModel");
const Company = require("../Models/companyModel");
const CompareHistory= require("../Models/compareHistory");

const excel = require("exceljs");
const bodyType = require("../Models/bodyTypeModel");
const Transmission = require("../Models/transmissionModel");
const fuel = require("../Models/fuelModel");
const fs = require('fs');
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
  cloud_name: 'dtijhcmaa', 
  api_key: '624644714628939', 
  api_secret: 'tU52wM1-XoaFD2NrHbPrkiVKZvY' 
});
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "images/image",
    allowed_formats: ["jpg", "jpeg", "png", "PNG", "xlsx", "xls", "pdf", "PDF"],
  },
});
const upload = multer({ storage: storage });

const xlsx = require("xlsx");
const { log } = require("console");
exports.createCar= async (req, res) => {
  console.log("hi");
try {
  upload.array("image")(req, res, async (err) => {
    if (err) {
      return res.status(400).json({ msg: err.message });
    }
    let images = [];
  //   console.log(req.files);
    for (let i = 0; i < req.files.length; i++) {
      images.push(req.files[i] ? req.files[i].path : "");
    }
    // Create a new car document using the Car model
    const data = {...req.body,images:images};

    const cars = await Car.create(data);
    return res.status(200).json({ message: "car add successfully.", status: 200, data: cars });
   })
 }


catch (error) {
 console.log(req.body);
 res.status(500).json({ status: 500, message: "internal server error ", data: error.message, });
}
};
exports.getCar= async (req, res) => {

try {
    // Retrieve all cars from the database
    const cars = await Car.find();

    // res.status(200).json(cars);
  res.status(200).json({ message: "all car", status: 200, data: cars });

  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

exports.getCarbyId= async (req, res) => {
    try {
        const carId = req.params.id;
    
        // Retrieve the car by ID from the database
        const car = await Car.findById(carId);
    
        if (!car) {
          // If the car is not found, return a 404 error
          return res.status(404).json({ error: 'Car not found' });
        }
    
        res.status(200).json(car);
      } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
      }
    };

exports.updateCarbyId= async (req, res) => {
    try {
        const carId = req.params.id;
        const updatedCarData = req.body;
    
        // Find the car by its ID and update it
        const updatedCar = await Car.findByIdAndUpdate(carId, updatedCarData, {
          new: true, // Return the updated car object
        });
    
        if (!updatedCar) {
          // If the car is not found, return a 404 error
          return res.status(404).json({ error: 'Car not found' });
        }
    
        res.status(200).json(updatedCar);
      } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
      }
    };

    exports.deleteCarbyId= async (req, res) => {
    try {
        const carId = req.params.id;
    
        // Find the car by its ID and delete it
        const deletedCar = await Car.findByIdAndRemove(carId);
    
        if (!deletedCar) {
          // If the car is not found, return a 404 error
          return res.status(404).json({ error: 'Car not found' });
        }
    
        res.status(200).json({ message: 'Car deleted successfully' });
      } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
      }
    };


    exports.search = async (req, res, next) => {
      const carsCount = await Car.count();
      let apiFeature = await Car.aggregate([
        {
          $lookup: { from: "transmissions", localField: "Transmission", foreignField: "_id", as: "Transmission" },
        },
        { $unwind: "$Transmission" },
        {
          $lookup: { from: "bodytypes", localField: "bodyType", foreignField: "_id", as: "bodyType", },
        },
        { $unwind: "$bodyType" },
        {
          $lookup: { from: "brands", localField: "Brand", foreignField: "_id", as: "Brand", },
        },
        { $unwind: "$Brand" },
      ]);
      if (req.query.search != (null || undefined)) {
        let data1 = [
          {
            $lookup: { from: "transmissions", localField: "Transmission", foreignField: "_id", as: "Transmission" },
          },
          { $unwind: "$Transmission" },
          {
            $lookup: { from: "bodytypes", localField: "bodyType", foreignField: "_id", as: "bodyType", },
          },
          { $unwind: "$bodyType" },
          {
            $lookup: { from: "brands", localField: "Brand", foreignField: "_id", as: "Brand", },
          },
          { $unwind: "$Brand" },
          {
            $lookup: { from: "fuels", localField: "Fuel", foreignField: "_id", as: "Fuel", },
          },
          { $unwind: "$Fuel" },
          {
            $match: {
              $or: [
                { "Transmission.name": { $regex: req.query.search, $options: "i" }, },
                { "bodyType.name": { $regex: req.query.search, $options: "i" }, },
                { "Fuel.name": { $regex: req.query.search, $options: "i" }, },
                { "Brand.name": { $regex: req.query.search, $options: "i" }, },
                { "name": { $regex: req.query.search, $options: "i" }, },
                { "description": { $regex: req.query.search, $options: "i" }, },
                { "colors": { $regex: req.query.search, $options: "i" }, }
              ]
            }
          }
        ]
        apiFeature = await Car.aggregate(data1);
      }
      res.status(200).json({ success: true, carsCount, apiFeature, });
    };

    exports.filter = async (req, res, next) => {
      // console.log("hi");
    try {
      const minPrice = req.query.minPrice || 0; // Default to 0 if not provided
      const maxPrice = req.query.maxPrice || Infinity; // Default to Infinity if not provided
  
      // Find cars within the specified price range
      const filteredCars = await Car.find({
        price: { $gte: minPrice, $lte: maxPrice },
      });
  console.log(filteredCars);
res.status(200).json({ message: "result", status: 200, data: filteredCars });

      // res.json(filteredCars);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  };


  exports.allfilter = async (req, res, next) => {
  try {
    const { minPrice, maxPrice, minMileage, maxMileage, minYear, maxYear,seatCapacity,color,carId ,brandId,sort    } = req.query;

    // Construct the filter object based on the query parameters
    const filter = {};

    // Price range filter
    if (minPrice && maxPrice) {
      filter.price = { $gte: parseFloat(minPrice), $lte: parseFloat(maxPrice) };
    }

    // Mileage range filter
    if (minMileage && maxMileage) {
      filter.Mileage = { $gte: parseFloat(minMileage), $lte: parseFloat(maxMileage) };
    }

    // Year range filter
    if (minYear && maxYear) {
      filter.year = { $gte: parseInt(minYear), $lte: parseInt(maxYear) };
    }
    if (seatCapacity) {
      filter.seatCapacity = parseInt(seatCapacity);
    }
    if (color) {
      filter.colours = color;
    }
     // Car ID filter
     if (carId) {
      filter._id = carId;
    }

    // Brand ID filter
    if (brandId) {
      filter.Brand = brandId; // Assuming 'brand' is the field storing the brand's ID
    }
    // Additional filters for other specifications can be added here
    const sortOptions = {};
    if (sort === 'lowToHigh') {
      sortOptions.price = 1; // Sort by price in ascending order
    } else if (sort === 'highToLow') {
      sortOptions.price = -1; // Sort by price in descending order
    }
    // Find cars that match the filter criteria
    const filteredCars = await Car.find(filter).sort(sortOptions).exec();
// Count the number of cars in the search
const carCount = await Car.countDocuments(filter);
res.status(200).json({ message: "result", status: 200, data: filteredCars , count: carCount});

    // res.status(200).json({ success: true, data: filteredCars, count: carCount});
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: 'Internal Server Error' });
  }
};



exports.getMostComparedCars = async (req, res, next) => {
  try {
    // Find the most compared pair
    const mostComparedPair = await CompareHistory.find().populate('car1 car2');

    if (!mostComparedPair) {
      return res.status(404).json({ message: 'No comparisons found' });
    }

    // Return the most compared pair
  res.status(200).json({ message: "mostComparedPair", status: 200, data: mostComparedPair });
    
    // res.status(200).json({ mostComparedPair });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};
exports.compareCars = async (req, res, next) => {
  console.log("hi1");
  try {
    const { car1Id, car2Id } = req.query;

    // Retrieve details of the first car
    const car1 = await Car.findById(car1Id);
    if (!car1) {
      return res.status(404).json({ message: 'First car not found' });
    }

    // Retrieve details of the second car
    const car2 = await Car.findById(car2Id);
    if (!car2) {
      return res.status(404).json({ message: 'Second car not found' });
    }

    // Log the comparison
    await logComparison(car1._id, car2._id);

    // Return details of both cars
    res.status(200).json({ car1, car2 });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
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
    console.error('Error logging comparison:', error);
  }
}


// exports. compareCars = async (req, res, next) => {
//   try {
//     const { car1Id, car2Id } = req.query;

//     // Retrieve details of the first car
//     const car1 = await Car.findById(car1Id);
//     if (!car1) {
//       return res.status(404).json({ message: 'First car not found' });
//     }

//     // Retrieve details of the second car
//     const car2 = await Car.findById(car2Id);
//     if (!car2) {
//       return res.status(404).json({ message: 'Second car not found' });
//     }

//     // Return details of both cars
//     res.status(200).json({ car1, car2 });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: 'Internal server error' });
//   }
// };


exports. updateStatus = async (req, res, next) => {
  try {
    const carId = req.params.id;
    const { status } = req.body;

    // Find the car by ID
    const car = await Car.findById(carId);

    if (!car) {
      return res.status(404).json({ message: 'Car not found' });
    }

    // Update the car type
    car.status = status;

    // Save the updated car
    await car.save();

    return res.status(200).json({ message: 'Car status updated successfully', car });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

exports.upcomingCars = async (req, res, next) => {
  console.log("hi");
try {
  const status = req.body.status;

  // Find cars with the specified status
  const cars = await Car.find({ status });

  if (!cars || cars.length === 0) {
    return res.status(404).json({ message: 'No cars found with the specified status' });
  }

  return res.status(200).json({ cars });
} catch (error) {
  console.error(error);
  return res.status(500).json({ message: 'Internal server error' });
}
};

// exports.createCarbyExcel = async (req, res, next) => {

//   try {
//     const workbook = xlsx.readFile(req.file.path);
//     const worksheet = workbook.Sheets[workbook.SheetNames[0]];
//     const data = xlsx.utils.sheet_to_json(worksheet);

//     const cars = data.map((row) => {
//       return _.pick(row, ['make', 'model', 'year']); // Define which columns to import
//     });

//     const createdCars = await Car.create(cars);

//     res.status(201).json({ message: 'Cars imported successfully', data: createdCars });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: 'Internal server error' });
//   }
// };


exports.uploadthroughExcel = async (req, res) => {
  try {
      // console.log(req.file);
      const workbook = xlsx.readFile(req.file.path);
      const sheet_name_list = workbook.SheetNames;
      const data = xlsx.utils.sheet_to_json(
          workbook.Sheets[sheet_name_list[0]]
      );
      for (let i = 0; i < data.length; i++) {
          // console.log(i, "-hi---------------", data[i]);

          let findTransmission;

          if (data[i].Transmission != (null || undefined)) {
              findTransmission = await Transmission.findOne({ name: data[i].Transmission, });
              console.log(findTransmission);
              if (!findTransmission) {
                return res.status(400).json({ error: `Transmission data not found for value: ${data[i].Transmission}` });
            }
            let images = [{ img: data[i].image }];
            const cars = new Car({
              make: data[i].make,
              model: data[i].model,
              price: data[i].price,
              images: images,
              Transmission: findTransmission._id,
              
          });
          let a = await cars.save();
  
          }
         
console.log("hi");
      
      }
      fs.unlink(req.file.path, (err) => {
          if (err) throw err;
          console.log("Uploaded file deleted");
      });
      res.status(200).json({ message: "Car Data is Saved " });
  } catch (err) {
      console.log(err);
      res.status(400).json({
          message: err.message,
      });
  }
};


  exports.allDataExcel = async (req, res) => {
    try {
      // Read the uploaded Excel file
      const excelFile = req.files.file; // Assuming you're using a file upload library like `express-fileupload`
  
      if (!excelFile) {
        return res.status(400).json({ error: 'Excel file not provided' });
      }
  
      const workbook = xlsx.read(excelFile.data); // Read the Excel data from the uploaded file
  
      // Extract data from the first (and presumably only) sheet in the Excel file
      const sheetName = workbook.SheetNames[0];
      const sheetData = xlsx.utils.sheet_to_json(workbook.Sheets[sheetName]);
  
      // Iterate through the rows and save them to the Car collection
      for (const row of sheetData) {
        const car = new Car(row);
        await car.save();
      }
  
      res.json({ message: 'Data created from Excel file' });
    } catch (error) {
      console.error('Error creating data from Excel file:', error);
      res.status(500).json({ error: 'An error occurred while processing the Excel file' });
    }
  };
    
  exports.singleExcel = async (req, res) => {

  try {
    // Assuming you have a middleware or library for handling file uploads
    const excelFile = req.files.file;

    if (!excelFile) {
      return res.status(400).json({ error: 'Excel file not provided' });
    }

    const workbook = xlsx.read(excelFile.data);

    const sheetName = workbook.SheetNames[0];
    const sheetData = xlsx.utils.sheet_to_json(workbook.Sheets[sheetName]);

    for (const row of sheetData) {
      // Create a new Car document and save it to the database
      const car = new Car({
        ID: row.ID,
        modelName: row['Model name'],
        allVersions: row['All Versions'],
        carColors: row['Car colors'],
        Company:row['Company'],
      });
      await car.save();
    }

    res.json({ message: 'Data created from Excel file' });
  } catch (error) {
    console.error('Error creating data from Excel file:', error);
    res.status(500).json({ error: 'An error occurred while processing the Excel file' });
  }
};

exports.myExcel = async (req, res) => {
    try {
      const excelFile = req.files.excelFile;
  
      if (!excelFile) {
        return res.status(400).json({ error: 'Excel file not provided' });
      }
  
      const fileBuffer = excelFile.data;
      const workbook = xlsx.read(fileBuffer);
      const sheetName = workbook.SheetNames[0];
      const sheetData = xlsx.utils.sheet_to_json(workbook.Sheets[sheetName]);
      for (const row of sheetData) {
        const carData = {
          ID: row.ID,
          modelName: row['Model name'],
          allVersions: row['All Versions'],
          carColors: row['Car colors'],
          company: row.Company,
          specifications: {
            engineTransmission: {
              engine: row['__EMPTY'], // Adjust these fields based on your Excel data
              acceleration: row['__EMPTY_14'], // Adjust these fields based on your Excel data
              fuelType: row['__EMPTY_1'], // Adjust these fields based on your Excel data
              maxPower: row['__EMPTY_2'],
              maxTorque: row['__EMPTY_3'],
              maxEnginePerformance: row['__EMPTY_4'],
              maxMotorPerformance: row['__EMPTY_5'],
              mileage: row['__EMPTY_6'],
              drivingRange: row['__EMPTY_7'],
              drivetrain: row['__EMPTY_8'],
              transmission: row['__EMPTY_9'],
              emissionStandard: row['__EMPTY_10'],
              battery: row['__EMPTY_11'],
              electricMotor: row['__EMPTY_12'],
              others: row['__EMPTY_13'],
            },
            dimension: {
                length: row['__EMPTY_19'], // Adjust these fields based on your Excel data
                width: row['__EMPTY_17'], // Adjust these fields based on your Excel data
                height: row['__EMPTY_18'], // Adjust these fields based on your Excel data
                base: row['__EMPTY_19'],
                kerbweight: row['__EMPTY_20'],
           
              },
          },
        };
      console.log(carData);
        const car = new Car(carData);
        await car.save();
      }
      
      res.status(201).json({ message: 'Data inserted from Excel file' });
    } catch (error) {
      console.error('Error inserting data from Excel file:', error);
      res.status(500).json({ error: 'An error occurred while inserting data' });
    }
  };

  exports.categoryInsert  = async (req, res) => {
    try {
      const excelFile = req.files.excelFile;
  
      if (!excelFile) {
        return res.status(400).json({ error: 'Excel file not provided' });
      }
  
      const fileBuffer = excelFile.data;
      const workbook = xlsx.read(fileBuffer);
      const sheetName = workbook.SheetNames[0];
      const sheetData = xlsx.utils.sheet_to_json(workbook.Sheets[sheetName]);
      for (const row of sheetData) {
        const carData = {
          ID: row.ID,
          modelName: row['Model name'],
          allVersions: row['All Versions'],
          carColors: row['Car colors'],
          company: row.Company,
          specifications: {
            engineTransmission: {
              engine: row['__EMPTY'], // Adjust these fields based on your Excel data
              acceleration: row['__EMPTY_14'], // Adjust these fields based on your Excel data
              fuelType: row['__EMPTY_1'], // Adjust these fields based on your Excel data
              maxPower: row['__EMPTY_2'],
              maxTorque: row['__EMPTY_3'],
              maxEnginePerformance: row['__EMPTY_4'],
              maxMotorPerformance: row['__EMPTY_5'],
              mileage: row['__EMPTY_6'],
              drivingRange: row['__EMPTY_7'],
              drivetrain: row['__EMPTY_8'],
              transmission: row['__EMPTY_9'],
              emissionStandard: row['__EMPTY_10'],
              battery: row['__EMPTY_11'],
              electricMotor: row['__EMPTY_12'],
              others: row['__EMPTY_13'],
            },
            dimension: {
                length: row['__EMPTY_19'], // Adjust these fields based on your Excel data
                width: row['__EMPTY_17'], // Adjust these fields based on your Excel data
                height: row['__EMPTY_18'], // Adjust these fields based on your Excel data
                base: row['__EMPTY_19'],
                kerbweight: row['__EMPTY_20'],
           
              },
          },
        };
      console.log(carData);
        const car = new Car(carData);
        await car.save();
      }
      
      res.status(201).json({ message: 'Data inserted from Excel file' });
    } catch (error) {
      console.error('Error inserting data from Excel file:', error);
      res.status(500).json({ error: 'An error occurred while inserting data' });
    }
  };
  // exports.newCar = async (req, res) => {
  //   console.log("hi");
  //   try {
  //     const excelFile = req.files.excelFile;
  
  //     if (!excelFile) {
  //       return res.status(400).json({ error: 'Excel file not provided' });
  //     }
  
  //     const fileBuffer = excelFile.data;
  //     const workbook = xlsx.read(fileBuffer, { type: 'buffer' });
  //     const sheetName = workbook.SheetNames[0];
  //     const sheetData = xlsx.utils.sheet_to_json(workbook.Sheets[sheetName]);
  
  //     const data = [];
  
  //     for (const row of sheetData) {
  //       if (row['Company']) {
  //         // Ensure the "Company" field is not empty
  //         const carData = {
  //           company: row['Company'],
  //           model: row['Model name'],
  //           category: row['Specifications'], // Map to "category"
  //           // subcategory: row['Engine and Transmission'], // Map to "subcategory"
  //           specifications: {
  //             // maxEnginePerformance: row['Max Engine Performance'],
  //             maxMotorPerformance: row['Max Motor Performance'],
  //             // mileageARAI: row['Mileage(ARAI)'],
  //           },
  //         };
  //         console.log(carData);
  //         data.push(carData);
  //       }
  //     }
  
  //     console.log(data);
  
  //     // Insert data into the database
  //     await Car.insertMany(data);
  
  //     res.json({ message: 'Data inserted successfully' });
  //   } catch (error) {
  //     console.error(error);
  //     res.status(500).json({ error: 'Internal server error' });
  //   }
  // };
  // exports.newCar = async (req, res) => {
  //   try {
  //     const excelFile = req.files.excelFile;
  
  //     if (!excelFile) {
  //       return res.status(400).json({ error: 'Excel file not provided' });
  //     }
  
  //     const fileBuffer = excelFile.data;
  //     const workbook = xlsx.read(fileBuffer, { type: 'buffer' });
  //     const sheetName = workbook.SheetNames[0];
  //     const sheetData = xlsx.utils.sheet_to_json(workbook.Sheets[sheetName]);
  
  //     const data = [];
  
  //     for (const row of sheetData) {
  //       const carData = {
  //         name: row.name,
  //         company: row.company,
  //         fuelType: row.fuelType,
  //         bodyType: row.bodyType,
  //         price: row.price,
         

  //         specification: {
  //           engine: row['specification:engine'],
  //           engines: {
  //             mileage: row['specification:engines:mileage'],
  //             maxMotor: row['specification:engines:maxMotor'],
  //           },
  //           dimension: {
  //             length: row['specification:dimension:length'],
  //             weight: row['specification:dimension:weight'],
  //             height: row['specification:dimension:height'],
  //           },
  //         },
  //         images: row.images ? row.images.split(',').map(url => url.trim()) : [],
  //       };
  
  //       data.push(carData);
  //     }
  
  //     // Insert data into the database
  //     await Car.insertMany(data);
  
  //     res.json({ message: 'Data inserted successfully' });
  //   } catch (error) {
  //     console.error(error);
  //     res.status(500).json({ error: 'Internal server error' });
  //   }
  // };
  
    exports.bestSelling = async (req, res) => {

    try {
      const carId = req.params.carId;
  
      // Find the car by ID
      const car = await Car.findById(carId);
  
      if (!car) {
        return res.status(404).json({ error: 'Car not found' });
      }
  
      // Update the car to mark it as the best-selling car
      car.isBestSelling = true;
  
      // Save the updated car
      await car.save();
  
      res.json({ message: 'Car marked as the best-selling car' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal server error' });
    }
  };
  exports.getbestSelling = async (req, res) => {
    try {
      // Find the best-selling car (assuming only one car can be marked as the best-selling)
      const bestSellingCar = await Car.find({ isBestSelling: true });
  
      if (!bestSellingCar) {
        return res.status(404).json({ error: 'Best-selling car not found' });
      }
  
      res.json({ bestSellingCar });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal server error' });
    }
  };
  exports.numofReview = async (req, res) => {
  try {
    // Find the car with the highest numOfReviews
    const mostReviewedCar = await Car.find().sort('-numOfReviews');

    if (!mostReviewedCar) {
      return res.status(404).json({ error: 'No cars found' });
    }
    res.status(200).json({ message: "top rated", status: 200, data: mostReviewedCar });
   
    // res.json({ mostReviewedCar });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

exports.upcoming = async (req, res) => {
  try {
    const { type } = req.params;

    // Assuming 'type' is an enum field in your Car model
    const upcomingCars = await Car.find({ type:"upcoming" });

    if (upcomingCars.length === 0) {
      return res.status(404).json({ message: 'No upcoming cars found' });
    }
    res.status(200).json({ message: "upcoming", status: 200, data: upcomingCars });

    // res.json(upcomingCars);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
};
exports.popular = async (req, res) => {
  try {
    const { type } = req.params;

    // Assuming 'type' is an enum field in your Car model
    const upcomingCars = await Car.find({ type:"popular" });

    if (upcomingCars.length === 0) {
      return res.status(404).json({ message: 'No upcoming cars found' });
    }
    res.status(200).json({ message: "popular", status: 200, data: upcomingCars });

    // res.json(upcomingCars);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
};
exports.justLaunched = async (req, res) => {

try {
  const newestCar = await Car.find().sort({ createdAt: -1 });

  if (!newestCar) {
    return res.status(404).json({ message: 'No cars found' });
  }

  // res.json(newestCar);
  res.status(200).json({ message: "just launched", status: 200, data: newestCar });



} catch (error) {
  console.error(error);
  res.status(500).json({ error: 'Internal server error' });
}
};




exports.newCar = async (req, res) => {
  try {
    const excelFile = req.files.excelFile;

    if (!excelFile) {
      return res.status(400).json({ error: 'Excel file not provided' });
    }

    const fileBuffer = excelFile.data;
    const workbook = xlsx.read(fileBuffer, { type: 'buffer' });
    const sheetName = workbook.SheetNames[0];
    const sheetData = xlsx.utils.sheet_to_json(workbook.Sheets[sheetName]);

    const data = [];
    
    for (const row of sheetData) {
      const carData = {
        name: row.name,
        company: row.company,
        fuelType: row.fuelType,
        bodyType: row.bodyType,
        price: row.price,
        specification: {
          engines: {
            mileage: row['specification:engines:mileage'],
            maxMotor: row['specification:engines:maxMotor'],
            fuelType: row['specification:engines:fuelType'],
            maxPower: row['specification:engines:maxPower'],
            maxTorque: row['specification:engines:maxTorque'],
            milege: row['specification:engines:milege'],
            drivingRange: row['specification:engines:drivingRange'],
            drivingTrain: row['specification:engines:drivingTrain'],
            transmission: row['specification:engines:transmission'],
            emission: row['specification:engines:emission'],
            turbocharger: row['specification:engines:turbocharger'],
            electricMotor: row['specification:engines:electricMotor'],
            Others: row['specification:engines:Others'],
          },
          dimension: {
            length: row['specification:dimension:length'],
            weight: row['specification:dimension:weight'],
            height: row['specification:dimension:height'],
            wheelbase: row['specification:dimension:wheelbase'],
            groundClearance: row['specification:dimension:groundClearance'],
          },
          capacity: {
            door: row['specification:capacity:door'],
            seatCapacity: row['specification:capacity:seatCapacity'],
            row: row['specification:capacity:row'],
            bootspace: row['specification:capacity:bootspace'],
            fuelTank: row['specification:capacity:fuelTank'],
          },
          tyres: {
            frontSuspension: row['specification:tyres:frontSuspension'],
            rearSuspension: row['specification:tyres:rearSuspension'],
            frontbrakeType: row['specification:tyres:frontbrakeType'],
            rearBrakeType: row['specification:tyres:rearBrakeType'],
            steeringType: row['specification:tyres:steeringType'],
            wheel: row['specification:tyres:wheel'],
            spareWheel: row['specification:tyres:spareWheel'],
            frontTyre: row['specification:tyres:frontTyre'],
            rearTyre: row['specification:tyres:rearTyre'],
          },
        },
        type: row.type,
        numOfReviews: row.numOfReviews,
        isBestSelling: row.isBestSelling,
        images: row.images ? row.images.split(',').map(url => url.trim()) : [],
        feature: {
          safety: {
            overspeed: row['feature:safety:overspeed'],
            emergencybrakelightflash: row['feature:safety:emergencybrakelightflash'],
            punctureRepair: row['feature:safety:punctureRepair'],
            ncap: row['feature:safety:ncap'],
            blindSpot: row['feature:safety:blindSpot'],
            dashcam: row['feature:safety:dashcam'],
            airbag: row['feature:safety:airbag'],
            rearmiddleseatbelt: row['feature:safety:rearmiddleseatbelt'],
            tyrePressure: row['feature:safety:tyrePressure'],
            childSheet: row['feature:safety:childSheet'],
            seatBelt: row['feature:safety:seatBelt'],
          },
          brakingTraction: {
            antiLockBrackingSystem: row['feature:brakingTraction:antiLockBrackingSystem'],
            electronicBrakeForceDistribution: row['feature:brakingTraction:electronicBrakeForceDistribution'],
            brakeassit: row['feature:brakingTraction:brakeassit'],
            electronicStability: row['feature:brakingTraction:electronicStability'],
            hillHold: row['feature:brakingTraction:hillHold'],
            tractionControl: row['feature:brakingTraction:tractionControl'],
            hillDescent: row['feature:brakingTraction:hillDescent'],
          },
          lockSecurity: {
            engineImmobiliser: row['feature:lockSecurity:engineImmobiliser'],
            centreLock: row['feature:lockSecurity:centreLock'],
            speedSensing: row['feature:lockSecurity:speedSensing'],
            childSafety: row['feature:lockSecurity:childSafety'],
          },
          comfortConvenience: {
            // Placeholder for properties under 'comfortConvenience'
            umbrellaStorage: row['feature:comfortConvenience:umbrellaStorage'],
            electronicParking: row['feature:comfortConvenience:electronicParking'],
            airConditioner: row['feature:comfortConvenience:airConditioner'],
            frontAc: row['feature:comfortConvenience:frontAc'],
            rearAc: row['feature:comfortConvenience:rearAc'],
            thirdRowAc: row['feature:comfortConvenience:thirdRowAc'],
            heater: row['feature:comfortConvenience:heater'],
            vantyMirror: row['feature:comfortConvenience:vantyMirror'],
            cabinBoot: row['feature:comfortConvenience:cabinBoot'],
            antiGlare: row['feature:comfortConvenience:antiGlare'],
            parkingAssit: row['feature:comfortConvenience:parkingAssit'],
            parkingCensor: row['feature:comfortConvenience:parkingCensor'],
            ruiseControl: row['feature:comfortConvenience:ruiseControl'],
            headlight: row['feature:comfortConvenience:headlight'],
            keyless: row['feature:comfortConvenience:keyless'],
            steering: row['feature:comfortConvenience:steering'],
            twelvePowerOutlets: row['feature:comfortConvenience:twelvePowerOutlets'],
          },
          telematic: {
            // Placeholder for properties under 'telematic'
            findCar: row['feature:telematic:findCar'],
            checkVehicle: row['feature:telematic:checkVehicle'],
            geoFence: row['feature:telematic:geoFence'],
            emergencyCall: row['feature:telematic:emergencyCall'],
            ota: row['feature:telematic:ota'],
            remoteAc: row['feature:telematic:remoteAc'],
            remoteCar: row['feature:telematic:remoteCar'],
            remoteSunroof: row['feature:telematic:remoteSunroof'],
            carLight: row['feature:telematic:carLight'],
            alexa: row['feature:telematic:alexa'],
          },
          seat: {
            // Placeholder for properties under 'seat'
            driver: row['feature:seat:driver'],
            front: row['feature:seat:front'],
            rearrow: row['feature:seat:rearrow'],
            seat: row['feature:seat:seat'],
            leather: row['feature:seat:leather'],
            leatherWrapped: row['feature:seat:leatherWrapped'],
            driverArmrest: row['feature:seat:driverArmrest'],
            rearPassenger: row['feature:seat:rearPassenger'],
            vantilated: row['feature:seat:vantilated'],
            vantilatdSeat: row['feature:seat:vantilatdSeat'],
            interior: row['feature:seat:interior'],
            interiorColor: row['feature:seat:interiorColor'],
            rearArm: row['feature:seat:rearArm'],
            foldingRear: row['feature:seat:foldingRear'],
            splitRear: row['feature:seat:splitRear'],
            frontSeaback: row['feature:seat:frontSeaback'],
            headrest: row['feature:seat:headrest'],
          },
          Storage: {
            // Placeholder for properties under 'Storage'
            CupHolders: row['feature:Storage:CupHolders'],
            DriverArmrestStorage: row['feature:Storage:DriverArmrestStorage'],
            CooledGloveBox: row['feature:Storage:CooledGloveBox'],
            SunglassHolder: row['feature:Storage:SunglassHolder'],
          },
          door: {
            // Placeholder for properties under 'door'
            orvm: row['feature:door:orvm'],
            scuff: row['feature:door:scuff'],
            power: row['feature:door:power'],
            touchup: row['feature:door:touchup'],
            touchdown: row['feature:door:touchdown'],
            orvm: row['feature:door:orvm'],
            indicator: row['feature:door:indicator'],
            defogger: row['feature:door:defogger'],
            wiper: row['feature:door:wiper'],
            doorHandle: row['feature:door:doorHandle'],
            rainSensing: row['feature:door:rainSensing'],
            interior: row['feature:door:interior'],
            pocket: row['feature:door:pocket'],
            side: row['feature:door:side'],
            bootlid: row['feature:door:bootlid'],
          },
          exterior: {
            // Placeholder for properties under 'exterior'
            sunroof: row['feature:exterior:sunroof'],
            roofmount: row['feature:exterior:roofmount'],
            bodtcoor: row['feature:exterior:bodtcoor'],
            bodykit: row['feature:exterior:bodykit'],
            rubstrip: row['feature:exterior:rubstrip'],
          },
          lighting: {
            // Placeholder for properties under 'lighting'
            headlight: row['feature:lighting:headlight'],
            headlamp: row['feature:lighting:headlamp'],
            tailgit: row['feature:lighting:tailgit'],
            daytime: row['feature:lighting:daytime'],
            foglight: row['feature:lighting:foglight'],
            ambient: row['feature:lighting:ambient'],
            puddin: row['feature:lighting:puddin'],
            cabin: row['feature:lighting:cabin'],
            light: row['feature:lighting:light'],
            rear: row['feature:lighting:rear'],
            glove: row['feature:lighting:glove'],
            headlight: row['feature:lighting:headlight'],
          },
          // ... add other feature properties
        },
      };

      data.push(carData);
    }

    // Insert data into the database
    await Car.insertMany(data);

    res.json({ message: 'Data inserted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

exports.emiCalculator = async (req, res) => {
  try {
    const { loanAmount, interestRate, tenure } = req.body;

    // Validate input
    if (!loanAmount || !interestRate || !tenure) {
      return res.status(400).json({ error: 'Please provide loanAmount, interestRate, and tenure.' });
    }

    // Convert interest rate to decimal
    const monthlyInterestRate = interestRate / (12 * 100);

    // Calculate EMI using the formula
    const emi = (loanAmount * monthlyInterestRate * Math.pow(1 + monthlyInterestRate, tenure)) /
      (Math.pow(1 + monthlyInterestRate, tenure) - 1);

    // Calculate total amount, principal amount, and interest amount
    const totalAmount = emi * tenure;
    const principalAmount = loanAmount;
    const interestAmount = totalAmount - principalAmount;

    res.json({
      emi,
      totalAmount,
      principalAmount,
      interestAmount,
    });
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

