const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const bodyParser = require('body-parser');
const path = require('path');
const cors = require('cors');

const app = express();
const db = new sqlite3.Database('database.db');

app.use(cors());
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));

// Criação das tabelas
db.serialize(() => {
  // Apaga a tabela usuarios (apenas para desenvolvimento, cuidado!)
  db.run(`DROP TABLE IF EXISTS usuarios`);

  // Cria tabela usuarios com nome e apelido únicos (case insensitive)
  db.run(`
    CREATE TABLE IF NOT EXISTS usuarios (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      nome TEXT NOT NULL,
      apelido TEXT NOT NULL,
      UNIQUE(nome COLLATE NOCASE, apelido COLLATE NOCASE)
    )
  `);

  // Cria tabela pontuacoes para ranking
  db.run(`
    CREATE TABLE IF NOT EXISTS pontuacoes (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      usuario_id INTEGER NOT NULL,
      pontos INTEGER NOT NULL,
      data DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY(usuario_id) REFERENCES usuarios(id)
    )
  `);
});

// Rota login: busca pelo nome+apelido, se não existir cadastra
app.post('/login', (req, res) => {
  const { nome, apelido } = req.body;

  if (!nome || !apelido) {
    return res.status(400).json({ mensagem: 'Nome e apelido são obrigatórios.' });
  }

  const querySelect = `SELECT id FROM usuarios WHERE nome = ? COLLATE NOCASE AND apelido = ? COLLATE NOCASE`;
  db.get(querySelect, [nome, apelido], (err, row) => {
    if (err) {
      return res.status(500).json({ mensagem: 'Erro no banco de dados.' });
    }

    if (row) {
      res.json({ mensagem: 'Usuário encontrado.', usuarioId: row.id });
    } else {
      const queryInsert = `INSERT INTO usuarios (nome, apelido) VALUES (?, ?)`;
      db.run(queryInsert, [nome, apelido], function(err) {
        if (err) {
          return res.status(500).json({ mensagem: 'Erro ao cadastrar usuário.' });
        }
        res.json({ mensagem: 'Usuário cadastrado.', usuarioId: this.lastID });
      });
    }
  });
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
app.post('/pontuacao', (req, res) => {
  const { usuarioId, pontos } = req.body;
  if (!usuarioId || pontos == null) {
    return res.status(400).json({ mensagem: 'Usuário e pontos são obrigatórios.' });
  }

  db.run(`INSERT INTO pontuacoes (usuario_id, pontos) VALUES (?, ?)`, [usuarioId, pontos], function(err) {
    if (err) {
      return res.status(500).json({ mensagem: 'Erro ao salvar pontuação.' });
    }
    res.json({ mensagem: 'Pontuação salva com sucesso.', pontuacaoId: this.lastID });
  });
});
