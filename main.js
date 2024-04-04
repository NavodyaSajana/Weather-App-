const express = require('express');
const sql = require('mssql');

const app = express();

const config = {
  user: 'sjnadmin',
  password: 'Sjn@admin123',
  server: 'sjnweathersrilanka.database.windows.net',
  database: 'Weather_db',
  options: {
    encrypt: true
  }
};

const port = process.env.PORT || 3000;

sql.connect(config)
.then(pool => {
  console.log('Connected to Azure SQL DB');
})
.catch(err => {
  console.error('Database connection failed: ',err);
});

app.get('/', (req, res) => {
  res.send('Hello, World!');
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});