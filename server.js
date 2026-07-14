const express = require('express');
const fs = require('fs');
const path = require('path');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;
const DATA_FILE = path.join(__dirname, 'data.json');

app.use(cors());
app.use(express.json({ limit: '10mb' }));
app.use(express.static(__dirname));

// Obtener datos
app.get('/api/data', (req, res) => {
  fs.readFile(DATA_FILE, 'utf8', (err, data) => {
    if (err) {
      if (err.code === 'ENOENT') {
        // Si no existe, retornar estructura vacía
        return res.json({ articles: [], links: [] });
      }
      return res.status(500).json({ error: 'Error al leer la base de datos local' });
    }
    try {
      res.json(JSON.parse(data));
    } catch (parseErr) {
      res.status(500).json({ error: 'Error al parsear el archivo JSON' });
    }
  });
});

// Guardar datos
app.post('/api/data', (req, res) => {
  const newData = req.body;
  if (!newData.articles || !newData.links) {
    return res.status(400).json({ error: 'Estructura de datos inválida' });
  }

  fs.writeFile(DATA_FILE, JSON.stringify(newData, null, 2), 'utf8', (err) => {
    if (err) {
      return res.status(500).json({ error: 'Error al escribir en la base de datos local' });
    }
    res.json({ success: true, message: 'Datos guardados correctamente' });
  });
});

// Recepción de contacto
app.post('/api/contacto', (req, res) => {
  const { nombre, email, mensaje } = req.body;
  console.log(`[Contacto recibido]: ${nombre} (${email}) - Mensaje: ${mensaje}`);
  
  // Guardamos localmente en un archivo de logs de contacto
  const contactFile = path.join(__dirname, 'mensajes_contacto.json');
  fs.readFile(contactFile, 'utf8', (err, data) => {
    let list = [];
    if (!err && data) {
      try { list = JSON.parse(data); } catch (e) {}
    }
    list.push({ nombre, email, mensaje, fecha: new Date().toISOString() });
    fs.writeFile(contactFile, JSON.stringify(list, null, 2), 'utf8', () => {
      res.json({ success: true, message: 'Mensaje recibido correctamente' });
    });
  });
});

app.listen(PORT, () => {
  console.log(`Servidor de la biblioteca de recursos corriendo en http://localhost:${PORT}`);
});
