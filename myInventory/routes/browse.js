var express = require('express');
var router = express.Router();
const categoryController = require('../controllers/categoryController')
const itemController = require('../controllers/itemController')

// CATEGORY ROUTES
/* GET home page. */
router.get('/', categoryController.index);

/* GET category details page. */
router.get('/category/create', categoryController.category_create_get);

/* POST category form data */
router.post('/category/create', categoryController.category_create_post);

/* GET category details page. */
router.get('/category/:id', categoryController.category_details);

// ITEM ROUTES
/* GET item details page. */
router.get('/item/:id', itemController.item_details);

/* GET delete item page. */
router.get('/item/:id/delete', itemController.item_delete_get);

/* POST delete item form. */
router.post('/item/:id/delete', itemController.item_delete_post);

/* GET edit category page. */
router.get('/category/:id/editItem', itemController.item_new_get);

/* POST category form data */
router.post('/category/:id/editItem', itemController.item_new_post);

module.exports = router;
