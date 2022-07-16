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
  ).then(dbCatData => res.json(dbCatData))
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });

  // be sure to include its associated Products
});

router.get('/:id', (req, res) => {
  Category.findOne({
    attributes: ['id', 'category_name'],
    where: {
      id: req.params.id
    },
    include: {
      model: Product,
      attributes: ['product_name']
    }
  }).then(dbCatData => {
    if (!dbCatData) {
      res.status(404).json({ message: 'Id not found' });
      return;
    }
    res.json(dbCatData)
  })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);

    })
  // find one category by its `id` value
  // be sure to include its associated Products
});

router.post('/', (req, res) => {
  // create a new category
  Category.create({
    category_name: req.body.category_name
  }).then(dbCatData => res.json(dbCatData))
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.put('/:id', (req, res) => {
  // update a category by its `id` value
  Category.put({
    
  })
});

router.delete('/:id', (req, res) => {
  // delete a category by its `id` value
  Category.destroy();
});

module.exports = router;
