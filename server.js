const express = require("express");
const path = require("path");
const { Pool } = require("pg");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.static("public"));

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false },
});

// Table creation if not exists
pool.query(\`
  CREATE TABLE IF NOT EXISTS students (
    id SERIAL PRIMARY KEY,
    name TEXT NOT NULL,
    age INT NOT NULL,
    department TEXT NOT NULL
  );
\`);

app.post("/student", async (req, res) => {
  const { name, age, department } = req.body;
  try {
    await pool.query(
      "INSERT INTO students (name, age, department) VALUES ($1, $2, $3)",
      [name, age, department]
    );
    res.json({ message: "Student added successfully!" });
  } catch (err) {
    res.status(500).json({ error: "Database error" });
  }
});

app.listen(PORT, () => {
  console.log(\`Server running on port \${PORT}\`);
});
