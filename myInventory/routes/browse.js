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

/* GET category item page. */
router.get('/category/:id/editCategory', categoryController.category_edit_get);

/* POST category item form data */
router.post('/category/:id/editCategory', categoryController.category_edit_post);

/* GET delete category page. */
router.get('/category/:id/deleteCategory', categoryController.category_delete_get);

/* POST delete category form. */
router.post('/category/:id/deleteCategory', categoryController.category_delete_post);


// ITEM ROUTES
/* GET item details page. */
router.get('/item/:id', itemController.item_details);

/* GET delete item page. */
router.get('/item/:id/delete', itemController.item_delete_get);

/* POST delete item form. */
router.post('/item/:id/delete', itemController.item_delete_post);

/* GET edit item page. */
router.get('/item/:id/editItem', itemController.item_edit_get);

/* POST edit item form data */
router.post('/item/:id/editItem', itemController.item_edit_post);

/* GET new item page. */
router.get('/category/:id/addItem', itemController.item_new_get);

/* POST new item form data */
router.post('/category/:id/addItem', itemController.item_new_post);

module.exports = router;
