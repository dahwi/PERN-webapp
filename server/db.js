const Pool = require('pg').Pool;

const pool = new Pool({
  user: 'username',
  password: 'password',
  host: 'localhost',
  por: 5432,
  database: 'pern'
});

module.exports = pool;
