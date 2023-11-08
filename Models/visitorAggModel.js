const mongoose = require("mongoose"); 

const visitorAggSchema = mongoose.Schema({
    aggrement: {
        type: String
    }
})



const visitorAgg  = mongoose.model('visitorAgg', visitorAggSchema);

module.exports = visitorAgg;