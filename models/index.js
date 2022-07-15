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

Product.belongsTo(Category, {
  foreignKey: 'category_id',
  onDelete: 'cascade'
});

Product.belongsToMany(Tag, {
  through: ProductTag,
  as: 'tags',
  foreignKey: 'product_id'
});

Tag.belongsToMany(Product, {
  through: ProductTag,
  as: 'tags',
  foreignKey: 'tag_id'
});
// Post.belongsToMany(User, {
//   through: Vote,
//   as: 'voted_posts',
//   foreignKey: 'post_id'
// })



// Product.belongsToMany(Tag, {
//   through: ProductTag,
//   as: 'product_tags',
//   foreignKey: 'product_id'
// })
// Tag.belongsToMany(Product, {
//   through: ProductTag,
//   as: 'product_tags',
//   foreignKey: 'tag_id'
// });

// Tag.hasMany(ProductTag,{
//   foreignKey:'product_id'
// })

// Tag.belongsTo(ProductTag,{
// //   foreignKey:'product_id',
// //   onDelete: 'cascade'
// })


// Products belongToMany Tags (through ProductTag)

// Tags belongToMany Products (through ProductTag)

module.exports = {
  Product,
  Category,
  Tag,
  ProductTag,
};
