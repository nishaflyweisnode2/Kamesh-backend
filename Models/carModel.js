const mongoose = require('mongoose');

const carSchema = new mongoose.Schema({

  fuelType: {
    type: String
  },
  bodyType: {
    type: String
  },
  view: {
    type: String,
    default:0
  },
  description: {
    type: String,
    default:"this is description"
  },
  like: {
    type: String,
    default:0
  },
  price: {
    type: Number,
    default:0
  },
  images: [
    {
      type: String, // Assuming the path to the image file
    },
  ],
  type: {
    type: String,
   
    enum:['upcoming', 'new'],
    // default:"Upcoming"
  },
  numOfReviews: {
    type: Number,
    default: 0,
  },
  isBestSelling: {
    type: Boolean,
    default: false,
  },
  name: {
    type: String,
    
  },
  company: {
    type: String,
   
  },
  specification: {
    // engine: {
    //   type: String,
    //   required: true,
    // },
    engines: {
      mileage: {
        type: String,
      },
      maxMotor: {
        type: String,
      
      },
      fuelType: {
        type: String,
      
      },
      // maxPower: {
      //   type: String,
      //   required: true,
      // },
      // maxTorque: {
      //   type: String,
      //   required: true,
      // },
      // milege: {
      //   type: String,
      //   required: true,
      // },
      // drivingRange: {
      //   type: String,
      //   required: true,
      // },
      // drivingTrain: {
      //   type: String,
      //   required: true,
      // },
      // transmission: {
      //   type: String,
      //   required: true,
      // },
      // emission: {
      //   type: String,
      //   required: true,
      // },  turbocharger: {
      //   type: String,
      //   required: true,
      // },
      // electricMotor: {
      //   type: String,
      //   required: true,
      // },
      // Others: {
      //   type: String,
      //   required: true,
      // },
    },
  //   dimension: {
  //     length: {
  //       type: String,
  //       required: true,
  //     },
  //     weight: {
  //       type: String,
  //       required: true,
  //     },
  //     height: {
  //       type: String,
  //       required: true,
  //     },
  //     wheelbase: {
  //       type: String,
  //       required: true,
  //     },
  //     groundClearance: {
  //       type: String,
  //       required: true,
  //     },
  //   },
  //   capacity: {
  //     door: {
  //       type: String,
  //       required: true,
  //     },
  //     seatCapacity: {
  //       type: String,
  //       required: true,
  //     },
  //     row: {
  //       type: String,
  //       required: true,
  //     },
  //     bootspace: {
  //       type: String,
  //       required: true,
  //     },
  //     fuelTank: {
  //       type: String,
  //       required: true,
  //     },
  //   },
  //  tyres: {
  //     frontSuspension: {
  //       type: String,
  //       required: true,
  //     },
  //     rearSuspension: {
  //       type: String,
  //       required: true,
  //     },
  //     frontbrakeType: {
  //       type: String,
  //       required: true,
  //     },
  //     rearBrakeType: {
  //       type: String,
  //       required: true,
  //     },
  //     steeringType: {
  //       type: String,
  //       required: true,
  //     },
  //     wheel: {
  //       type: String,
  //       required: true,
  //     },
  //     spareWheel: {
  //       type: String,
  //       required: true,
  //     },
  //     frontTyre: {
  //       type: String,
  //       required: true,
  //     },
  //     rearTyre: {
  //       type: String,
  //       required: true,
  //     },
  //   },
  // },

  // feature: {
  //   safety: {
  //     overspeed: {
  //       type: String,
  //       required: true,
  //     },
  //     emergencybrakelightflash: {
  //       type: String,
  //       required: true,
  //     },
  //     punctureRepair: {
  //       type: String,
  //       required: true,
  //     },
  //     ncap: {
  //       type: String,
  //       required: true,
  //     },
  //     blindSpot: {
  //       type: String,
  //       required: true,
  //     },
  //     dashcam: {
  //       type: String,
  //       required: true,
  //     },
  //     airbag: {
  //       type: String,
  //       required: true,
  //     },
  //     rearmiddleseatbelt: {
  //       type: String,
  //       required: true,
  //     },  tyrePressure: {
  //       type: String,
  //       required: true,
  //     },  childSheet: {
  //       type: String,
  //       required: true,
  //     },  seatBelt: {
  //       type: String,
  //       required: true,
  //     },  
  //   },
  //   brakingTraction: {
  //     antiLockBrackingSystem: {
  //       type: String,
  //       required: true,
  //     },
  //     electronicBrakeForceDistribution: {
  //       type: String,
  //       required: true,
  //     },
  //     brakeassit: {
  //       type: String,
  //       required: true,
  //     },
  //     electronicStability: {
  //       type: String,
  //       required: true,
  //     },
  //     hillHold: {
  //       type: String,
  //       required: true,
  //     },
  //     tractionControl: {
  //       type: String,
  //       required: true,
  //     },
  //     hillDescent: {
  //       type: String,
  //       required: true,
  //     },
      
  //   },
  //   lockSecurity: {
  //     engineImmobiliser: {
  //       type: String,
  //       required: true,
  //     },
  //     centreLock: {
  //       type: String,
  //       required: true,
  //     },
  //     speedSensing: {
  //       type: String,
  //       required: true,
  //     },
  //     childSafety : {
  //       type: String,
  //       required: true,
  //     },
 
  //   },
  //   comfortConvenience: {
  //     umbrellaStorage: {
  //       type: String,
  //       required: true,
  //     },
  //     electronicParking: {
  //       type: String,
  //       required: true,
  //     },
  //     airConditioner: {
  //       type: String,
  //       required: true,
  //     },
  //     frontAc : {
  //       type: String,
  //       required: true,
  //     },
  //     rearAc : {
  //       type: String,
  //       required: true,
  //     },
  //     thirdRowAc : {
  //       type: String,
  //       required: true,
  //     },
  //     heater : {
  //       type: String,
  //       required: true,
  //     }, vantyMirror : {
  //       type: String,
  //       required: true,
  //     }, cabinBoot : {
  //       type: String,
  //       required: true,
  //     }, antiGlare : {
  //       type: String,
  //       required: true,
  //     }, parkingAssit : {
  //       type: String,
  //       required: true,
  //     }, parkingCensor : {
  //       type: String,
  //       required: true,
  //     },
  //     ruiseControl : {
  //       type: String,
  //       required: true,
  //     }, headlight : {
  //       type: String,
  //       required: true,
  //     }, keyless : {
  //       type: String,
  //       required: true,
  //     }, steering : {
  //       type: String,
  //       required: true,
  //     }, twelvePowerOutlets : {
  //       type: String,
  //       required: true,
  //     },
  //   },
  //   telematic: {
  //     findCar: {
  //       type: String,
  //       required: true,
  //     },
  //     checkVehicle: {
  //       type: String,
  //       required: true,
  //     },
  //     geoFence: {
  //       type: String,
  //       required: true,
  //     },
  //     emergencyCall : {
  //       type: String,
  //       required: true,
  //     },
  //     ota : {
  //       type: String,
  //       required: true,
  //     },
  //     remoteAc : {
  //       type: String,
  //       required: true,
  //     },
  //     remoteCar : {
  //       type: String,
  //       required: true,
  //     }, remoteSunroof : {
  //       type: String,
  //       required: true,
  //     }, carLight : {
  //       type: String,
  //       required: true,
  //     }, alexa : {
  //       type: String,
  //       required: true,
  //     },
  //   },
  //   seat: {
  //     driver: {
  //       type: String,
  //       required: true,
  //     },
  //     front: {
  //       type: String,
  //       required: true,
  //     },
  //     rearrow: {
  //       type: String,
  //       required: true,
  //     },
  //     seat : {
  //       type: String,
  //       required: true,
  //     },
  //     leather : {
  //       type: String,
  //       required: true,
  //     },
  //  leatherWrapped : {
  //       type: String,
  //       required: true,
  //     },
  //     driverArmrest : {
  //       type: String,
  //       required: true,
  //     }, rearPassenger : {
  //       type: String,
  //       required: true,
  //     }, vantilated : {
  //       type: String,
  //       required: true,
  //     }, vantilatdSeat : {
  //       type: String,
  //       required: true,
  //     },
  //     interior : {
  //       type: String,
  //       required: true,
  //     }, interiorColor : {
  //       type: String,
  //       required: true,
  //     }, rearArm : {
  //       type: String,
  //       required: true,
  //     }, foldingRear : {
  //       type: String,
  //       required: true,
  //     },
  //     splitRear : {
  //       type: String,
  //       required: true,
  //     }, frontSeaback : {
  //       type: String,
  //       required: true,
  //     }, headrest : {
  //       type: String,
  //       required: true,
  //     },
  //   },
  //   Storage: {
  //     CupHolders: {
  //       type: String,
  //       required: true,
  //     },
  //     DriverArmrestStorage: {
  //       type: String,
  //       required: true,
  //     },
  //     CooledGloveBox: {
  //       type: String,
  //       required: true,
  //     },
  //     SunglassHolder : {
  //       type: String,
  //       required: true,
  //     },

  //   },
  //   door: {
  //     orvm: {
  //       type: String,
  //       required: true,
  //     },
  //     scuff: {
  //       type: String,
  //       required: true,
  //     },
  //     power: {
  //       type: String,
  //       required: true,
  //     },
  //     touchup : {
  //       type: String,
  //       required: true,
  //     },
  //     touchdown : {
  //       type: String,
  //       required: true,
  //     }, orvm : {
  //       type: String,
  //       required: true,
  //     }, indicator : {
  //       type: String,
  //       required: true,
  //     }, defogger : {
  //       type: String,
  //       required: true,
  //     },

  //     wiper : {
  //       type: String,
  //       required: true,
  //     }, doorHandle : {
  //       type: String,
  //       required: true,
  //     }, rainSensing : {
  //       type: String,
  //       required: true,
  //     }, interior : {
  //       type: String,
  //       required: true,
  //     },
  //     pocket : {
  //       type: String,
  //       required: true,
  //     }, side : {
  //       type: String,
  //       required: true,
  //     }, bootlid : {
  //       type: String,
  //       required: true,
  //     },
  //   },
  //   exterior: {
  //     sunroof: {
  //       type: String,
  //       required: true,
  //     },
  //     roofmount: {
  //       type: String,
  //       required: true,
  //     },
  //     bodtcoor: {
  //       type: String,
  //       required: true,
  //     },
  //     bodykit : {
  //       type: String,
  //       required: true,
  //     },
  //     rubstrip : {
  //       type: String,
  //       required: true,
  //     }, },
  //     lighting: {
  //       headlight: {
  //         type: String,
  //         required: true,
  //       },
  //       headlamp: {
  //         type: String,
  //         required: true,
  //       },
  //       tailgit: {
  //         type: String,
  //         required: true,
  //       },
  //       daytime : {
  //         type: String,
  //         required: true,
  //       },
  //       foglight : {
  //         type: String,
  //         required: true,
  //       },  ambient : {
  //         type: String,
  //         required: true,
  //       },  puddin : {
  //         type: String,
  //         required: true,
  //       },  cabin : {
  //         type: String,
  //         required: true,
  //       },  light : {
  //         type: String,
  //         required: true,
  //       }, 
  //       rear : {
  //         type: String,
  //         required: true,
  //       }, glove : {
  //         type: String,
  //         required: true,
  //       }, headlight : {
  //         type: String,
  //         required: true,
  //       },},
},
// ... other properties
}, {
timestamps: true, // Add timestamps (createdAt, updatedAt) to the schema
});

const Car = mongoose.model('Car', carSchema);

module.exports = Car;