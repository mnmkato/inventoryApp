const Category = require('../models/category'); 
const Item = require('../models/item'); 
const asyncHandler = require("express-async-handler");

exports.item_details = asyncHandler(async function(req, res, next) {
    const selectedItem = await  Item.findById(req.params.id).populate("category").exec()
    res.render("item",{
        title: selectedItem.name,
        item: selectedItem
    })
  })
  exports.item_new_get = asyncHandler( async function(req, res, next) {   
    const category = await Category.findById(req.params.id).exec()
    console.log(category)
    res.render('item_new',{
      title: "Add new item",
      category_id: category._id
    });
    }
  ) 
  exports.item_new_post = asyncHandler( async function(req, res, next) {   
    try {
        // Sanitize the item data
        const itemName = req.body.item_name.trim();
        const itemQuantity = parseInt(req.body.item_quantity);
        const itemUnit = req.body.item_unit.trim();
        const categoryId = req.body.category_id.trim(); 

        // Create a new Item instance
        const newItem = new Item({
          name: itemName,
          quantity: itemQuantity,
          unit: itemUnit,
          category: categoryId
        });
    
        // Save the item to the database
        await newItem.save();
    
        console.log('Item saved successfully');
        res.redirect(`/browse/category/${categoryId}`);
      } catch (error) {
        console.error('Error saving item:', error);
        res.status(500).send('Error saving item');
      }
    }
  ) 
  
  exports.item_delete_get = asyncHandler( async function(req, res, next) {   
    const item = await Item.findById(req.params.id).exec()
    res.render('item_delete',{item:item});
    }
  ) 
  exports.item_delete_post = asyncHandler( async function(req, res, next) {   
    try {
        // Sanitize the item ID
        const itemId = req.body.itemId.trim();

        const item = await Item.findById(itemId);

        // Delete the item from the database
        await Item.findByIdAndDelete(itemId);

        console.log('Item deleted successfully');
        
        res.redirect(`/browse/category/${item.category}`);
      } catch (error) {
        console.error('Error saving item:', error);
        res.status(500).send('Error saving item');
      }
    }
  ) 
  
  