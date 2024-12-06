// Import required modules
const express = require('express');
const sql = require('mssql');
const cors = require('cors');

// Create an Express app, define a port, and use JSON middleware
const app = express();
const PORT = 3000;
app.use(express.json()); 

// Enable CORS
app.use(cors({
    origin: 'http://localhost:4200', 
    methods: ['GET', 'POST', 'PUT', 'DELETE'], // Allowed methods
    credentials: true, // Allow credentials (e.g., cookies)
}));

// Database configuration. Replace with your own.
const config = {
    user: '', 
    password: '',
    server: 'serenade.database.windows.net', 
    database: 'serenade',
    options: {
        encrypt: true, 
        trustServerCertificate: true, 
    },
    port: 1433,
};

// Connect to the database
sql.connect(config, (err) => {
    if (err) {
        console.error('Error connecting to the database:', err);
        return;
    }
    console.log('Connected to the database');
});

// Utility function to transform object keys to lowercase
function transformKeysToLowercase(obj) {
    const newObj = {};
    for (const key in obj) {
      if (obj.hasOwnProperty(key)) {
        newObj[key.toLowerCase()] = obj[key]; 
      }
    }
    return newObj;
  }

// Basic route
app.get('/', (req, res) => {
    res.send('Express server is running! Go to /composers to fetch all composers');
});

// Route to fetch all composers
app.get('/composers', async (req, res) => {
    try {
        // Query the database
        const result = await sql.query('SELECT * FROM Composers');

        // Transform all keys to lowercase keys
        const transformedComposers = result.recordset.map((composer) => transformKeysToLowercase(composer));

        // Send the transformed data as the response
        res.json(transformedComposers);
    } catch (error) {
        // Handle errors
        console.error('Error fetching composers:', error);
        res.status(500).send(`Internal server error: ${error.message}`);
    }
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
