
# 📌 UniPlanner

**UniPlanner** é um sistema web de gerenciamento de tarefas desenvolvido para auxiliar estudantes universitários na organização de suas rotinas acadêmicas e pessoais. O projeto faz parte de uma atividade prática da faculdade e integra frontend, backend e banco de dados em uma única aplicação.

---

## 💡 Descrição do sistema

O sistema escolhido é um **Gerenciador de Tarefas**, com foco em:

- Cadastro e organização de tarefas por categoria
- Acompanhamento de status (pendente, em andamento, concluída)
- Priorização e visualização por data
- Interface simples e intuitiva
- Estrutura preparada para integração com lembretes e relatórios de produtividade

O UniPlanner é ideal para quem busca aumentar a produtividade com um sistema leve e objetivo, pensado para uso acadêmico e pessoal.

---

## 📁 Estrutura de Pastas

```plaintext
meu-projeto/
│
├── config/                # Arquivos de configuração (ex: conexão com banco)
│   └── database.js
├── controllers/           # Lógica de controle das requisições
│   └── HomeController.js
├── models/                # Definição de modelos de dados (estrutura do banco)
│   └── User.js
├── routes/                # Definição das rotas do sistema
│   └── index.js
├── services/              # Serviços auxiliares do sistema
│   └── userService.js
├── assets/                # Arquivos públicos como imagens e fontes
│   └── modelo-banco.png   # Diagrama do modelo relacional
├── scripts/               # Arquivos de JavaScript públicos
├── styles/                # Arquivos CSS públicos
├── tests/                 # Arquivos de testes unitários
│   └── example.test.js
├── .gitignore             # Arquivo para ignorar arquivos no Git
├── .env.example           # Exemplo de variáveis de ambiente
├── jest.config.js         # Configuração de testes com Jest
├── package-lock.json      # Gerenciador de dependências
├── package.json           # Definições de dependências e scripts
├── readme.md              # Este documento
├── schema.sql             # Modelo físico do banco de dados (.sql)
├── server.js              # Inicialização do servidor
└── rest.http              # Arquivo opcional para testes de requisições HTTP

```

## ▶️ Como executar o projeto localmente

### 1. Clone o repositório

```bash

git clone https://github.com/seu-usuario/seu-repositorio.git
cd seu-repositorio

```
▶️ Como executar o projeto localmente

1. Clone o repositório

    ```bash
    git clone https://github.com/seu-usuario/seu-repositorio.git
    cd seu-repositorio
    ```

2. Instale as dependências

    ```bash
    npm install
    ```

3. Configure as variáveis de ambiente

    Crie um arquivo `.env` baseado em `.env.example` e preencha com suas credenciais:

    ```ini
    DB_HOST=localhost
    DB_USER=root
    DB_PASSWORD=sua_senha
    DB_NAME=uniplanner
    ```

4. Importe o banco de dados

    No seu SGBD (como MySQL ou MariaDB), execute o conteúdo do arquivo `schema.sql` localizado na raiz do projeto.

5. Inicie o servidor

    ```bash
    npm start
    ```

    A aplicação estará disponível em:  
    👉 [http://localhost:3000](http://localhost:3000)

---

🛠 **Tecnologias utilizadas**

- Node.js
- Express
- MySQL
- HTML, CSS, JavaScript
- Git e GitHub

---

📌 **Licença**

Este projeto está licenciado sob a MIT License.

