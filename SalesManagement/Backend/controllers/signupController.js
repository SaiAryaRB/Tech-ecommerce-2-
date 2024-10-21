const connection = require('../database'); // Import database connection
// Customer signup logic
exports.signup = (req, res) => {
  console.log('Signup request received for customer'); // Debug log
  const { firstName, lastName, email, houseNumber, streetName, pincode, city, password, phoneNumbers } = req.body;

  console.log(`Received data: ${JSON.stringify(req.body)}`); // Debug log

  if (!firstName || !lastName || !email || !houseNumber || !streetName || !pincode || !city || !password) {
    console.log('Missing required fields'); // Debug log
    return res.status(400).json({ message: 'Please provide all required fields' });
  }

  // Call the stored procedure for signup
  connection.query(
    'CALL SignUp(?, ?, ?, ?, ?, ?, ?, ?, ?)',
    [firstName, lastName, email, houseNumber, streetName, pincode, city, password, phoneNumbers],
    (err, results) => {
      if (err) {
        console.error('Database error during signup:', err); // Debug log
        return res.status(500).json({ message: 'Internal server error' });
      }

      console.log('Signup successful:', results); // Debug log
      res.status(201).json({ message: 'Signup successful' });
    }
  );
};
