import {MongoClient} from 'mongodb'
import dotenv from 'dotenv'

dotenv.config()

export const client = new MongoClient(process.env.MONGO_URI);
export default async function connectToMongoDB() {
    try {
        await client.connect();
        console.log('Connected to MongoDB');
    } catch (error) {
        console.error('Error connecting to MongoDB:', error);
    }
}
