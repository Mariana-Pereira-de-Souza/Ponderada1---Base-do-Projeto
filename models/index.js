const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('uniplanner', 'postgres', '12345678910', {
  host: 'localhost',
  dialect: 'postgres',
});

const User = require('./User');
const Task = require('./Task');        // Corrigir esse caminho se estiver errado
const Category = require('./Category'); // Certifique-se de que este arquivo exista

// Associações
User.hasMany(Task, { foreignKey: 'user_id' });
Task.belongsTo(User, { foreignKey: 'user_id' });

Category.hasMany(Task, { foreignKey: 'category_id' });
Task.belongsTo(Category, { foreignKey: 'category_id' });

module.exports = {
  sequelize,
  User,
  Task,
  Category,
};
