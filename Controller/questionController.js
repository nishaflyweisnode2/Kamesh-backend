const Question = require('../Models/questionModel')
require('dotenv').config();

exports.addQuestion = async (req, res) => {
  try {
    const { name,number,haveCar } = req.body;
    // Create a feedback entry
    const Questions = await Question.create({name,number,haveCar});

    res.status(201).json({ success: true, message: 'Question submitted successfully', Questions });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
};

exports.getQuestion = async (req, res) => {
  try {
    const Questions = await Question.find();
    res.status(200).json({ success: true, Questions: Questions });

  } catch (error) {
    res.status(500).json({ status: 500, message: "internal server error ", data: error.message, });
  }
};


exports.removeQuestion = async (req, res) => {
  const { id } = req.params;
  const Questions = await Question.findById(id);
  if (!Questions) {
    res.status(404).json({ message: "Question Not Found", status: 404, data: {} });
  } else {
    await Question.findByIdAndDelete(Questions._id);
    res.status(200).json({ message: "Question Deleted Successfully !" });
  }
};