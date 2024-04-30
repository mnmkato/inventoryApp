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