const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const authRoutes = require('./routes/auth'); // <- arquivo com as rotas

const app = express();
const PORT = 5000;

app.use(cors());
app.use(bodyParser.json());

// Supondo que suas rotas de login/register estão aqui:
app.use('/api/auth', authRoutes);

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
