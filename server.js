const express = require('express');
const path = require('path');
const morgan = require('morgan');
const session = require('express-session');
const sequelize = require('./config/database');
const app = express();

// Configurações
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'assets')));
app.use(morgan('dev'));
app.use(session({
  secret: 'secret-key',
  resave: false,
  saveUninitialized: false,
  cookie: { maxAge: 3600000 } // 1 hora
}));

// Rotas
const indexRoutes = require('./routes/index');
const taskRoutes = require('./routes/taskRoutes');
const userRoutes = require('./routes/userRoutes'); // Adicionando as rotas de usuário
const categoryRoutes = require('./routes/categoryRoutes'); // Adicionando as rotas de categoria

app.use('/', indexRoutes);
app.use('/api/tasks', taskRoutes);
app.use('/api/users', userRoutes); // Usando as rotas de usuário
app.use('/api/categories', categoryRoutes); // Usando as rotas de categoria

// Iniciar servidor
const PORT = process.env.PORT || 3000;

// Sincronizar modelos com o banco de dados
sequelize.sync({ alter: true })
  .then(() => {
    console.log('Banco de dados sincronizado');
    app.listen(PORT, () => {
      console.log(`Servidor rodando na porta ${PORT}`);
    });
  })
  .catch(err => {
    console.error('Erro ao sincronizar banco de dados:', err);
  });

module.exports = app;

  
