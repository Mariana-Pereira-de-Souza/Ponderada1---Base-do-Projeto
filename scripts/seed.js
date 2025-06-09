const { User, Category, Task } = require('../models');
const sequelize = require('../config/database');

async function seedDatabase() {
  try {
    // Sincronizar modelos
    await sequelize.sync({ force: true });
    
    // Criar usuário admin
   const adminUser = await User.create({
  name: 'Administrador',
  email: 'admin@uniplanner.com', // Alterar de "admin@taskmanager.com"
  password: 'admin123',
  role: 'admin'
});

const regularUser = await User.create({
  name: 'Mari Souza',
  email: 'mari@uniplanner.com', // Alterar de "joao@taskmanager.com"
  password: 'user123',
  role: 'user'
});
    
    // Criar categorias
    const categories = await Category.bulkCreate([
      {
        name: 'Trabalho',
        color: '#3498db',
        description: 'Tarefas relacionadas ao trabalho'
      },
      {
        name: 'Pessoal',
        color: '#2ecc71',
        description: 'Tarefas pessoais'
      },
      {
        name: 'Estudos',
        color: '#9b59b6',
        description: 'Tarefas de estudo e aprendizado'
      },
      {
        name: 'Urgente',
        color: '#e74c3c',
        description: 'Tarefas urgentes'
      }
    ]);
    
    // Criar tarefas de exemplo
    await Task.bulkCreate([
      {
        title: 'Finalizar relatório mensal',
        description: 'Completar o relatório de vendas do mês',
        status: 'pending',
        priority: 'high',
        due_date: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 dias
        user_id: adminUser.id,
        category_id: categories[0].id
      },
      {
        title: 'Comprar mantimentos',
        description: 'Ir ao supermercado comprar itens da lista',
        status: 'pending',
        priority: 'medium',
        due_date: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000), // 2 dias
        user_id: regularUser.id,
        category_id: categories[1].id
      },
      {
        title: 'Estudar JavaScript',
        description: 'Revisar conceitos de async/await',
        status: 'completed',
        priority: 'medium',
        due_date: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000), // 1 dia atrás
        user_id: regularUser.id,
        category_id: categories[2].id
      },
      {
        title: 'Reunião com cliente',
        description: 'Apresentar proposta do novo projeto',
        status: 'pending',
        priority: 'high',
        due_date: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000), // 1 dia
        user_id: adminUser.id,
        category_id: categories[3].id
      }
    ]);
    
    console.log('Banco de dados populado com sucesso!');
console.log('Usuários criados:');
console.log('- Admin: admin@uniplanner.com / admin123'); 
console.log('- Usuário: mari@uniplanner.com / user123');
    
  } catch (error) {
    console.error('Erro ao popular banco de dados:', error);
  } finally {
    await sequelize.close();
  }
}

// Executar se chamado diretamente
if (require.main === module) {
  seedDatabase();
}

module.exports = seedDatabase;