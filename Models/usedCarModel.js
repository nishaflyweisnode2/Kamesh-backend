const mongoose = require("mongoose");

const mongoosePaginate = require("mongoose-paginate-v2");
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
        Car_first_link: {
            type: String,
        },
        State: {
            type: String,
        },
        Location: {
            type: String,
        },
        cityId: {
            type: String,
        },
        Display_name: {
            type: String,
        },
        ModelId: {
            type: String,
        },
        Make: {
            type: String,
        },
        ModelName: {
            type: String,
        },
        Launched_date: {
            type: String,
        },
        varient_link: {
            type: String,
        },
        price_breakup_url: {
            type: String,
        },
        Varient_name: {
            type: String,
        },
        Varient_id: {
            type: String,
        },
        EMI: {
            type: String,
        },
        ExShowroomPrice: {
            type: String,
        },
        SKU: {
            type: String,
        },
        MPN: {
            type: String,
        },
        bodyType: {
            type: String,
        },
        fuelType: {
            type: String,
        },
        fuelConsumption: {
            type: String,
        },
        summery_description: {
            type: String,
        },
        color_options: [{
            type: String,
        }],
        color_options_with_images: [{
            url: String,
            name: String
        }],
        vehicleTransmission: {
            type: String,
        },
        driveWheelConfiguration: {
            type: String,
        },
        rating: {
            type: String,
        },
        reviewCount: {
            type: String,
        },
        totalRatings: {
            type: String,
        },
        Total_image_count: {
            type: String,
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
        },
        Upcoming_Cars: {
            type: String,
        },

        video_link: {
            type: String,
        },
        sponsored_cars: {
            type: String,
        },
        nearByCities_price: [{
            city: String,
            price: String,
        }],
        nearByArea_price: {
            type: String,
        },
        popularCities_price: [{
            city: String,
            price: String
        }],
        minPrice: {
            type: String,
        },
        maxPrice: {
            type: String,
        },
        RTOCorporate: {
            type: String,
        },
        RTO: {
            type: String,
        },
        AMC: {
            type: String,
        },
        Insurance: {
            type: String,
        },
        HypothecationCharges: {
            type: String,
        },
        FASTag: {
            type: String,
        },
        ExtendedWarranty: {
            type: String,
        },
        AccessoriesPackage: {
            type: String,
        },
        LoyaltyCard: {
            type: String,
        },
        TopSpeed: {
            type: String,
        },
        Acceleration: {
            type: String,
        },
        City: {
            type: String,
        },
        Mileage: {
            type: String,
        },
        Highway: {
            type: String,
        },
        Range: {
            type: String,
        },
        Engine: {
            type: String,
        },
        EngineType: {
            type: String,
        },
        FuelType: {
            type: String,
        },
        MaxPower: {
            type: String,
        },
        MaxTorque: {
            type: String,
        },
        Performance: {
            type: String,
        },
        ElectricMotor: {
            type: String,
        },
        MaxMotor: {
            type: String,
        },
        DrivingRange: {
            type: String,
        },
        Drivetrain: {
            type: String,
        },
        Transmission: {
            type: String,
        },
        EmissionStandard: {
            type: String,
        },
        Turbocharger: {
            type: String,
        },
        Battery: {
            type: String,
        },
        BatteryCharging: {
            type: String,
        },
        ElectricMotor: {
            type: String,
        },
        Others: {
            type: String,
        },
        AlternateFuel: {
            type: String,
        },
        Length: {
            type: String,
        },
        Width: {
            type: String,
        },
        Height: {
            type: String,
        },
        Wheelbase: {
            type: String,
        },
        GroundClearance: {
            type: String,
        },
        KerbWeight: {
            type: String,
        },
        Doors: {
            type: String,
        },
        SeatingCapacity: {
            type: String,
        },
        NoofRows: {
            type: String,
        },
        Bootspace: {
            type: String,
        },
        FuelTankCapacity: {
            type: String,
        },
        FourWheelSteering: {
            type: String,
        },
        FrontSuspension: {
            type: String,
        },
        RearSuspension: {
            type: String,
        },
        FrontBrake: {
            type: String,
        },
        RearBrakeType: {
            type: String,
        },
        MinimumTurningRadius: {
            type: String,
        },
        SteeringTypeWheels: {
            type: String,
        },
        SpareWheel: {
            type: String,
        },
        FrontTyres: {
            type: String,
        },
        RearTyres: {
            type: String,
        },
        Overspeed: {
            type: String,
        },
        PunctureRepairKit: {
            type: String,
        },
        NCAPRating: {
            type: String,
        },
        Airbags: {
            type: String,
        },
        RearMiddleThreePointseatbelt: {
            type: String,
        },
        TyrePressureMonitoringSystem: {
            type: String,
        },
        Seat: {
            type: String,
        },
        AntiLock: {
            type: String,
        },
        Electronic: {
            type: String,
        },
        BrakeAssist: {
            type: String,
        },
        ElectronicStabilityProgram: {
            type: String,
        },
        HillHoldControl: {
            type: String,
        },
        EngineImmobiliser: {
            type: String,
        },
        CentralLocking: {
            type: String,
        },
        SpeedSensingDoor: {
            type: String,
        },
        Lock: {
            type: String,
        },
        SafetyLock: {
            type: String,
        },
        AirConditioner: {
            type: String,
        },
        FrontAC: {
            type: String,
        },
        Heater: {
            type: String,
        },
        Vanity: {
            type: String,
        },
        Mirrors: {
            type: String,
        },
        Cabin: {
            type: String,
        },
        AntiglareMirrors: {
            type: String,
        },
        ParkingAssist: {
            type: String,
        },
        ParkingSensors: {
            type: String,
        },
        Headlight: {
            type: String,
        },
        Keyless: {
            type: String,
        },
        Start: {
            type: String,
        },
        SteeringAdjustment: {
            type: String,
        },
        PowerOutlets: {
            type: String,
        },
        FindMyCar: {
            type: String,
        },
        CheckVehicleStatus: {
            type: String,
        },
        Geofence: {
            type: String,
        },
        RemoteAC: {
            type: String,
        },
        CarLock: {
            type: String,
        },
        CarLightFlashing: {
            type: String,
        },
        Drive: {
            type: String,
        },
        FrontPassenger: {
            type: String,
        },
        SeatUpholstery: {
            type: String,
        },
        LeatherwrappedSteeringWheel: {
            type: String,
        },
        RearPassengerSeat: {
            type: String,
        },
        Interiors: {
            type: String,
        },
        InteriorColours: {
            type: String,
        },
        RearArmrestFolding: {
            type: String,
        },
        RearSeat: {
            type: String,
        },
        SplitRear: {
            type: String,
        },
        FrontSeatbackPockets: {
            type: String,
        },
        Headrests: {
            type: String,
        },
        CupHolders: {
            type: String,
        },
        CooledGlovebox: {
            type: String,
        },
        ORVMColour: {
            type: String,
        },
        ScuffPlates: {
            type: String,
        },
        PowerWindows: {
            type: String,
        },
        OneTouchDown: {
            type: String,
        },
        OneTouchUp: {
            type: String,
        },
        AdjustableORVMs: {
            type: String,
        },
        TurnIndicators: {
            type: String,
        },
        RearDefogger: {
            type: String,
        },
        RearWiper: {
            type: String,
        },
        ExteriorDoor: {
            type: String,
        },
        RainsensingWipers: {
            type: String,
        },
        InteriorDoorHandles: {
            type: String,
        },
        DoorPockets: {
            type: String,
        },
        BootlidOpener: {
            type: String,
        },
        RoofmountedAntenna: {
            type: String,
        },
        BodycolouredBumpers: {
            type: String,
        },
        BodyKitRub: {
            type: String,
        },
        Headlights: {
            type: String,
        },
        AutomaticHeadlamps: {
            type: String,
        },
        FollowMeHomeHeadlamps: {
            type: String,
        },
        Taillights: {
            type: String,
        },
        DaytimeRunningLights: {
            type: String,
        },
        FogLights: {
            type: String,
        },
        PuddleLamps: {
            type: String,
        },
        CabinLamps: {
            type: String,
        },
        HeadlightHeightAdjuster: {
            type: String,
        },
        InstantaneousConsumption: {
            type: String,
        },
        InstrumentCluster: {
            type: String,
        },
        TripMeter: {
            type: String,
        },
        AverageFuelConsumption: {
            type: String,
        },
        AverageSpeed: {
            type: String,
        },
        DistancetoEmptyClock: {
            type: String,
        },
        LowFuelLevelWarning: {
            type: String,
        },
        DoorAjarWarning: {
            type: String,
        },
        AdjustableClusterBrightness: {
            type: String,
        },
        GearIndicator: {
            type: String,
        },
        ShiftIndicator: {
            type: String,
        },
        Tachometer: {
            type: String,
        },
        SmartConnectivity: {
            type: String,
        },
        Display: {
            type: String,
        },
        Touchscreen: {
            type: String,
        },
        SizeIntegratedMusicSystem: {
            type: String,
        },
        Speakers: {
            type: String,
        },
        Steeringmounted: {
            type: String,
        },
        controls: {
            type: String,
        },
        VoiceCommand: {
            type: String,
        },
        GPSNavigationSystem: {
            type: String,
        },
        BluetoothCompatibility: {
            type: String,
        },
        AUXCompatibility: {
            type: String,
        },
        AMRadio: {
            type: String,
        },
        USBCompatibility: {
            type: String,
        },
        HeadUnitSize: {
            type: String,
        },
        iPodCompatibility: {
            type: String,
        },
        BatteryWarranty: {
            type: String,
        },
        Warranty: {
            type: String,
        },
        MCD: {
            type: String,
        },
        EmergencyBrake: {
            type: String,
        },
        LightFlashing: {
            type: String,
        },
        /// ye add new key hua h ye excel me nahi hoga ye modle me hi hoga ok kyuki ye admin side acess hoga ok 
        isPopular: {
            type: Boolean,
            default: false,
        },
        isHighRatedCar: {
            type: Boolean,
            default: false,
        },
        isBestSelling: {
            type: Boolean,
            default: false,
        },
        isUpcomingCars: {
            type: Boolean,
            default: false,
        },
        isJustLaunchedCar: {
            type: Boolean,
            default: false,
        },
        isRejectedCar: {
            type: Boolean,
            default: false,
        },
        isAdminApproved: {
            type: Boolean,
            default: false,
        },
        remarks: {
            type: String,
        },
        status: {
            type: Boolean,
            default: false,
        },
    },

    {
        timestamps: true,
    }
);

carSchema.plugin(mongoosePaginate);
carSchema.plugin(mongooseAggregatePaginate);
module.exports = mongoose.model("UsedCar", carSchema);