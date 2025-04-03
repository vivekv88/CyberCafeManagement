/*
// db.js
const mysql = require('mysql2');

// Create a MySQL connection pool
const pool = mysql.createPool({
    host: 'localhost',         // Replace with your database host
    user: 'root',              // Replace with your database username
    password: 'Vivek@8874',  // Replace with your database password
    database: 'CyberCafeManagement', // Replace with your database name
    port: 3306                 // Default MySQL port
});

// Export a promise-based connection
const promisePool = pool.promise();
module.exports = promisePool;


// Function to fetch tables from the database
const getTables = async () => {
    try {
        const [rows] = await promisePool.query('SHOW TABLES');
        return rows;
    } catch (error) {
        console.error('Error fetching tables:', error.message);
        throw error;
    }
};

module.exports = { promisePool, getTables };

*/

const mysql = require('mysql2');

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'Vivek@8874', // Add your MySQL password
    database: 'CyberCafeManagement',
    port:3306
});

const promisePool = connection.promise();

connection.connect((err) => {
    if (err) throw err;
    console.log('Connected to MySQL!');
});

module.exports = promisePool;