import { client } from "./db.js";

export async function insertOne(client, table, doc) {
    const result = await client.db("cyber").collection(table).insertOne(doc);
    return result
}

export async function insertMany(client, table, docs) {
    return result = await client.db("cyber").collection(table).insertMany(docs);
}

export async function findUserByName(client, name) {
    return result = await client.db("cyber").collection("users").findOne({ name: name });
}

export async function findAll(client, table) {
    const cursor = await client.db("cyber").collection(table).find();
    const results = await cursor.toArray(); // Convert cursor to array to fetch all documents 
    console.log(results)
    return results; 
}