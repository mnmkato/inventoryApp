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
    
  res.render('index',{
    title: category.name,
    list: itemsInCategory
  });
    res.send('Category page with items');
  }
) 

