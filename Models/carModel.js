// const mongoose = require("mongoose");

// const carSchema = new mongoose.Schema(
//   {
//     fuelType: {
//       type: String,
//     },
//     bodyType: {
//       type: String,
//     },
//     view: {
//       type: String,
//       default: 0,
//     },
//     description: {
//       type: String,
//       default: "this is description",
//     },
//     like: {
//       type: String,
//       default: 0,
//     },
//     price: {
//       type: Number,
//       default: 0,
//     },
//     images: [
//       {
//         type: String, // Assuming the path to the image file
//       },
//     ],
//     type: {
//       type: String,

//       enum: ["upcoming", "new"],
//       // default:"Upcoming"
//     },
//     numOfReviews: {
//       type: Number,
//       default: 0,
//     },
//     isBestSelling: {
//       type: Boolean,
//       default: false,
//     },
//     name: {
//       type: String,
//     },
//     company: {
//       type: String,
//     },
//     Display_name: {
//       type: String,
//     },
//     ModelId: {
//       type: String,
//     },
//     Make: {
//       type: String,
//     },
//     Car_link: {
//       type: String,
//     },
//     car_images: [{
//       url: String,
//     }],
//     specification: {
//       engines: {
//         mileage: {
//           type: String,
//         },
//         maxMotor: {
//           type: String,
//         },
//         fuelType: {
//           type: String,
//         },
//         maxPower: {
//           type: String,
//           // required: true,
//         },
//         maxTorque: {
//           type: String,
//           // required: true,
//         },
//         milege: {
//           type: String,
//           // required: true,
//         },
//         drivingRange: {
//           type: String,
//           // required: true,
//         },
//         drivingTrain: {
//           type: String,
//           // required: true,
//         },
//         transmission: {
//           type: String,
//           // required: true,
//         },
//         emission: {
//           type: String,
//           // required: true,
//         },
//         turbocharger: {
//           type: String,
//           // required: true,
//         },
//         electricMotor: {
//           type: String,
//           // required: true,
//         },
//         Others: {
//           type: String,
//           // required: true,
//         },
//       },
//       dimension: {
//         length: {
//           type: String,
//           // required: true,
//         },
//         weight: {
//           type: String,
//           // required: true,
//         },
//         height: {
//           type: String,
//           // required: true,
//         },
//         wheelbase: {
//           type: String,
//           // required: true,
//         },
//         groundClearance: {
//           type: String,
//           // required: true,
//         },
//       },
//       capacity: {
//         door: {
//           type: String,
//           // required: true,
//         },
//         seatCapacity: {
//           type: String,
//           // required: true,
//         },
//         row: {
//           type: String,
//           // required: true,
//         },
//         bootspace: {
//           type: String,
//           // required: true,
//         },
//         fuelTank: {
//           type: String,
//           // required: true,
//         },
//       },
//       tyres: {
//         frontSuspension: {
//           type: String,
//           // required: true,
//         },
//         rearSuspension: {
//           type: String,
//           // required: true,
//         },
//         frontbrakeType: {
//           type: String,
//           // required: true,
//         },
//         rearBrakeType: {
//           type: String,
//           // required: true,
//         },
//         steeringType: {
//           type: String,
//           // required: true,
//         },
//         wheel: {
//           type: String,
//           // required: true,
//         },
//         spareWheel: {
//           type: String,
//           // required: true,
//         },
//         frontTyre: {
//           type: String,
//           // required: true,
//         },
//         rearTyre: {
//           type: String,
//           // required: true,
//         },
//       },
//     },

//     feature: {
//       safety: {
//         overspeed: {
//           type: String,
//           // required: true,
//         },
//         emergencybrakelightflash: {
//           type: String,
//           // required: true,
//         },
//         punctureRepair: {
//           type: String,
//           // required: true,
//         },
//         ncap: {
//           type: String,
//           // required: true,
//         },
//         blindSpot: {
//           type: String,
//           // required: true,
//         },
//         dashcam: {
//           type: String,
//           // required: true,
//         },
//         airbag: {
//           type: String,
//           // required: true,
//         },
//         rearmiddleseatbelt: {
//           type: String,
//           // required: true,
//         },
//         tyrePressure: {
//           type: String,
//           // required: true,
//         },
//         childSheet: {
//           type: String,
//           // required: true,
//         },
//         seatBelt: {
//           type: String,
//           // required: true,
//         },
//       },
//       brakingTraction: {
//         antiLockBrackingSystem: {
//           type: String,
//           // required: true,
//         },
//         electronicBrakeForceDistribution: {
//           type: String,
//           // required: true,
//         },
//         brakeassit: {
//           type: String,
//           // required: true,
//         },
//         electronicStability: {
//           type: String,
//           // required: true,
//         },
//         hillHold: {
//           type: String,
//           // required: true,
//         },
//         tractionControl: {
//           type: String,
//           // required: true,
//         },
//         hillDescent: {
//           type: String,
//           // required: true,
//         },
//       },
//       lockSecurity: {
//         engineImmobiliser: {
//           type: String,
//           // required: true,
//         },
//         centreLock: {
//           type: String,
//           // required: true,
//         },
//         speedSensing: {
//           type: String,
//           // required: true,
//         },
//         childSafety: {
//           type: String,
//           // required: true,
//         },
//       },
//       comfortConvenience: {
//         umbrellaStorage: {
//           type: String,
//           // required: true,
//         },
//         electronicParking: {
//           type: String,
//           // required: true,
//         },
//         airConditioner: {
//           type: String,
//           // required: true,
//         },
//         frontAc: {
//           type: String,
//           // required: true,
//         },
//         rearAc: {
//           type: String,
//           // required: true,
//         },
//         thirdRowAc: {
//           type: String,
//           // required: true,
//         },
//         heater: {
//           type: String,
//           // required: true,
//         },
//         vantyMirror: {
//           type: String,
//           // required: true,
//         },
//         cabinBoot: {
//           type: String,
//           // required: true,
//         },
//         antiGlare: {
//           type: String,
//           // required: true,
//         },
//         parkingAssit: {
//           type: String,
//           // required: true,
//         },
//         parkingCensor: {
//           type: String,
//           // required: true,
//         },
//         ruiseControl: {
//           type: String,
//           // required: true,
//         },
//         headlight: {
//           type: String,
//           // required: true,
//         },
//         keyless: {
//           type: String,
//           // required: true,
//         },
//         steering: {
//           type: String,
//           // required: true,
//         },
//         twelvePowerOutlets: {
//           type: String,
//           // required: true,
//         },
//       },
//       telematic: {
//         findCar: {
//           type: String,
//           // required: true,
//         },
//         checkVehicle: {
//           type: String,
//           // required: true,
//         },
//         geoFence: {
//           type: String,
//           // required: true,
//         },
//         emergencyCall: {
//           type: String,
//           // required: true,
//         },
//         ota: {
//           type: String,
//           // required: true,
//         },
//         remoteAc: {
//           type: String,
//           // required: true,
//         },
//         remoteCar: {
//           type: String,
//           // required: true,
//         },
//         remoteSunroof: {
//           type: String,
//           // required: true,
//         },
//         carLight: {
//           type: String,
//           // required: true,
//         },
//         alexa: {
//           type: String,
//           // required: true,
//         },
//       },
//       seat: {
//         driver: {
//           type: String,
//           // required: true,
//         },
//         front: {
//           type: String,
//           // required: true,
//         },
//         rearrow: {
//           type: String,
//           // required: true,
//         },
//         seat: {
//           type: String,
//           // required: true,
//         },
//         leather: {
//           type: String,
//           // required: true,
//         },
//         leatherWrapped: {
//           type: String,
//           // required: true,
//         },
//         driverArmrest: {
//           type: String,
//           // required: true,
//         },
//         rearPassenger: {
//           type: String,
//           // required: true,
//         },
//         vantilated: {
//           type: String,
//           // required: true,
//         },
//         vantilatdSeat: {
//           type: String,
//           // required: true,
//         },
//         interior: {
//           type: String,
//           // required: true,
//         },
//         interiorColor: {
//           type: String,
//           // required: true,
//         },
//         rearArm: {
//           type: String,
//           // required: true,
//         },
//         foldingRear: {
//           type: String,
//           // required: true,
//         },
//         splitRear: {
//           type: String,
//           // required: true,
//         },
//         frontSeaback: {
//           type: String,
//           // required: true,
//         },
//         headrest: {
//           type: String,
//           // required: true,
//         },
//       },
//       Storage: {
//         CupHolders: {
//           type: String,
//           // required: true,
//         },
//         DriverArmrestStorage: {
//           type: String,
//           // required: true,
//         },
//         CooledGloveBox: {
//           type: String,
//           // required: true,
//         },
//         SunglassHolder: {
//           type: String,
//           // required: true,
//         },
//       },
//       door: {
//         orvm: {
//           type: String,
//           // required: true,
//         },
//         scuff: {
//           type: String,
//           // required: true,
//         },
//         power: {
//           type: String,
//           // required: true,
//         },
//         touchup: {
//           type: String,
//           // required: true,
//         },
//         touchdown: {
//           type: String,
//           // required: true,
//         },
//         orvm: {
//           type: String,
//           // required: true,
//         },
//         indicator: {
//           type: String,
//           // required: true,
//         },
//         defogger: {
//           type: String,
//           // required: true,
//         },

//         wiper: {
//           type: String,
//           // required: true,
//         },
//         doorHandle: {
//           type: String,
//           // required: true,
//         },
//         rainSensing: {
//           type: String,
//           // required: true,
//         },
//         interior: {
//           type: String,
//           // required: true,
//         },
//         pocket: {
//           type: String,
//           // required: true,
//         },
//         side: {
//           type: String,
//           // required: true,
//         },
//         bootlid: {
//           type: String,
//           // required: true,
//         },
//       },
//       exterior: {
//         sunroof: {
//           type: String,
//           // required: true,
//         },
//         roofmount: {
//           type: String,
//           // required: true,
//         },
//         bodtcoor: {
//           type: String,
//           // required: true,
//         },
//         bodykit: {
//           type: String,
//           // required: true,
//         },
//         rubstrip: {
//           type: String,
//           // required: true,
//         },
//       },
//       lighting: {
//         headlight: {
//           type: String,
//           // required: true,
//         },
//         headlamp: {
//           type: String,
//           // required: true,
//         },
//         tailgit: {
//           type: String,
//           // required: true,
//         },
//         daytime: {
//           type: String,
//           // required: true,
//         },
//         foglight: {
//           type: String,
//           // required: true,
//         },
//         ambient: {
//           type: String,
//           // required: true,
//         },
//         puddin: {
//           type: String,
//           // required: true,
//         },
//         cabin: {
//           type: String,
//           // required: true,
//         },
//         light: {
//           type: String,
//           // required: true,
//         },
//         rear: {
//           type: String,
//           // required: true,
//         },
//         glove: {
//           type: String,
//           // required: true,
//         },
//         headlight: {
//           type: String,
//           // required: true,
//         },
//       },
//     },
//     // ... other properties
//   },
//   {
//     timestamps: true, // Add timestamps (createdAt, updatedAt) to the schema
//   }
// );

// const Car = mongoose.model("Car", carSchema);

// module.exports = Car;

const mongoose = require("mongoose");

const mongoosePaginate = require("mongoose-paginate");
const mongooseAggregatePaginate = require("mongoose-aggregate-paginate");

const carSchema = new mongoose.Schema(
  {
    Brand_name: {
      type: String,
    },
    Brand_link: {
      type: String,
    },
    Car_link: {
      type: String,
    },
    State: {
      type: String,
    },
    Location: {
      type: String,
      // required: true,
    },
    cityId: {
      type: String,
      // required: true,
    },
    Display_name: {
      type: String,
      // required: true,
    },
    ModelId: {
      type: String,
      // required: true,
    },
    Make: {
      type: String,
      // required: true,
    },
    ModelName: {
      type: String,
      // required: true,
    },
    Launched_date: {
      type: String,
      // required: true,
    },
    varient_link: {
      type: String,
      // required: true,
    },
    price_breakup_url: {
      type: String,
      // required: true,
    },
    Varient_name: {
      type: String,
      // required: true,
    },
    Varient_id: {
      type: String,
      // required: true,
    },
    EMI: {
      type: String,
      // required: true,
    },
    ExShowroomPrice: {
      type: String,
      // required: true,
    },
    SKU: {
      type: String,
      // required: true,
    },
    MPN: {
      type: String,
      // required: true,
    },
    bodyType: {
      type: String,
      // required: true,
    },
    fuelType: {
      type: String,
      // required: true,
    },
    fuelConsumption: {
      type: String,
      // required: true,
    },
    summery_description: {
      type: String,
      // required: true,
    },
    color_options: {
      type: String,
      // required: true,
    },
    color_options_with_images: {
      type: String,
      // required: true,
    },
    vehicleTransmission: {
      type: String,
      // required: true,
    },
    driveWheelConfiguration: {
      type: String,
      // required: true,
    },
    rating: {
      type: String,
      // required: true,
    },
    reviewCount: {
      type: String,
      // required: true,
    },
    totalRatings: {
      type: String,
      // required: true,
    },
    Total_image_count: {
      type: String,
      // required: true,
    },
    // car_images: {
    //   type: String,
    // required: true,
    // },
    car_images: [{
      url: String,
    }],
    review_text: [{
      username: { type: String, default: null },
      review: { type: String, default: null },
    }],
    brochure_link: {
      type: String,
      // required: true,
    },
    Upcoming_Cars: {
      type: String,
      // required: true,
    },

    video_link: {
      type: String,
      // required: true,
    },
    sponsored_cars: {
      type: String,
      // required: true,
    },
    nearByCities_price: {
      type: String,
      // required: true,
    },
    nearByArea_price: {
      type: String,
      // required: true,
    },
    popularCities_price: {
      type: String,
      // required: true,
    },
    minPrice: {
      type: String,
      // required: true,
    },
    maxPrice: {
      type: String,
      // required: true,
    },
    RTOCorporate: {
      type: String,
      // required: true,
    },
    RTO: {
      type: String,
      // required: true,
    },
    AMC: {
      type: String,
      // required: true,
    },
    Insurance: {
      type: String,
      // required: true,
    },
    HypothecationCharges: {
      type: String,
      // required: true,
    },
    FASTag: {
      type: String,
      // required: true,
    },
    ExtendedWarranty: {
      type: String,
      // required: true,
    },
    AccessoriesPackage: {
      type: String,
      // required: true,
    },
    LoyaltyCard: {
      type: String,
      // required: true,
    },
    TopSpeed: {
      type: String,
      // required: true,
    },
    Acceleration: {
      type: String,
      // required: true,
    },
    City: {
      type: String,
      // required: true,
    },
    Mileage: {
      type: String,
      // required: true,
    },
    Highway: {
      type: String,
      // required: true,
    },
    Range: {
      type: String,
      // required: true,
    },
    Engine: {
      type: String,
      // required: true,
    },
    EngineType: {
      type: String,
      // required: true,
    },
    FuelType: {
      type: String,
      // required: true,
    },
    MaxPower: {
      type: String,
      // required: true,
    },
    MaxTorque: {
      type: String,
      // required: true,
    },
    Performance: {
      type: String,
      // required: true,
    },
    ElectricMotor: {
      type: String,
      // required: true,
    },
    MaxMotor: {
      type: String,
      // required: true,
    },
    DrivingRange: {
      type: String,
      // required: true,
    },
    Drivetrain: {
      type: String,
      // required: true,
    },
    Transmission: {
      type: String,
      // required: true,
    },
    EmissionStandard: {
      type: String,
      // required: true,
    },
    Turbocharger: {
      type: String,
      // required: true,
    },
    Battery: {
      type: String,
      // required: true,
    },
    BatteryCharging: {
      type: String,
      // required: true,
    },
    ElectricMotor: {
      type: String,
      // required: true,
    },
    Others: {
      type: String,
      // required: true,
    },
    AlternateFuel: {
      type: String,
      // required: true,
    },
    Length: {
      type: String,
      // required: true,
    },
    Width: {
      type: String,
      // required: true,
    },
    Height: {
      type: String,
      // required: true,
    },
    Wheelbase: {
      type: String,
      // required: true,
    },
    GroundClearance: {
      type: String,
      // required: true,
    },
    KerbWeight: {
      type: String,
      // required: true,
    },
    Doors: {
      type: String,
      // required: true,
    },
    SeatingCapacity: {
      type: String,
      // required: true,
    },
    NoofRows: {
      type: String,
      // required: true,
    },
    Bootspace: {
      type: String,
      // required: true,
    },
    FuelTankCapacity: {
      type: String,
      // required: true,
    },
    FourWheelSteering: {
      type: String,
      // required: true,
    },
    FrontSuspension: {
      type: String,
      // required: true,
    },
    RearSuspension: {
      type: String,
      // required: true,
    },
    FrontBrake: {
      type: String,
      // required: true,
    },
    RearBrakeType: {
      type: String,
      // required: true,
    },
    MinimumTurningRadius: {
      type: String,
      // required: true,
    },
    SteeringTypeWheels: {
      type: String,
      // required: true,
    },
    SpareWheel: {
      type: String,
      // required: true,
    },
    FrontTyres: {
      type: String,
      // required: true,
    },
    RearTyres: {
      type: String,
      // required: true,
    },
    Overspeed: {
      type: String,
      // required: true,
    },
    PunctureRepairKit: {
      type: String,
      // required: true,
    },
    NCAPRating: {
      type: String,
      // required: true,
    },
    Airbags: {
      type: String,
      // required: true,
    },
    RearMiddleThreePointseatbelt: {
      type: String,
      // required: true,
    },
    TyrePressureMonitoringSystem: {
      type: String,
      // required: true,
    },
    Seat: {
      type: String,
      // required: true,
    },
    AntiLock: {
      type: String,
      // required: true,
    },
    Electronic: {
      type: String,
      // required: true,
    },
    BrakeAssist: {
      type: String,
      // required: true,
    },
    ElectronicStabilityProgram: {
      type: String,
      // required: true,
    },
    HillHoldControl: {
      type: String,
      // required: true,
    },
    EngineImmobiliser: {
      type: String,
      // required: true,
    },
    CentralLocking: {
      type: String,
      // required: true,
    },
    SpeedSensingDoor: {
      type: String,
      // required: true,
    },
    Lock: {
      type: String,
      // required: true,
    },
    SafetyLock: {
      type: String,
      // required: true,
    },
    AirConditioner: {
      type: String,
      // required: true,
    },
    FrontAC: {
      type: String,
      // required: true,
    },
    Heater: {
      type: String,
      // required: true,
    },
    Vanity: {
      type: String,
      // required: true,
    },
    Mirrors: {
      type: String,
      // required: true,
    },
    Cabin: {
      type: String,
      // required: true,
    },
    AntiglareMirrors: {
      type: String,
      // required: true,
    },
    ParkingAssist: {
      type: String,
      // required: true,
    },
    ParkingSensors: {
      type: String,
      // required: true,
    },
    Headlight: {
      type: String,
      // required: true,
    },
    Keyless: {
      type: String,
      // required: true,
    },
    Start: {
      type: String,
      // required: true,
    },
    SteeringAdjustment: {
      type: String,
      // required: true,
    },
    PowerOutlets: {
      type: String,
      // required: true,
    },
    FindMyCar: {
      type: String,
      // required: true,
    },
    CheckVehicleStatus: {
      type: String,
      // required: true,
    },
    Geofence: {
      type: String,
      // required: true,
    },
    RemoteAC: {
      type: String,
      // required: true,
    },
    CarLock: {
      type: String,
      // required: true,
    },
    CarLightFlashing: {
      type: String,
      // required: true,
    },
    Drive: {
      type: String,
      // required: true,
    },
    FrontPassenger: {
      type: String,
      // required: true,
    },
    SeatUpholstery: {
      type: String,
      // required: true,
    },
    LeatherwrappedSteeringWheel: {
      type: String,
      // required: true,
    },
    RearPassengerSeat: {
      type: String,
      // required: true,
    },
    Interiors: {
      type: String,
      // required: true,
    },
    InteriorColours: {
      type: String,
      // required: true,
    },
    RearArmrestFolding: {
      type: String,
      // required: true,
    },
    RearSeat: {
      type: String,
      // required: true,
    },
    SplitRear: {
      type: String,
      // required: true,
    },
    FrontSeatbackPockets: {
      type: String,
      // required: true,
    },
    Headrests: {
      type: String,
      // required: true,
    },
    CupHolders: {
      type: String,
      // required: true,
    },
    CooledGlovebox: {
      type: String,
      // required: true,
    },
    ORVMColour: {
      type: String,
      // required: true,
    },
    ScuffPlates: {
      type: String,
      // required: true,
    },
    PowerWindows: {
      type: String,
      // required: true,
    },
    OneTouchDown: {
      type: String,
      // required: true,
    },
    OneTouchUp: {
      type: String,
      // required: true,
    },
    AdjustableORVMs: {
      type: String,
      // required: true,
    },
    TurnIndicators: {
      type: String,
      // required: true,
    },
    RearDefogger: {
      type: String,
      // required: true,
    },
    RearWiper: {
      type: String,
      // required: true,
    },
    ExteriorDoor: {
      type: String,
      // required: true,
    },
    RainsensingWipers: {
      type: String,
      // required: true,
    },
    InteriorDoorHandles: {
      type: String,
      // required: true,
    },
    DoorPockets: {
      type: String,
      // required: true,
    },
    BootlidOpener: {
      type: String,
      // required: true,
    },
    RoofmountedAntenna: {
      type: String,
      // required: true,
    },
    BodycolouredBumpers: {
      type: String,
      // required: true,
    },
    BodyKitRub: {
      type: String,
      // required: true,
    },
    Headlights: {
      type: String,
      // required: true,
    },
    AutomaticHeadlamps: {
      type: String,
      // required: true,
    },
    FollowMeHomeHeadlamps: {
      type: String,
      // required: true,
    },
    Taillights: {
      type: String,
      // required: true,
    },
    DaytimeRunningLights: {
      type: String,
      // required: true,
    },
    FogLights: {
      type: String,
      // required: true,
    },
    PuddleLamps: {
      type: String,
      // required: true,
    },
    CabinLamps: {
      type: String,
      // required: true,
    },
    HeadlightHeightAdjuster: {
      type: String,
      // required: true,
    },
    InstantaneousConsumption: {
      type: String,
      // required: true,
    },
    InstrumentCluster: {
      type: String,
      // required: true,
    },
    TripMeter: {
      type: String,
      // required: true,
    },
    AverageFuelConsumption: {
      type: String,
      // required: true,
    },
    AverageSpeed: {
      type: String,
      // required: true,
    },
    DistancetoEmptyClock: {
      type: String,
      // required: true,
    },
    LowFuelLevelWarning: {
      type: String,
      // required: true,
    },
    DoorAjarWarning: {
      type: String,
      // required: true,
    },
    AdjustableClusterBrightness: {
      type: String,
      // required: true,
    },
    GearIndicator: {
      type: String,
      // required: true,
    },
    ShiftIndicator: {
      type: String,
      // required: true,
    },
    Tachometer: {
      type: String,
      // required: true,
    },
    SmartConnectivity: {
      type: String,
      // required: true,
    },
    Display: {
      type: String,
      // required: true,
    },
    Touchscreen: {
      type: String,
      // required: true,
    },
    SizeIntegratedMusicSystem: {
      type: String,
      // required: true,
    },
    Speakers: {
      type: String,
      // required: true,
    },
    Steeringmounted: {
      type: String,
      // required: true,
    },
    controls: {
      type: String,
      // required: true,
    },
    VoiceCommand: {
      type: String,
      // required: true,
    },
    GPSNavigationSystem: {
      type: String,
      // required: true,
    },
    BluetoothCompatibility: {
      type: String,
      // required: true,
    },
    AUXCompatibility: {
      type: String,
      // required: true,
    },
    AMRadio: {
      type: String,
      // required: true,
    },
    USBCompatibility: {
      type: String,
      // required: true,
    },
    HeadUnitSize: {
      type: String,
      // required: true,
    },
    iPodCompatibility: {
      type: String,
      // required: true,
    },
    BatteryWarranty: {
      type: String,
      // required: true,
    },
    BatteryWarranty: {
      type: String,
      // required: true,
    },
    Warranty: {
      type: String,
      // required: true,
    },
    Warranty: {
      type: String,
      // required: true,
    },
    MCD: {
      type: String,
      // required: true,
    },
    ExtendedWarranty: {
      type: String,
      // required: true,
    },
    EmergencyBrake: {
      type: String,
      // required: true,
    },
    LightFlashing: {
      type: String,
      // required: true,
    },
    // Child Seat Anchor Points	Hill Descent Control	Rear AC	Emergency Call	Rear Row Seat Adjustment	Leather-wrapped Gear Knob	Driver Armrest	Ambient Interior Lighting	Wireless Charger	Lane Departure Warning	Forward Collision Warning (FCW)	Automatic Emergency Braking (AEB)	High-beam Assist	Blind Spot Detection	Lane Departure Prevention	Rear Middle Head Rest	Four-Wheel-Drive	Limited Slip Differential (LSD)	Umbrella Storage in Door	Electronic Parking Brake	Over The Air (OTA) Updates	Remote Sunroof: Open / Close via App	Alexa Compatibility	Massage Seats	Split Third Row Seat	Driver Armrest Storage	Sunglass Holder	Sunroof / Moonroof	Chrome Finish Exhaust Pipe	Ambient Interior Count	Cornering Headlights	Light on Vanity Mirrors	Rear Reading Lamp	Glovebox Lamp	Heads Up Display (HUD)	Display Screen for Rear Passengers	Internal Hard Drive	Tax Collected at Source (TCS)	Rear Cross-traffic Assist	Differential Lock	Ventilated Seats	Ventilated Seat Type	Heated/Cooled Cup Holders	Third Row AC Zone	Third Row Seat Adjustment	Third Row Seat Type	Third Row Cup Holders	Side Window Blinds	Rear Windshield Blind	DVD Playback
  },

  {
    timestamps: true, // Add timestamps (createdAt, updatedAt) to the schema
  }
);

const Car = mongoose.model("Car", carSchema);

carSchema.plugin(mongoosePaginate);
carSchema.plugin(mongooseAggregatePaginate);


module.exports = Car;
