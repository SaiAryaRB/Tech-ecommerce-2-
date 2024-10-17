const mysql = require('mysql2');

// Create a direct connection to the database
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'Nightfall_105',
  database: 'salesmanagement'
});

// Connect to the database
connection.connect((err) => {
  if (err) {
    console.error('Error connecting to the database:', err);
  } else {
    console.log('Connected to the database successfully');
  }
});


// Export the connection for use in other parts of the application
module.exports = connection;
