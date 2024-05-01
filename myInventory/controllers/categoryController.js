const Category = require('../models/category'); 
const Item = require('../models/item'); 
const asyncHandler = require("express-async-handler");

exports.index = asyncHandler(async function(req, res, next) {
  // Retrieve and list all categories
  const categories = await Category.find();
  
  res.render('index',{
    title:"Categories",
    list: categories
  });
})

exports.category_details = asyncHandler( async function(req, res, next) {
  // Retrieve and list all items under category
  const [category, itemsInCategory] = await Promise.all([
    Category.findById(req.params.id).exec(),
    Item.find({category:req.params.id}).exec()
  ]) 
    
  res.render('category',{
    category: category,
    list: itemsInCategory
  });
  }
) 
exports.category_create_get = asyncHandler( async function(req, res, next) {   
  res.render('category_new',{
    title: "Create new category"
  });
  }
) 
exports.category_create_post = asyncHandler( async function(req, res, next) {   
    try {
      // Sanitize the category name
      const categoryName = req.body.category_name.trim();

      // Create a new Category instance
      const newCategory = new Category({
      name: categoryName
      });
      await newCategory.save()
      res.redirect('/browse');
    } catch (error) {
      console.error('Error saving category:', err);
      res.status(500).send('Error saving category');
    }
  }
) 

