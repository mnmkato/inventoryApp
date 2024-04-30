var express = require('express');
var router = express.Router();
const categoryController = require('../controllers/categoryController')

/* GET home page. */
router.get('/', categoryController.index);

/* GET category details page. */
router.get('/category/:id', categoryController.category_details);

/* GET item details page. */
router.get('/item/:id', categoryController.item_details);

module.exports = router;
