const { Client } = require('pg');

async function seed() {
  const client = new Client({
    host: 'postgres',
    port: 5432,
    user: 'postgres',
    password: 'password',
    database: 'loadtest'
  });

  try {
    await client.connect();
    console.log('Connected to database');

    // Create table
    await client.query(`
      CREATE TABLE IF NOT EXISTS items (
        id SERIAL PRIMARY KEY,
        name TEXT NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);

    // Clear existing data
    await client.query('TRUNCATE TABLE items RESTART IDENTITY');
    console.log('Cleared existing data');

    // Generate 500 items (для теста, можно увеличить)
    const totalItems = 500;
    console.log('Seeding database with items...');

    for (let i = 0; i < totalItems; i += 100) {
      const values = [];
      const placeholders = [];
      const batchSize = Math.min(100, totalItems - i);
      
      for (let j = 0; j < batchSize; j++) {
        values.push(`Item ${i + j + 1}`);
        placeholders.push(`($${j + 1}, DEFAULT)`);
      }
      
      const query = `
        INSERT INTO items (name, created_at) 
        VALUES ${placeholders.join(', ')}
      `;
      
      await client.query(query, values);
      console.log(`Inserted ${i + batchSize} items...`);
    }

    console.log('Seeding completed! Total items:', totalItems);
    
  } catch (error) {
    console.error('Seeding error:', error);
  } finally {
    await client.end();
  }
}

// Запускаем сидирование при прямом вызове
if (require.main === module) {
  seed();
}

module.exports = { seed };
'@

# main.ts
New-Item -Path "backend/src/main.ts" -ItemType File -Value @'
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  app.useGlobalPipes(new ValidationPipe());
  app.enableCors();
  
  await app.listen(3000);
  console.log('Backend is running on http://localhost:3000');
}
bootstrap();
'@