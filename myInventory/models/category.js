const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  }});

categorySchema.virtual("url").get(function () {
    return `/browse/category/${this._id}`
})

module.exports = mongoose.model('Category', categorySchema);
