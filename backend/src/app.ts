
import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import helmet from 'helmet';
import cookieParser from 'cookie-parser';

import { apiRouter } from './routes/index.js';

export const app = express();

const CORS_ORIGIN = process.env.CORS_ORIGIN || 'http://localhost:5173';
app.use(cors({ origin: CORS_ORIGIN, credentials: true }));
app.use(helmet());
app.use(morgan('dev'));
app.use(express.json({ limit: '1mb' }));
app.use(cookieParser());

app.get('/api/health', (_req, res) => {
  res.json({ ok: true, service: 'mams', ts: new Date().toISOString() });
});

app.use('/api', apiRouter);

// 404
app.use((_req, res) => {
  res.status(404).json({ message: 'Not Found' });
});
