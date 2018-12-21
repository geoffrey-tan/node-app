if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}

const express = require('express')
const app = express();
let port = process.env.PORT;

if (port == null || port == "") { // Changes port to 8000 when opened locally
  port = 8000;
}

/* -- MYSQL -- */
var mysql = require('mysql');
var myConnection = require('express-myconnection');
var dbOptions = {
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  port: 3306,
  database: 'db_test'
};

app.use(myConnection(mysql, dbOptions, 'single'));

/* -- Routes -- */
app.get('/', (req, res) => {
  res.send('Hello World! ' + process.env.DB_USER);
});

app.get('/login', (req, res) => {
  res.send('Login page');
});

/* -- Port -- */
app.listen(port, () => {
  console.log('App listening on port ' + port);
});