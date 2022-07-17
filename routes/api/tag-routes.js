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
    // attributes: [
    //   'id',
    //   'tag_name'
    // ],
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
      res.status(404).json({ message: 'ID not found' });
      return;
    }
    res.json(dbTagData)
  })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    })

});

router.post('/', (req, res) => {
  // create a new tag
  Tag.create({
    tag_name: req.body.tag_name,
    productIds: req.body.product_id
  }).then(dbTagData => res.json(dbTagData))
    .catch(err => {
      console.log(err)
      res.status(500).json(err);
    });
});

router.put('/:id', (req, res) => {
  // update tag data
  Tag.update(req.body, {
    attributes: ['tag_name'],
    where: {
      id: req.params.id,
    },
  }).then(dbTagData => {
      if (!dbTagData[0]) {
        res.status(404).json({ message: 'ID not found' });
        return
      }
      res.json(dbTagData);
    }).catch(err => {
      console.log(err);
      res.status(500).json(err);
    })
})


router.delete('/:id', (req, res) => {
  // delete on tag by its `id` value
  Tag.destroy({
    where: {
      id: req.params.id
    }
  }).then(dbTagData => {
    if (!dbTagData) {
      res.status(404).json({ message: 'ID not found' })
      return;
    }
    res.json(dbTagData);
  }).catch(err => {
    console.log(err);
    res.status(500).json(err);
  })
});

module.exports = router;
