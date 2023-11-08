const express = require('express'); 
const visitorAggControllers = require('../Controller/visitorAggController');

const router = express();



router.post('/',[  visitorAggControllers.addvisitorAgg]);
router.get('/',[  visitorAggControllers.getvisitorAgg]);
router.put('/:id',[ visitorAggControllers.updatevisitorAgg]);
router.delete('/:id',[ visitorAggControllers.DeletevisitorAgg])


module.exports = router;