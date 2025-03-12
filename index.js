import express from 'express'
const app = express();
const PORT = process.env.PORT || 5000;

import connectToMongoDB from './db.js'
import { client } from './db.js';
import {insertOne, insertMany, findUserByName, findAll} from './controllers.js'

app.use(express.json());
connectToMongoDB()

app.get('/users', async (req, res) => {
    try {
        const users = await findAll(client, "users"); // Await the result
        res.json(users); // Send the fetched products
      } catch (error) {
        console.error("Error fetching users:", error);
        res.status(500).json({ error: "Internal Server Error" });
      }
});

app.get('/products', async (req, res) => {
    try {
        const products = await findAll(client, "products"); // Await the result
        res.json(products); // Send the fetched products
      } catch (error) {
        console.error("Error fetching products:", error);
        res.status(500).json({ error: "Internal Server Error" });
      }
});

app.post('/users', async (req, res) => {
  const name = req.body.name;
  const rollNo = req.body.rollno;
  try {
    const result = await insertOne(client, "users", { name, rollno: rollNo });

    res.status(201).json({
      message: "User added successfully",
      insertedId: result.insertedId, // Return the ID of the inserted document
    });
  } catch (error) {
    console.error("Error inserting user:", error);

    res.status(500).json({
      error: "Internal Server Error",
      details: error.message,
    });
  }
});

app.post('/products', async (req, res) => {
  const name = req.body.name;
  const price = req.body.price;
  try {
    const result = await insertOne(client, "products", { name, price });

    res.status(201).json({
      message: "Product added successfully",
      insertedId: result.insertedId, // Return the ID of the inserted document
    });
  } catch (error) {
    console.error("Error inserting Product:", error);

    res.status(500).json({
      error: "Internal Server Error",
      details: error.message,
    });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
