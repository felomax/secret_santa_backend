import { DataSource } from 'typeorm';
import * as dotenv from 'dotenv';

dotenv.config();

async function resetDatabase() {
  const dataSource = new DataSource({
    type: 'postgres',
    url: process.env.DATABASE_URL,
    ssl: false,
  });

  try {
    await dataSource.initialize();
    console.log('🔌 Connected to database');

    // Drop all tables
    await dataSource.query('DROP TABLE IF EXISTS gifs CASCADE');
    await dataSource.query('DROP TABLE IF EXISTS people CASCADE');
    await dataSource.query('DROP TABLE IF EXISTS users CASCADE');

    console.log('✅ All tables dropped successfully');
    console.log('🔄 Restart your server to recreate tables');

    await dataSource.destroy();
  } catch (error) {
    console.error('❌ Error:', error);
    process.exit(1);
  }
}

resetDatabase();
