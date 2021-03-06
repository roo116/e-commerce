const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', (req, res) => {
  Category.findAll(
    {
      include: {
        model: Product,
        attributes: ['product_name','stock', 'price', 'category_id']
      }
    }
  ).then(dbCatData => res.json(dbCatData))
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.get('/:id', (req, res) => {
  Category.findOne({
    attributes: ['id', 'category_name'],
    where: {
      id: req.params.id
    },
    include: {
      model: Product,
      attributes: ['product_name','stock', 'price', 'category_id']
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
  Category.update(req.body, {
    attributes: ['category_name'],
    where: {
      id: req.params.id
    }
  }).then(dbCatData => {
    if (!dbCatData[0]) {
      res.status(404).json({ message: 'ID not found' });
      return;
    }
    res.json(dbCatData);
  })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.delete('/:id', (req, res) => {
  // delete a category by its `id` value
  Category.destroy({
    where: {
      id: req.params.id
    }
  }).then(dbCatData =>{
    if(!dbCatData) {
      res.status(404).json({message: 'ID not found'});
      return;
    }
    res.json(dbCatData);
  }).catch(err=>{
    console.log(err);
    res.status(500).json(err);
  });
});

module.exports = router;
