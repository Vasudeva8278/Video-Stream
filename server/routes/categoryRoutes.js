const express = require('express');
const {
  createCategory,
  getCategories,
  updateCategory,
  deleteCategory,
  filterContent,
} = require('../controllers/categoryController');

const router = express.Router();

router.post('/categories', createCategory);


router.get('/categories', getCategories);

router.put('/categories/:id', updateCategory);


router.delete('/categories/:id', deleteCategory);


router.get('/categories/filter', filterContent);

module.exports = router;
