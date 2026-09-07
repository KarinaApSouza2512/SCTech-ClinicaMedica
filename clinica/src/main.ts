import 'reflect-metadata';
import express from 'express';
import { AppDataSource } from './database/data-source.js';

export async function main(): Promise<void> {
  await AppDataSource.initialize();

  const app = express();
  const port = Number(process.env.PORT ?? 3000);

  app.use(express.json());

  app.get('/', (_request, response) => {
    response.json({ message: 'ClinicaMedica API' });
  });

  app.get('/health', (_request, response) => {
    response.json({ status: 'ok', database: AppDataSource.isInitialized ? 'up' : 'down' });
  });

  app.listen(port, () => {
    console.log(`Listening on port ${port}`);
  });
}

main().catch((error: unknown) => {
  console.error('Failed to initialize the application:', error);
  process.exitCode = 1;
});