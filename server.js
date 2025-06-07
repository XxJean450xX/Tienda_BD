const express = require('express');
const cors = require('cors');
const { Pool } = require('pg');

const app = express();
app.use(cors()); // permite peticiones desde el frontend
app.use(express.json());

const pool = new Pool({
  user: "postgres",         // <- reemplaza con tu usuario
  host: 'localhost',
  database: 'Tienda',
  password: 'password',  // <- reemplaza con tu contraseña
  port: 5432,
});

app.get('/productos', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM productos');
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).send('Error en el servidor');
  }
});

app.listen(3000, () => {
  console.log('Servidor corriendo en http://localhost:3000');
});
