// require("dotenv").config()


// const { Pool } = require('pg'); // Import the Pool constructor

// const pool = new Pool({
//   user: process.env.DB_USER,
//   password: process.env.DB_PASSWORD,
//   host: process.env.DB_HOST,
//   port: process.env.DB_Port,
//   database: process.env.DB_DATABASE
// });
/////////////////////////////////////////////////////////
// module.exports = pool;

// require("dotenv").config();

// const { Pool } = require("pg");

// const isProduction = process.env.NODE_ENV === "production";

// const connectionString = `postgresql://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_DATABASE}`;

// const pool = new Pool({
//   connectionString: isProduction ? process.env.DATABASE_URL : connectionString,
//   ssl: isProduction
// });

// module.exports = { pool };

const { Pool } = require('pg');

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'project',
  password: 'abc123',
  port: 5432, // PostgreSQL default port
});

// async function insertUserData(id,name, email, password) {
//   const query = 'INSERT INTO users (id,name, email, password) VALUES ($1, $2, $3, $4)';
//   const values = [id,name, email, password];

//   try {
//     await pool.query(query, values);
//     console.log('Data inserted successfully');
//   } catch (error) {
//     console.error('Error inserting data:', error);
//   }
// }

async function insertUserData(id, name, email, password) {
  const client = await pool.connect();

  try {
    await client.query('BEGIN'); // Start a transaction

    const query = 'INSERT INTO users (id, name, email, password) VALUES ($1, $2, $3, $4)';
    const values = [id, name, email, password];

    await client.query(query, values);
    await client.query('COMMIT'); // Commit the transaction

    console.log('Data inserted successfully');
  } catch (error) {
    await client.query('ROLLBACK'); // Rollback the transaction if there's an error
    console.error('Error inserting data:', error);
  } finally {
    client.release(); // Release the client back to the pool
  }
}

module.exports = { pool , insertUserData};





