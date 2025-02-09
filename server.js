const express = require('express');
const router = express.Router();
const fs = require('fs').promises;

router.get('/tareas', async (req, res) => {
    const data = await fs.readFile('tareas.json', 'utf8');
    res.json(JSON.parse(data));
});

app.post('/tareas', async (req, res) => {
    const nuevaTarea = req.body;
    let tareas = JSON.parse(await fs.readFile('tareas.json', 'utf8'));
    tareas.push(nuevaTarea);
    await fs.writeFile('tareas.json', JSON.stringify(tareas));
    res.status(201).send('Tarea creada');
});

module.exports = router;