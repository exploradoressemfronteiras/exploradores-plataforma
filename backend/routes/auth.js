const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// simulação de "banco de dados" temporário
const users = []; // no futuro, use PostgreSQL via Sequelize

// REGISTRO
router.post('/register', async (req, res) => {
  const { nome, email, senha } = req.body;
  const usuarioExistente = users.find((u) => u.email === email);
  if (usuarioExistente) {
    return res.status(400).json({ error: 'Usuário já cadastrado' });
  }

  const senhaHash = await bcrypt.hash(senha, 10);
  const novoUsuario = { id: users.length + 1, nome, email, senha: senhaHash };
  users.push(novoUsuario);

  res.status(201).json({ message: 'Usuário registrado com sucesso' });
});

// LOGIN
router.post('/login', async (req, res) => {
  const { email, senha } = req.body;
  const usuario = users.find((u) => u.email === email);
  if (!usuario) {
    return res.status(400).json({ error: 'Usuário não encontrado' });
  }

  const senhaValida = await bcrypt.compare(senha, usuario.senha);
  if (!senhaValida) {
    return res.status(401).json({ error: 'Senha incorreta' });
  }

  const token = jwt.sign({ id: usuario.id, email: usuario.email }, 'secreta', {
    expiresIn: '1h',
  });

  res.json({ token });
});

module.exports = router;