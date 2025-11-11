import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import helmet from 'helmet';
import cookieParser from 'cookie-parser';

import { apiRouter } from './routes/index.js';

export const app = express();

//  Handle CORS for both local and deployed frontend
const allowedOrigins = [
  process.env.CORS_ORIGIN || 'http://localhost:5173',
  'https://mams-starter.vercel.app' // your deployed frontend
];

app.use(
  cors({
    origin: allowedOrigins,
    credentials: true
  })
);

//  Security & logging middlewares
app.use(helmet());
app.use(morgan('dev'));
app.use(express.json({ limit: '1mb' }));
app.use(cookieParser());

//  Health check endpoint (for Vercel testing)
app.get('/api/health', (_req, res) => {
  res.json({ ok: true, service: 'mams', ts: new Date().toISOString() });
});

// Main API routes
app.use('/api', apiRouter);

// 404 fallback
app.use((_req, res) => {
  res.status(404).json({ message: 'Not Found' });
});
