const express = require("express");
const {
 createNews, getNews,getNewsbyId,updateNewsbyId,deleteNewsbyId
} = require("../Controller/newsController");
const router = express.Router();

router.route("/create").post(createNews);
router.route("/get").get(getNews);
router.route("/get/:id").get(getNewsbyId);
router.route("/update/:id").put(updateNewsbyId);
router.route("/delete/:id").delete(deleteNewsbyId);

module.exports = router;
