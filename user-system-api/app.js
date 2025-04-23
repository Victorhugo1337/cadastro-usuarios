
const express = require('express');
const app = express();
const cors = require('cors');

app.use(cors());
app.use(express.json());

let usuarios = [];
let idCounter = 1;

app.get('/usuarios', (req, res) => {
    res.json(usuarios);
});

app.post('/usuarios', (req, res) => {
    const { nome, email } = req.body;
    const novoUsuario = { id: idCounter++, nome, email };
    usuarios.push(novoUsuario);
    res.status(201).json(novoUsuario);
});

app.put('/usuarios/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const { nome, email } = req.body;
    const index = usuarios.findIndex(u => u.id === id);
    if (index === -1) return res.status(404).json({ erro: 'Usuário não encontrado' });
    usuarios[index] = { id, nome, email };
    res.json(usuarios[index]);
});

app.delete('/usuarios/:id', (req, res) => {
    const id = parseInt(req.params.id);
    usuarios = usuarios.filter(u => u.id !== id);
    res.status(204).send();
});

app.listen(3000, () => console.log('API rodando em http://localhost:3000'));
