const notify= require('../Models/notificationModel');

exports.AddNotification = async(req,res) => {
    try{
    const data = {
        message: req.body.message, 
        type: req.body.type, 
    }
    const Data = await notify.create(data)
    res.status(200).json({
        message: Data
    })
    }catch(err){
        res.status(400).json({
            message: err.message
        })
    }
}
exports.GetAllNotification = async(req,res) => {
    const { type } = req.params;
    try {
      const notifications = await notify.find({ type });
    //   res.json(notifications);
  res.status(200).json({ message: "notify", status: 200, data: notifications });
    
    } catch (error) {
      console.error('Error fetching notifications:', error);
      res.status(500).json({ error: 'An error occurred while fetching notifications' });
    }
  };
exports.GetBYNotifyID = async(req,res) => {
    try{
    const data = await notify.findById({_id: req.params.id})
    res.status(200).json({
        message: data
    })
    }catch(err){
        res.status(400).json({
            message: err.message
        })
    }
}


exports.deleteNotification = async(req,res) => {
    try{
    await notify.findByIdAndDelete({_id: req.params.id});
    res.status(200).json({
        message: "Notification Deleted "
    })
    }catch(err){
        res.status(400).json({
            message: err.message
        })
    }
}
