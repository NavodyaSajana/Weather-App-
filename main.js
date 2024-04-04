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

app.get('/weather', async (req, res) => {
  try {
    // Connect to the database
    await sql.connect(config);

    // Query to select all data from the weather table
    const result = await sql.query`SELECT * FROM weather`;

    // Close the database connection
    await sql.close();

    // Send the data as JSON in the response
    res.json(result.recordset);
  } catch (error) {
    console.error('Error fetching data:', error.message);
    res.status(500).send('Internal Server Error');
  }
});

app.get('/', (req, res) => {
  res.send('Hello, World!');
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});