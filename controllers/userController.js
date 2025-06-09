const { User } = require('../models');

// Obter todos os usuários
exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.findAll({
      attributes: { exclude: ['password'] }
    });
    res.json(users);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erro ao buscar usuários' });
  }
};

// Obter usuário por ID
exports.getUserById = async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id, {
      attributes: { exclude: ['password'] }
    });
    
    if (!user) {
      return res.status(404).json({ message: 'Usuário não encontrado' });
    }
    
    res.json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erro ao buscar usuário' });
  }
};

// Criar novo usuário
exports.createUser = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;
    
    // Verificar se o email já existe
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ message: 'Email já cadastrado' });
    }
    
    const user = await User.create({
      name,
      email,
      password,
      role
    });
    
    // Não retornar a senha
    const userResponse = {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
      active: user.active,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt
    };
    
    res.status(201).json(userResponse);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erro ao criar usuário' });
  }
};

// Atualizar usuário
exports.updateUser = async (req, res) => {
  try {
    const { name, email, password, role, active } = req.body;
    const userId = req.params.id;
    
    const user = await User.findByPk(userId);
    
    if (!user) {
      return res.status(404).json({ message: 'Usuário não encontrado' });
    }
    
    // Verificar se o email já existe (se estiver sendo alterado)
    if (email && email !== user.email) {
      const existingUser = await User.findOne({ where: { email } });
      if (existingUser) {
        return res.status(400).json({ message: 'Email já cadastrado' });
      }
    }
    
    // Atualizar campos
    if (name) user.name = name;
    if (email) user.email = email;
    if (password) user.password = password;
    if (role) user.role = role;
    if (active !== undefined) user.active = active;
    
    await user.save();
    
    // Não retornar a senha
    const userResponse = {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
      active: user.active,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt
    };
    
    res.json(userResponse);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erro ao atualizar usuário' });
  }
};

// Excluir usuário
exports.deleteUser = async (req, res) => {
  try {
    const userId = req.params.id;
    
    const user = await User.findByPk(userId);
    
    if (!user) {
      return res.status(404).json({ message: 'Usuário não encontrado' });
    }
    
    await user.destroy();
    
    res.json({ message: 'Usuário excluído com sucesso' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erro ao excluir usuário' });
  }
};
