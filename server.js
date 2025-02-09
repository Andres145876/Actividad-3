const express = require('express');
const fs = requier("fs/promises");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;
const secret_key = "secreto seguro";

app.use(bodyParser.json());

//Middeleware
const authMiddleware = async (req, res, next) => {
  const token = req.headers ("authorization");
  if (!token) 
    return res.status(401).send({mensaje: "No tienes autorización"});
  
try {
  const verificado = jwt.verify(token.replace("bearer ",""), secret_key);
  req.user = verificado;
  next();
  } catch (error) {
  res.status(400).json({mensaje: "Token inválido"});
}
}



//Rutas
app.post('/register', async (req, res)=>{
  const{username, password} = req.body;
  const user = json.parse(await fs.readfile('./usuarios.json', 'utf-8'));
  if (user.find(user => user.username ===username)){
    return res,status(400).json({mensaje: "Usuario no encontrado"});
  }
const hashedPassword = await bcrypt.hash(password, 10);
user.push({username, password: hashedPassword});
await fs.writefile('./usuarios.json', JSON.stringify(user));
res.json({mensaje: "Usuario creado"});
})


app.post('/login', async (req, res)=>{
const {username, password} =req.body;
const users = json.parse(await fs.readfile('./usuarios.json', 'utf-8'));
const user = user.find(user => user.username === username);
if (!user || !await bcrypt.compare(password, user.password)){
  return res.status(400).json({mensaje: "Usuario o contraseña incorrectos"});
}
const token = jwt.sign({username}, secret_key);
});


//ruta tareas
app.get('/tareas', authMiddleware, async (req, res)=>{
  const tareas = json.parse(await fs.readfile('./tareas.json', 'utf-8'));
  res.json(tareas);
});


app.post('/tareas', authMiddleware, async (req, res)=>{
  const {titulo, descripcion} = req.body;
  const tareas = json.parse(await fs.readfile('./tareas.json', 'utf-8'));
  const nuevaTarea = {id: Date.now(), titulo, descripcion};
  tareas.push(nuevaTarea);
  await fs.wirotefile('./tareas.json', JSON.stringify(tareas));
  res.json(nuevaTarea);
});


app.put('/tareas/:id', authMiddleware, async (req, res)=>{
  const {id} =req.params;
  const {titulo, descripcion} = req.body; 
  let tareas = json.parse(await fs.readfile('./tareas.json', 'utf-8'));
  tareas = tareas.mao(t => t.id == id ? {...t, titulo, descripcion}:t);
  await fs.writefile('./tareas.json', json.stringify(tareas));
  res.json({mensaje: "tarea actualizada"});
});


app.delete('/tareas/:id', authMiddleware, async (req, res)=>{
  const {id} = req.params;
  let tareas = json.parse(await fs.readfile('./tareas.json', 'utf-8'));
  tareas = tareas.filter(t => t.id != id);
  await fs.writefile('./tareas.json', json.stringify(tareas));
  res.json({mensaje: "tarea eliminada"});
});


//servidor es
app.listen(port, () =>{
  console.log(`servidor corriendo en el puerto ${port}`);
});