// Product belongs to Category, as a category can have multiple products but a product can only belong to one category.
// Product belongs to many Tag models. Using the ProductTag through model, allow products to have multiple tags and tags to have many products.



// import important parts of sequelize library
const { Model, DataTypes, DatabaseError } = require('sequelize');
const { FOREIGNKEYS } = require('sequelize/types/lib/query-types');
const { dateToString } = require('sqlstring');
// import our database connection from config.js
const sequelize = require('../config/connection');

// Initialize Product model (table) by extending off Sequelize's Model class
class Product extends Model { }

// set up fields and rules for Product model
Product.init(
  {
    // define columns
    // id - integer, not null, primary key, auto-increment
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    // product_name - string, not null, 
    product_name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    price: {
      type: DataTypes.DECIMAL,
      allowNull: false,
      validate: {
        isDecimal: true
      }
    },

    // stock - integer, not null, default value =10, validates isNumber, 
    stock: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 10,
      validate: {
        isInt: true
      }
    },
    category_id: {
      type: DataTypes.INTEGER
    }
    // category_id integer fk - category(id)
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'product',
  }
);

module.exports = Product;
