const connection = require('../database'); // Import database connection

// Login logic for customers
exports.login = (req, res) => {
  console.log('Login request received for customer'); // Debug log
  const { email, password } = req.body; // Only get email and password for customer login
  console.log(`Received email: ${email}, password: ${password}`); // Debug log

  if (!email || !password) {
    console.log('Missing email or password'); // Debug log
    return res.status(400).json({ message: 'Please provide email and password' });
  }

  // Query to check customer credentials
  connection.query(
    'SELECT * FROM Customers WHERE email = ? AND password = ?',
    [email, password],
    (err, results) => {
      if (err) {
        console.error('Database error:', err); // Debug log
        return res.status(500).json({ message: 'Internal server error' });
      }

      console.log('Query result:', results); // Debug log
      if (results.length > 0) {
        console.log('Customer login successful'); // Debug log
        res.status(200).json({ message: 'Customer login successful' });
      } else {
        console.log('Invalid email or password'); // Debug log
        res.status(401).json({ message: 'Invalid email or password' });
      }
    }
  );
};

// Admin login logic
exports.adminLogin = (req, res) => {
  console.log('Login request received for admin'); // Debug log
  const { email, password } = req.body; // No userType needed for this method
  console.log(`Received email: ${email}, password: ${password}`); // Debug log

  if (!email || !password) {
    console.log('Missing email or password'); // Debug log
    return res.status(400).json({ message: 'Please provide email and password' });
  }

  // Query to check admin credentials
  console.log('Starting query...');
connection.query(
  'SELECT * FROM Admins WHERE email = ? AND password = ?',
  [email, password],
  (err, results) => {
    console.log('Query executed'); // Add this to see if the query is even reaching here
    if (err) {
      console.error('Database error:', err);
      return res.status(500).json({ message: 'Internal server error' });
    }
    console.log('Query result:', results);
    if (results.length > 0) {
      res.status(200).json({ message: 'Customer login successful' });
    } else {
      res.status(401).json({ message: 'Invalid email or password' });
    }
  }
);
};

