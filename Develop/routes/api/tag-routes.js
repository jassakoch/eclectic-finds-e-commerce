const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/',  async (req, res) => {
  // Finding all tags
  // Including its associated Product data
  try {
    const tagData = await Tag.findAll({
      include: [{ model: Product, through:  ProductTag }]
    });
    res.status(200).json(tagData)
  }
  catch (error) {
    res.status(500).json(error)
  }

});

router.get('/:id', async (req, res) => {
  // find a single tag by its `id`
  // be sure to include its associated Product data
  try {
    const tagData = await Tag.findByPk(req.params.id, {
      // JOIN with Product
      include: [{ model: Product }]
    });

    if (!tagData) {
      res.status(404).json({ message: 'No tag found with this id!' });
      return;
    }

    res.status(200).json(tagData);
  } catch (error) {
    res.status(500).json(err);
  }
});

router.post('/', async (req, res) => {
  // Creating a new tag
  try {
    const tagData = await Tag.create({
      tag_name: req.body.tag_name,
    });
    res.status(200).json(tagData);
  } catch (error) {
    res.status(400).json(error);
  }
}); 

router.put('/:id', async (req, res) => {
  // update a tag's name by its `id` value
  try {
    const tagData = await Tag.update(
      {
        tag_name: req.body.tag_name,
      },
      {
        where: {
          id: req.params.id,
        },
      }
      );
  res.status (200).json(tagData);
    } catch (error) {
      res.status(500).json(error);
    }
});

router.delete('/:id', async (req, res) => {
  // Delete on tag by its `id` value
  try {
    const tagData = await Tag.destroy({
      where: {
        id: req.params.id,
      },
    });
  
    if (!tagData) {
      res.status(404).json({ message: 'No tag found with that id!' });
      return;
    }
  
    res.status(200).json(tagData);
  } catch (err) {
    res.status(500).json(err);
  }

});

module.exports = router;
