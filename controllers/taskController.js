// controllers/TarefaController.js
const pool = require('../config/database');

// Criar uma nova tarefa
exports.criarTarefa = async (req, res) => {
  const { nome, descricao } = req.body;

  const query = 'INSERT INTO tarefas (nome, descricao) VALUES ($1, $2) RETURNING *';
  const values = [nome, descricao];

  try {
    const result = await pool.query(query, values);
    const tarefa = result.rows[0];
    res.status(201).json(tarefa);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Listar todas as tarefas
exports.listarTarefas = async (req, res) => {
  const query = 'SELECT * FROM tarefas';

  try {
    const result = await pool.query(query);
    res.status(200).json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Editar uma tarefa
exports.editarTarefa = async (req, res) => {
  const { id } = req.params;
  const { nome, descricao, status } = req.body;

  const query = `
    UPDATE tarefas SET nome = $1, descricao = $2, status = $3, updated_at = CURRENT_TIMESTAMP
    WHERE id = $4 RETURNING *`;
  const values = [nome, descricao, status, id];

  try {
    const result = await pool.query(query, values);
    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Tarefa não encontrada' });
    }
    res.status(200).json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Excluir uma tarefa
exports.excluirTarefa = async (req, res) => {
  const { id } = req.params;

  const query = 'DELETE FROM tarefas WHERE id = $1 RETURNING *';
  const values = [id];

  try {
    const result = await pool.query(query, values);
    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Tarefa não encontrada' });
    }
    res.status(200).json({ message: 'Tarefa excluída com sucesso' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
const { Task, Category, User } = require('../models');

// Obter todas as tarefas
exports.getAllTasks = async (req, res) => {
  try {
    const tasks = await Task.findAll({
      include: [
        { model: Category },
        { model: User, attributes: { exclude: ['password'] } }
      ]
    });
    res.json(tasks);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erro ao buscar tarefas' });
  }
};

// Obter tarefa por ID
exports.getTaskById = async (req, res) => {
  try {
    const task = await Task.findByPk(req.params.id, {
      include: [
        { model: Category },
        { model: User, attributes: { exclude: ['password'] } }
      ]
    });
    
    if (!task) {
      return res.status(404).json({ message: 'Tarefa não encontrada' });
    }
    
    res.json(task);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erro ao buscar tarefa' });
  }
};

// Criar nova tarefa
exports.createTask = async (req, res) => {
  try {
    const { title, description, category_id, priority, due_date } = req.body;
    
    // Verificar se a categoria existe
    const category = await Category.findByPk(category_id);
    if (!category) {
      return res.status(400).json({ message: 'Categoria não encontrada' });
    }
    
    const task = await Task.create({
      title,
      description,
      category_id,
      priority,
      due_date,
      user_id: req.session?.userId || 1 // Usar usuário da sessão ou padrão
    });
    
    // Buscar a tarefa criada com relacionamentos
    const createdTask = await Task.findByPk(task.id, {
      include: [
        { model: Category },
        { model: User, attributes: { exclude: ['password'] } }
      ]
    });
    
    res.status(201).json(createdTask);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erro ao criar tarefa' });
  }
};

// Atualizar tarefa
exports.updateTask = async (req, res) => {
  try {
    const { title, description, category_id, priority, due_date, status } = req.body;
    const taskId = req.params.id;
    
    const task = await Task.findByPk(taskId);
    
    if (!task) {
      return res.status(404).json({ message: 'Tarefa não encontrada' });
    }
    
    // Verificar se a categoria existe (se fornecida)
    if (category_id) {
      const category = await Category.findByPk(category_id);
      if (!category) {
        return res.status(400).json({ message: 'Categoria não encontrada' });
      }
    }
    
    // Atualizar campos
    if (title) task.title = title;
    if (description !== undefined) task.description = description;
    if (category_id) task.category_id = category_id;
    if (priority) task.priority = priority;
    if (due_date) task.due_date = due_date;
    if (status) task.status = status;
    
    await task.save();
    
    // Buscar a tarefa atualizada com relacionamentos
    const updatedTask = await Task.findByPk(task.id, {
      include: [
        { model: Category },
        { model: User, attributes: { exclude: ['password'] } }
      ]
    });
    
    res.json(updatedTask);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erro ao atualizar tarefa' });
  }
};

// Atualizar status da tarefa
exports.updateTaskStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const taskId = req.params.id;
    
    const task = await Task.findByPk(taskId);
    
    if (!task) {
      return res.status(404).json({ message: 'Tarefa não encontrada' });
    }
    
    task.status = status;
    await task.save();
    
    res.json({ message: 'Status atualizado com sucesso', task });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erro ao atualizar status' });
  }
};

// Excluir tarefa
exports.deleteTask = async (req, res) => {
  try {
    const taskId = req.params.id;
    
    const task = await Task.findByPk(taskId);
    
    if (!task) {
      return res.status(404).json({ message: 'Tarefa não encontrada' });
    }
    
    await task.destroy();
    
    res.json({ message: 'Tarefa excluída com sucesso' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erro ao excluir tarefa' });
  }
};