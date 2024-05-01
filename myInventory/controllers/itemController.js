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
  
// ADD ITEM CONTROLLERS
exports.item_new_get = asyncHandler( async function(req, res, next) {   
  const category = await Category.findById(req.params.id).exec()
  console.log(category)
  res.render('item_form',{
    title: "Add new item",
    category_id: category._id
  });
  }
) 
exports.item_new_post = asyncHandler( async function(req, res, next) {   
  try {
      // Sanitize the item data
      const itemName = req.body.item_name.trim();
      const itemDescription = req.body.item_description.trim();
      const itemQuantity = parseInt(req.body.item_quantity);
      const itemUnit = req.body.item_unit.trim();
      const itemPrice = parseInt(req.body.item_price);
      const categoryId = req.body.category_id.trim(); 

      // Create a new Item instance
      const newItem = new Item({
        name: itemName,
        description: itemDescription,
        quantity: itemQuantity,
        unit: itemUnit,
        price: itemPrice,
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

// DELETE ITEM CONTROLLERS
exports.item_delete_get = asyncHandler( async function(req, res, next) {   
  const item = await Item.findById(req.params.id).exec()
  res.render('item_form_delete',{item:item});
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

// EDIT ITEM CONTROLLERS
exports.item_edit_get = asyncHandler( async function(req, res, next) {   
  const item = await Item.findById(req.params.id).exec()
  
  res.render('item_form',{
    title: `Edit item: ${item.name}`,
    category_id: item.category.toString(),
    item:item
  });
  }
) 
exports.item_edit_post = asyncHandler( async function(req, res, next) {   
  try {
    // Sanitize the item data
    const itemName = req.body.item_name.trim();
    const itemDescription = req.body.item_description.trim();
    const itemQuantity = parseInt(req.body.item_quantity);
    const itemUnit = req.body.item_unit.trim();
    const itemPrice = parseInt(req.body.item_price);
    const categoryId = req.body.category_id.trim(); 
    const itemId = req.params.id; 

    // find a new Item to update
    const updatedItem = await Item.findByIdAndUpdate(itemId, {
      name: itemName,
      description: itemDescription,
      quantity: itemQuantity,
      unit: itemUnit,
      price: itemPrice,
      category: categoryId
    });

    // Save the item to the database
    await updatedItem.save();

    console.log('Item saved successfully');
    res.redirect(updatedItem.url);
  } catch (error) {
    console.error('Error saving item:', error);
    res.status(500).send('Error saving item');
  }
  }
) 


  