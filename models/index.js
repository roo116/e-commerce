// import models
const Product = require('./Product');
const Category = require('./Category');
const Tag = require('./Tag');
const ProductTag = require('./ProductTag');

// Products belongs To Category

// Categories have many Products
Category.hasMany(Product, {
  foreignKey: 'category_id'
});

Product.belongsTo(Category,{
  foreignKey:'category_id',
  onDelete: 'cascade'
});

Product.hasMany(Tag,{})
Product.belongsTo(Tag,{})

Tag.hasMany(Product,{})
Tag.belongsTo(Product,{})


// Products belongToMany Tags (through ProductTag)

// Tags belongToMany Products (through ProductTag)

module.exports = {
  Product,
  Category,
  Tag,
  ProductTag,
};
