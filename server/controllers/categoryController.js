const Category = require('../models/Category');

exports.createCategory = async (req, res) => {
  const { name, subCategories } = req.body;

  try {
    const newCategory = new Category({
      name,
      subCategories,
    });

    await newCategory.save();
    res.status(201).json({ message: 'Category created successfully', category: newCategory });
  } catch (err) {
    res.status(500).json({ error: 'Server error', details: err.message });
  }
};


exports.getCategories = async (req, res) => {
  try {
    const categories = await Category.find();
    res.status(200).json(categories);
  } catch (err) {
    res.status(500).json({ error: 'Server error', details: err.message });
  }
};


exports.updateCategory = async (req, res) => {
  const { id } = req.params;
  const { name, subCategories } = req.body;

  try {
    const updatedCategory = await Category.findByIdAndUpdate(
      id,
      { name, subCategories },
      { new: true }
    );

    if (!updatedCategory) {
      return res.status(404).json({ error: 'Category not found' });
    }

    res.status(200).json({ message: 'Category updated successfully', category: updatedCategory });
  } catch (err) {
    res.status(500).json({ error: 'Server error', details: err.message });
  }
};


exports.deleteCategory = async (req, res) => {
  const { id } = req.params;

  try {
    const deletedCategory = await Category.findByIdAndDelete(id);

    if (!deletedCategory) {
      return res.status(404).json({ error: 'Category not found' });
    }

    res.status(200).json({ message: 'Category deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: 'Server error', details: err.message });
  }
};

exports.filterContent = async (req, res) => {
  const { category, subCategory } = req.query;

  try {
    const query = {};

    if (category) query.name = category;
    if (subCategory) query['subCategories.name'] = subCategory;

    const categories = await Category.find(query);
    res.status(200).json(categories);
  } catch (err) {
    res.status(500).json({ error: 'Server error', details: err.message });
  }
};
