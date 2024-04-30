exports.index = function(req, res, next) {
    res.send('Home page with categories that lead to items');
}

exports.category_details = function(req, res, next) {
  res.send('Category page with items');
}

exports.item_details = function(req, res, next) {
  res.send('Item details page');
}