
-- Tabela de usuários
CREATE TABLE usuarios (
    id SERIAL PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    senha VARCHAR(255) NOT NULL,
    criado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tabela de categorias de tarefas
CREATE TABLE categorias (
    id SERIAL PRIMARY KEY,
    usuario_id INTEGER REFERENCES usuarios(id),
    nome VARCHAR(50) NOT NULL,
    cor VARCHAR(7) DEFAULT '#FFFFFF' -- cor em formato hexadecimal
);

-- Tabela de tarefas
CREATE TABLE tarefas (
    id SERIAL PRIMARY KEY,
    usuario_id INTEGER REFERENCES usuarios(id),
    categoria_id INTEGER REFERENCES categorias(id),
    titulo VARCHAR(100) NOT NULL,
    descricao TEXT,
    data_entrega DATE,
    prioridade VARCHAR(10) CHECK (prioridade IN ('baixa', 'média', 'alta')),
    status VARCHAR(15) CHECK (status IN ('pendente', 'em andamento', 'concluída')) DEFAULT 'pendente',
    criado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
