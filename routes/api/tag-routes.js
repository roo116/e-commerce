const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');
const { findAll } = require('../../models/Product');

// The `/api/tags` endpoint

router.get('/', (req, res) => {
  // find all tags
  Tag.findAll({
    attributes: [
      'id',
      'tag_name'
    ],
    include: {
      model: Product,
      attributes: ['product_name'],
      through: ProductTag,
      as: 'products'
    }
  }).then(dbTagData => res.json(dbTagData))
    .catch(err => {
      console.log(err);
      res.status(500).json(err)
    })
  // be sure to include its associated Product data
});

router.get('/:id', (req, res) => {
  // find a single tag by its `id`
  Tag.findOne({
    attributes: ['id', 'tag_name'],
    where: {
      id: req.params.id
    },
    include: {
      model: Product,
      attributes: ['product_name'],
      through: ProductTag,
      as: 'products'
    }
  }).then(dbTagData => {
    if (!dbTagData) {
      res.status(404).json({ message: 'Id not found' })
      return;
    }
    res.json(dbTagData);
  }).catch(err => {
    console.log(err);
    res.status(500).json(err);
  });
  // be sure to include its associated Product data
});

router.post('/', (req, res) => {
  // create a new tag
  Tag.create({
    tag_name: req.body.tag_name
  }).then(dbTagData => res.json(dbTagData))
  .catch(err => {
    res.status(500).json(err);
  });
});

router.put('/:id', (req, res) => {
  // update a tag's name by its `id` value
});

router.delete('/:id', (req, res) => {
  // delete on tag by its `id` value
});

module.exports = router;
