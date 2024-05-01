const mongoose = require('mongoose');
const Schema = mongoose.Schema
const categorySchema = new Schema({
  name: {
    type: String,
    required: true
  },
  description: {
    type: String
  },
 items:[{
    type:Schema.Types.ObjectId,
    ref:"Item"
 }]    
});

categorySchema.virtual("url").get(function () {
    return `/browse/category/${this._id}`
})

module.exports = mongoose.model('Category', categorySchema);
