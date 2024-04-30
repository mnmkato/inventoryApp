const Category = require('../models/category'); 
const asyncHandler = require("express-async-handler");

exports.index = asyncHandler(async function(req, res, next) {

  // Retrieve and list all categories
  const categories = await Category.find();
  console.log(categories)
  res.render('index',{
    title:"Categories",
    categories: categories
  });
})

exports.category_details = function(req, res, next) {
  res.send('Category page with items');
}

exports.item_details = function(req, res, next) {
  res.send('Item details page');
}