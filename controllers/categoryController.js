const { Category } = require('../models');

// Obter todas as categorias
exports.getAllCategories = async (req, res) => {
  try {
    const categories = await Category.findAll();
    res.json(categories);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erro ao buscar categorias' });
  }
};

// Obter categoria por ID
exports.getCategoryById = async (req, res) => {
  try {
    const category = await Category.findByPk(req.params.id);
    
    if (!category) {
      return res.status(404).json({ message: 'Categoria não encontrada' });
    }
    
    res.json(category);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erro ao buscar categoria' });
  }
};

// Criar nova categoria
exports.createCategory = async (req, res) => {
  try {
    const { name, color, description } = req.body;
    
    const category = await Category.create({
      name,
      color,
      description
    });
    
    res.status(201).json(category);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erro ao criar categoria' });
  }
};

// Atualizar categoria
exports.updateCategory = async (req, res) => {
  try {
    const { name, color, description } = req.body;
    const categoryId = req.params.id;
    
    const category = await Category.findByPk(categoryId);
    
    if (!category) {
      return res.status(404).json({ message: 'Categoria não encontrada' });
    }
    
    // Atualizar campos
    if (name) category.name = name;
    if (color) category.color = color;
    if (description !== undefined) category.description = description;
    
    await category.save();
    
    res.json(category);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erro ao atualizar categoria' });
  }
};

// Excluir categoria
exports.deleteCategory = async (req, res) => {
  try {
    const categoryId = req.params.id;
    
    const category = await Category.findByPk(categoryId);
    
    if (!category) {
      return res.status(404).json({ message: 'Categoria não encontrada' });
    }
    
    await category.destroy();
    
    res.json({ message: 'Categoria excluída com sucesso' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erro ao excluir categoria' });
  }
};