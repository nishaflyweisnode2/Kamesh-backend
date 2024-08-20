const visitorAgg = require('../Models/visitorAggModel')




exports.addvisitorAgg = async (req, res) => {
    console.log("hi");
    try {
        const visitorAggData = await visitorAgg.create({ aggrement: req.body.aggrement });
        res.status(200).json({
            data: visitorAggData,
            message: " visitorAggData Added "
        })
    }
    catch (err) {
        console.log(err);
        res.status(400).send({ message: err.message })
    }
}


exports.getvisitorAgg = async (req, res) => {
    try {
        const data = await visitorAgg.find().lean();
        // console.log(data.visitorAgg)
        return res.status(200).json({
            visitorAgg: data
        })

    } catch (err) {
        res.status(400).send({ mesage: err.mesage });
    }
}



exports.updatevisitorAgg = async (req, res) => {
    try {

        const UpdatedvisitorAgg = await visitorAgg.findOneAndUpdate({ _id: req.params.id }, {
            aggrement: req.body.aggrement
        }).exec();
        console.log(UpdatedvisitorAgg);
        res.status(200).json({
            message: "visitorAgg Update"
        })
    } catch (err) {
        console.log(err)
        res.status(401).json({
            mesage: err.mesage
        })
    }
}


exports.DeletevisitorAgg = async (req, res) => {
    try {
        const id = req.params.id;
        await visitorAgg.deleteOne({ _id: id });
        res.status(200).send({ message: "visitorAgg  deleted " })
    } catch (err) {
        console.log(err);
        res.status(400).send({ message: err.message })
    }
}