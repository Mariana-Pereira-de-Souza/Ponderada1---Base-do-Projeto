const express = require('express');
const router = express.Router();
const { Task, User, Category } = require('../models');

// Middleware para verificar autenticação
const isAuthenticated = (req, res, next) => {
  if (req.session.userId) {
    return next();
  }
  res.redirect('/login');
};

// Página inicial - Lista de tarefas
router.get('/', isAuthenticated, async (req, res) => {
  try {
    const tasks = await Task.findAll({
      where: { user_id: req.session.userId },
      include: [Category]
    });
    
    const categories = await Category.findAll();
    const user = await User.findByPk(req.session.userId, {
      attributes: { exclude: ['password'] }
    });
    
    res.render('index', {
      title: 'Tarefas',
      currentPage: 'tasks',
      tasks,
      categories,
      user,
      script: 'tasks'
    });
  } catch (error) {
    console.error(error);
    res.status(500).send('Erro ao carregar tarefas');
  }
});

// Página de usuários
router.get('/users', isAuthenticated, async (req, res) => {
  try {
    // Verificar se o usuário é admin
    const currentUser = await User.findByPk(req.session.userId);
    if (currentUser.role !== 'admin') {
      return res.redirect('/');
    }
    
    const users = await User.findAll({
      attributes: { exclude: ['password'] }
    });
    
    res.render('users/index', {
      title: 'Usuários',
      currentPage: 'users',
      users,
      user: currentUser,
      script: 'users'
    });
  } catch (error) {
    console.error(error);
    res.status(500).send('Erro ao carregar usuários');
  }
});

// Página de categorias
router.get('/categories', isAuthenticated, async (req, res) => {
  try {
    const categories = await Category.findAll();
    const user = await User.findByPk(req.session.userId, {
      attributes: { exclude: ['password'] }
    });
    
    res.render('categories/index', {
      title: 'Categorias',
      currentPage: 'categories',
      categories,
      user,
      script: 'categories'
    });
  } catch (error) {
    console.error(error);
    res.status(500).send('Erro ao carregar categorias');
  }
});

// Página de login
router.get('/login', (req, res) => {
  if (req.session.userId) {
    return res.redirect('/');
  }
  res.render('login', { error: null });
});

// Processar login
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    
    const user = await User.findOne({ where: { email } });
    
    if (!user || !await user.checkPassword(password)) {
      return res.render('login', { error: 'Email ou senha inválidos' });
    }
    
    if (!user.active) {
      return res.render('login', { error: 'Usuário inativo' });
    }
    
    req.session.userId = user.id;
    res.redirect('/');
  } catch (error) {
    console.error(error);
    res.render('login', { error: 'Erro interno do servidor' });
  }
});

// Logout
router.get('/logout', (req, res) => {
  req.session.destroy();
  res.redirect('/login');
});

module.exports = router;
