const express = require('express');
const cors = require('cors');
const pool = require('./db');

const app = express();

//middleware
app.use(cors());
app.use(express.json()); //req.body

//routes//

//create
app.post('/pern', async (req, res) => {
  try {
    const { description } = req.body;
    console.log(description);
    const newData = await pool.query(
      'INSERT INTO pern_table (description) VALUES($1) RETURNING *',
      [description]
    );

    res.json(newData.rows[0]);
  } catch (error) {
    console.error(err.message);
  }
});

//get all
app.get('/pern', async (req, res) => {
  try {
    const data = await pool.query('SELECT * from pern_table');
    res.json(data.rows);
  } catch (error) {
    console.error(err.message);
  }
});

//get one
app.get('/pern/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const data = await pool.query(
      'SELECT * from pern_table where pern_id = $1',
      [id]
    );
    res.json(data.rows[0]);
  } catch (error) {
    console.error(err.message);
  }
});

//delete
app.delete('/pern/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const data = await pool.query('DELETE from pern_table where pern_id =$1', [
      id
    ]);

    res.json(data.rows[0]);
  } catch (error) {
    console.error(err.message);
  }
});

//update
app.put('/pern/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { description } = req.body;
    const updatedData = await pool.query(
      'UPDATE pern_table SET description = $1 where pern_id = $2',
      [description, id]
    );

    res.json(updatedData.rows);
  } catch (error) {
    console.error(err.message);
  }
});

app.listen(5000, () => console.log('server has started on port 5000"'));
