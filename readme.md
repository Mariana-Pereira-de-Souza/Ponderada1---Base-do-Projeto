
# 📌 UniPlanner - Sistema de Planejamento Universitário

**UniPlanner** é um sistema web de gerenciamento de tarefas desenvolvido para auxiliar estudantes universitários na organização de suas rotinas acadêmicas e pessoais. O projeto faz parte de uma atividade prática da faculdade e integra frontend, backend e banco de dados em uma única aplicação.

###  Vídeo UniPlanner:[ Assista ao vídeo da Uniplanner](https://youtu.be/g7ld8BgNTZY?si=xbbcOQ--mjgr7JLc)
---

## 💡 Descrição do sistema

O sistema escolhido é um **Gerenciador de Tarefas**, com foco em:

- **Gerenciamento de Tarefas**: Criar, editar, excluir e marcar tarefas como concluídas
- **Categorização**: Organizar tarefas por categorias personalizáveis com cores
- **Priorização**: Definir níveis de prioridade (baixa, média, alta) para as tarefas
- **Filtragem Avançada**: Filtrar tarefas por status, categoria e termo de busca
- **Gerenciamento de Usuários**: Sistema completo de autenticação e gerenciamento de usuários
- **Controle de Acesso**: Diferentes níveis de permissão (administrador e usuário comum)
- **Interface Responsiva**: Design adaptável para desktop e dispositivos móveis
- **Acompanhamento de Status**: Pendente, em andamento, concluída
- **Visualização por Data**: Organização temporal das tarefas
- **Interface Simples e Intuitiva**: Pensada para uso acadêmico e pessoal

O UniPlanner é ideal para quem busca aumentar a produtividade com um sistema leve e objetivo, preparado para integração com lembretes e relatórios de produtividade.

---

## 🛠️ Tecnologias Utilizadas

- **Backend**: Node.js, Express
- **Frontend**: EJS, CSS, JavaScript
- **Banco de Dados**: PostgreSQL
- **ORM**: Sequelize
- **Autenticação**: Express-session, Bcrypt
- **Outras**: Git, GitHub, HTML5

---

## 📁 Estrutura de Pastas

```plaintext
uniplanner/
│
├── assets/                  # Arquivos estáticos (CSS, JS, imagens)
│   ├── css/
│   │   └── styles.css       # Estilos da aplicação
│   └── js/
│       ├── tasks.js         # JavaScript para gerenciamento de tarefas
│       ├── users.js         # JavaScript para gerenciamento de usuários
│       ├── categories.js    # JavaScript para gerenciamento de categorias
│       └── main.js          # JavaScript global
│
├── config/                  # Arquivos de configuração
│   └── database.js          # Configuração do banco de dados
│
├── controllers/             # Lógica de controle das requisições
│   ├── taskController.js    # Controlador de tarefas
│   ├── userController.js    # Controlador de usuários
│   └── categoryController.js # Controlador de categorias
│
├── models/                  # Definição de modelos de dados (estrutura do banco)
│   ├── Task.js              # Modelo de tarefa
│   ├── User.js              # Modelo de usuário
│   ├── Category.js          # Modelo de categoria
│   └── index.js             # Configuração de relacionamentos
│
├── routes/                  # Definição das rotas do sistema
│   ├── index.js             # Rotas principais (páginas)
│   ├── taskRoutes.js        # Rotas de API para tarefas
│   ├── userRoutes.js        # Rotas de API para usuários
│   └── categoryRoutes.js    # Rotas de API para categorias
│
├── scripts/                 # Scripts utilitários
│   └── seed.js              # Script para popular o banco de dados
│
├── views/                   # Templates EJS
│   ├── index.ejs            # Página principal (tarefas)
│   ├── login.ejs            # Página de login
│   ├── users/
│   │   └── index.ejs        # Página de usuários
│   └── categories/
│       └── index.ejs        # Página de categorias
│
├── tests/                   # Arquivos de testes unitários
│   └── example.test.js
│
├── .gitignore               # Arquivo para ignorar arquivos no Git
├── .env.example             # Exemplo de variáveis de ambiente
├── jest.config.js           # Configuração de testes com Jest
├── package-lock.json        # Gerenciador de dependências
├── package.json             # Definições de dependências e scripts
├── README.md                # Este documento
├── schema.sql               # Modelo físico do banco de dados (.sql)
├── server.js                # Arquivo principal do servidor
└── rest.http                # Arquivo opcional para testes de requisições HTTP
```

---

## ▶️ Como executar o projeto localmente

### Pré-requisitos

- Node.js (v14+)
- PostgreSQL
- npm

### 1. Clone o repositório

```bash
git clone https://github.com/Mariana-Pereira-de-Souza/Ponderada1---Base-do-Projeto.git
cd uniplanner
```

### 2. Instale as dependências

```bash
npm install
```

### 3. Configure as variáveis de ambiente

Crie um arquivo `.env` baseado em `.env.example` e preencha com suas credenciais:

```ini
DB_NAME=uniplanner
DB_USER=seu_usuario_postgres
DB_PASSWORD=sua_senha_postgres
DB_HOST=localhost
DB_PORT=5432
```
Também vá até `models/index.js` edite a linha 3 e preencha com suas credenciais:
```ini
const sequelize = new Sequelize('uniplanner(se esse for o nome do seu banco de dados)', 'postgres(usuário padrão)', 'sua-senha',
```

### 4. Configure o banco de dados

Crie o banco de dados no PostgreSQL:

```sql
CREATE DATABASE uniplanner;
```

### 5. Popular o banco de dados

```bash
npm run seed
```

### 6. Inicie o servidor

```bash
npm start
```

A aplicação estará disponível em:  
👉 [http://localhost:3000](http://localhost:3000)

### Credenciais de acesso

- **Administrador**:
  - Email: admin@uniplanner.com
  - Senha: admin123

- **Usuário comum**:
  - Email: mari@uniplanner.com
  - Senha: user123

---

## 🔒 Funcionalidades por Tipo de Usuário

### 👨‍💼 Administrador
- Gerenciar todos os usuários do sistema
- Criar, editar e excluir usuários
- Gerenciar todas as categorias
- Gerenciar suas próprias tarefas
- Acesso completo ao sistema

### 👤 Usuário Comum
- Gerenciar suas próprias tarefas (criar, editar, excluir, marcar como concluída)
- Visualizar e usar categorias existentes
- Filtrar e buscar suas tarefas
- Definir prioridades e datas de vencimento

---

## 📚 Funcionalidades Detalhadas

### Gerenciamento de Tarefas
- ✅ Criar novas tarefas com título, descrição, categoria, prioridade e data de vencimento
- ✅ Editar informações de tarefas existentes
- ✅ Marcar tarefas como concluídas ou pendentes
- ✅ Excluir tarefas desnecessárias
- ✅ Filtrar tarefas por status (pendente/concluída)
- ✅ Filtrar tarefas por categoria
- ✅ Buscar tarefas por título ou descrição

### Gerenciamento de Categorias
- ✅ Criar categorias personalizadas
- ✅ Definir cores para cada categoria
- ✅ Editar informações das categorias
- ✅ Excluir categorias não utilizadas

### Sistema de Autenticação
- ✅ Login seguro com email e senha
- ✅ Senhas criptografadas com bcrypt
- ✅ Controle de sessão
- ✅ Logout seguro

### Interface do Usuário
- ✅ Design responsivo para todos os dispositivos
- ✅ Interface intuitiva e fácil de usar
- ✅ Modais para criação e edição
- ✅ Feedback visual para ações do usuário

---

## 🧪 Scripts Disponíveis

```bash
# Iniciar o servidor em modo de produção
npm start

# Iniciar o servidor em modo de desenvolvimento (com nodemon)
npm run dev

# Popular o banco de dados com dados iniciais
npm run seed

# Executar testes
npm test
```

---

## 🤝 Contribuição

1. Faça um fork do projeto
2. Crie uma branch para sua feature (`git checkout -b feature/nova-funcionalidade`)
3. Faça commit das suas alterações (`git commit -m 'Adiciona nova funcionalidade'`)
4. Faça push para a branch (`git push origin feature/nova-funcionalidade`)
5. Abra um Pull Request

---

## 📌 Licença

Este projeto está licenciado sob a MIT License.

---

