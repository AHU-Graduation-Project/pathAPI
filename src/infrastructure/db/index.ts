import 'dotenv/config';
import { drizzle } from 'drizzle-orm/node-postgres';
import { user } from './schema';
import { Pool } from 'pg';

const pool = new Pool({
  connectionString: process.env.DB_URL,
  ssl: {
    rejectUnauthorized: false,
  },
});

const db = drizzle(pool);

async function main() {
  try {
    // Check the connection by selecting from a known table
    await db.select().from(user).limit(1);
    console.log('Database connection successful');

    // Fetch users
    const users = await db.select().from(user);
    console.log('Getting all users from the database: ', users);
  } catch (error) {
    console.error('Error connecting to the database:', error);
  }
}

main();
