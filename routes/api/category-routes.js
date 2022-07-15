const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', (req, res) => {
  Category.findAll(
    {
      include: {
        model: Product,
        attributes: ['product_name']
      }
    }
  ).then(dbCatData=> res.json(dbCatData))
  .catch(err => {
    console.log(err);
    res.status(500).json(err);
  });

  // be sure to include its associated Products
});

router.get('/:id', (req, res) => {
  Category.findOne({
    where: {
      attribute: req.params.id
    }
  }).then(dbCatData)
  // find one category by its `id` value
  // be sure to include its associated Products
});

router.post('/', (req, res) => {
  // create a new category
  Category.create()
});

router.put('/:id', (req, res) => {
  // update a category by its `id` value
  Category.put()
});

router.delete('/:id', (req, res) => {
  // delete a category by its `id` value
  Category.destroy();
});

module.exports = router;
