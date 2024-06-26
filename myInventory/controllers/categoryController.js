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
  res.render('category_form',{
    title: "Create new category"
  });
  }
) 
exports.category_create_post = asyncHandler( async function(req, res, next) {   
    try {
      // Sanitize the category name
      const categoryName = req.body.category_name.trim();
      const categoryDescription = req.body.category_description.trim();

      // Create a new Category instance
      const newCategory = new Category({
      name: categoryName,
      description: categoryDescription
      });
      await newCategory.save()
      res.redirect('/browse');
    } catch (error) {
      console.error('Error saving category:', err);
      res.status(500).send('Error saving category');
    }
  }
) 

// EDIT CATEGORY CONTROLLERS
exports.category_edit_get = asyncHandler( async function(req, res, next) {   
  const category = await Category.findById(req.params.id).exec()
  
  res.render('category_form',{
    title: `Edit item: ${category.name}`,
    category:category
  });
  }
) 
exports.category_edit_post = asyncHandler( async function(req, res, next) {   
  try {
    // Sanitize the category data
    const categoryName = req.body.category_name.trim();
    const categoryDescription = req.body.category_description.trim();
    const categoryId = req.params.id; 

    // find a new category to update
    const updatedCategory = await Category.findByIdAndUpdate(categoryId, {
      name: categoryName,
      description: categoryDescription
    });

    // Save the item to the database
    await updatedCategory.save();

    console.log('Category saved successfully');
    res.redirect(updatedCategory.url);
  } catch (error) {
    console.error('Error saving category:', error);
    res.status(500).send('Error saving category');
  }
  }
)

// DELETE CATEGORY CONTROLLERS
exports.category_delete_get = asyncHandler( async function(req, res, next) {   
  const category = await Category.findById(req.params.id).exec()
  res.render('category_form_delete',{category:category});
  }
) 
exports.category_delete_post = asyncHandler( async function(req, res, next) {   
  try {
      // Sanitize the item ID
      const categoryId = req.body.categoryId.trim();

      // Delete each item in the category
      const itemsInCategory = await Item.find({category:categoryId});
      await Promise.all(itemsInCategory.map(async item => {
        await Item.findByIdAndDelete(item._id);
      }));

      // Delete the item from the database
      await Category.findByIdAndDelete(categoryId);

      console.log('Category deleted successfully');
      res.redirect(`/browse`);
    } catch (error) {
      console.error('Error deleting category:', error);
      res.status(500).send('Error deleting category');
    }
  }
) 