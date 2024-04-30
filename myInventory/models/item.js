const mongoose = require('mongoose');

const Schema = mongoose.Schema
const itemSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  quantity:{
    type: Number,
    required: true
  },
  unit: {
    type: String,
    required: true
  },
  category:{
    type:Schema.Types.ObjectId,
    ref:"Category"
  }
});

itemSchema.virtual("url").get(function () {
    return `/browse/item/${this._id}`
})

module.exports = mongoose.model('Item', itemSchema);
